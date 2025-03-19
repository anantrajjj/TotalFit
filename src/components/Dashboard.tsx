import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Heart, Brain, Battery, Award } from 'lucide-react';

const Dashboard = () => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate sample data
    const data = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        performance: 85 + Math.random() * 10,
        recovery: 75 + Math.random() * 15,
        training: 80 + Math.random() * 20,
        stress: 30 + Math.random() * 40
      };
    }).reverse();

    setMetrics(data);
    setInsights([
      "Performance trending upward - 15% improvement in last 2 weeks",
      "Recovery metrics suggest optimal training window tomorrow morning",
      "Stress levels indicate need for additional recovery protocols",
      "Training intensity can be increased by 10% next session"
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Athlete Dashboard</h1>
          <div className="flex space-x-4">
            <select className="bg-gray-800 text-white rounded-md px-3 py-2 text-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-medium text-white">Performance</h3>
            </div>
            <p className="text-3xl font-bold text-white">92%</p>
            <p className="text-sm text-green-500 mt-2">↑ 8% vs last week</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-lg font-medium text-white">Recovery</h3>
            </div>
            <p className="text-3xl font-bold text-white">85%</p>
            <p className="text-sm text-green-500 mt-2">↑ 5% vs yesterday</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-purple-500 mr-3" />
              <h3 className="text-lg font-medium text-white">Mental Focus</h3>
            </div>
            <p className="text-3xl font-bold text-white">88%</p>
            <p className="text-sm text-red-500 mt-2">↓ 3% vs average</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Battery className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="text-lg font-medium text-white">Energy Level</h3>
            </div>
            <p className="text-3xl font-bold text-white">95%</p>
            <p className="text-sm text-green-500 mt-2">↑ 10% vs yesterday</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Performance Trends</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937' }} />
                  <Line type="monotone" dataKey="performance" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="recovery" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="training" stroke="#6366F1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Award className="w-6 h-6 text-yellow-500 mr-3" />
              <h3 className="text-xl font-semibold text-white">AI Insights</h3>
            </div>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-300">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;