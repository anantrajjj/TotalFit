import React, { useState, useEffect } from 'react';
import { Activity, Heart, Clock, Brain } from 'lucide-react';

const Training = () => {
  const [trainingData, setTrainingData] = useState({
    currentSession: {
      type: 'High Intensity Interval Training',
      duration: '45 minutes',
      intensity: 'High',
      caloriesBurned: 450
    },
    vitals: {
      heartRate: 145,
      oxygenLevel: 98,
      fatigue: 'Low'
    },
    aiCoaching: {
      performance: 'Excellent form maintained throughout',
      suggestions: [
        'Increase weight on compound lifts by 5%',
        'Add 2 more sprint intervals next session',
        'Focus on shoulder mobility'
      ],
      recovery: '85%'
    }
  });

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Training Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-white">Current Session</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400">Type</p>
                <p className="text-white font-medium">{trainingData.currentSession.type}</p>
              </div>
              <div>
                <p className="text-gray-400">Duration</p>
                <p className="text-white font-medium">{trainingData.currentSession.duration}</p>
              </div>
              <div>
                <p className="text-gray-400">Calories Burned</p>
                <p className="text-white font-medium">{trainingData.currentSession.caloriesBurned}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-xl font-semibold text-white">Vital Stats</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400">Heart Rate</p>
                <p className="text-white font-medium">{trainingData.vitals.heartRate} BPM</p>
              </div>
              <div>
                <p className="text-gray-400">Oxygen Level</p>
                <p className="text-white font-medium">{trainingData.vitals.oxygenLevel}%</p>
              </div>
              <div>
                <p className="text-gray-400">Fatigue Level</p>
                <p className="text-white font-medium">{trainingData.vitals.fatigue}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Brain className="w-6 h-6 text-purple-500 mr-3" />
            <h3 className="text-xl font-semibold text-white">AI Coaching Insights</h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-300 mb-2">Performance Analysis</h4>
              <p className="text-white">{trainingData.aiCoaching.performance}</p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-300 mb-2">Recovery Status</h4>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${trainingData.aiCoaching.recovery}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">{trainingData.aiCoaching.recovery}% recovered from previous session</p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-300 mb-2">AI Recommendations</h4>
              <div className="space-y-2">
                {trainingData.aiCoaching.suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-gray-700 rounded p-3 text-gray-300">
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;