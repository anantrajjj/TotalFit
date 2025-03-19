import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const handleSuccess = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="mt-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log('Google Sign-In Failed')}
        useOneTap
      />
    </div>
  );
};

export default GoogleSignIn;