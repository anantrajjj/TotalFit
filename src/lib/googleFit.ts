
import { useState, useEffect } from 'react';

interface GoogleFitData {
  steps: number;
  calories: number;
  distance: number;
  heartRate: number;
  activeMinutes: number;
}

const VITE_GOOGLE_CLIENT_ID = "391679448350-o2l0qve4cb9h4mbouur6vj26i5dih4r2.apps.googleusercontent.com";

const GOOGLE_FIT_SCOPES = [
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.heart_rate.read'
];

export const useGoogleFit = () => {
  const [fitData, setFitData] = useState<GoogleFitData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeGoogleFit = async () => {
      if (!window.gapi) {
        setError('Google API not loaded. Please check your internet connection.');
        return;
      }

      if (!process.env.VITE_GOOGLE_CLIENT_ID) {
        setError('Google Client ID not configured');
        return;
      }

      try {
        await new Promise((resolve, reject) => {
          window.gapi.load('client:auth2', {
            callback: resolve,
            onerror: reject,
            timeout: 10000,
            ontimeout: () => reject(new Error('Google API load timeout'))
          });
        });

        await window.gapi.client.init({
          clientId: process.env.VITE_GOOGLE_CLIENT_ID,
          scope: GOOGLE_FIT_SCOPES.join(' '),
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest']
        });

        // Ensure fitness API is loaded
        if (!window.gapi.client.fitness) {
          throw new Error('Google Fitness API not loaded properly');
        }
        
        const auth = window.gapi.auth2.getAuthInstance();
        if (!auth) {
          throw new Error('Auth instance not initialized');
        }

        const isSignedIn = auth.isSignedIn.get();
        setIsConnected(isSignedIn);
        if (isSignedIn) {
          fetchFitData();
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to initialize Google Fit';
        setError(errorMessage);
        console.error('Google Fit initialization error:', error);
        setIsConnected(false);
      }
    };

    initializeGoogleFit();
  }, []);

  const connectGoogleFit = async () => {
    if (!window.gapi || !window.gapi.auth2) {
      setError('Google API not properly initialized');
      return;
    }

    try {
      const auth = window.gapi.auth2.getAuthInstance();
      if (!auth) {
        throw new Error('Auth instance not available');
      }

      const user = await auth.signIn({
        prompt: 'select_account',
        ux_mode: 'popup',
        scope: GOOGLE_FIT_SCOPES.join(' ')
      });
      
      if (user) {
        const isAuthorized = user.hasGrantedScopes(GOOGLE_FIT_SCOPES.join(' '));
        if (!isAuthorized) {
          await user.grant({ scope: GOOGLE_FIT_SCOPES.join(' ') });
        }
        setIsConnected(true);
        setError(null);
        await fetchFitData();
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to connect to Google Fit';
      setError(errorMessage);
      setIsConnected(false);
      console.error('Google Fit connection error:', error);
    }
  };

  const fetchFitData = async () => {
    try {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startTime = midnight.getTime();
      const endTime = now.getTime();

      const response = await window.gapi.client.fitness.users.dataset.aggregate({
        userId: 'me',
        aggregateBy: [
          { dataTypeName: 'com.google.step_count.delta' },
          { dataTypeName: 'com.google.calories.expended' },
          { dataTypeName: 'com.google.distance.delta' },
          { dataTypeName: 'com.google.heart_rate.bpm' },
          { dataTypeName: 'com.google.active_minutes' }
        ],
        bucketByTime: { durationMillis: endTime - startTime },
        startTimeMillis: startTime,
        endTimeMillis: endTime
      });

      const { bucket } = response.result;
      if (!bucket || !bucket[0] || !bucket[0].dataset) {
        throw new Error('No fitness data available');
      }

      const data: GoogleFitData = {
        steps: 0,
        calories: 0,
        distance: 0,
        heartRate: 0,
        activeMinutes: 0
      };

      bucket[0].dataset.forEach((dataset: any) => {
        if (!dataset.point || !dataset.point[0]) return;
        
        const point = dataset.point[0];
        const value = point.value[0];
        
        if (!value) return;

        switch (dataset.dataSourceId) {
          case 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps':
            data.steps = value.intVal || 0;
            break;
          case 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended':
            data.calories = Math.round(value.fpVal || 0);
            break;
          case 'derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta':
            data.distance = +((value.fpVal || 0) / 1000).toFixed(2); // Convert to km
            break;
          case 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm':
            data.heartRate = Math.round(value.fpVal || 0);
            break;
          case 'derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes':
            data.activeMinutes = value.intVal || 0;
            break;
        }
      });


      setFitData(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch fitness data');
      console.error('Google Fit data fetch error:', error);
    }
  };

  return { fitData, isConnected, error, connectGoogleFit };
};