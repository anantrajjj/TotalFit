import React, { useEffect, useState } from 'react';
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronUp, Calendar, Activity, Award, Zap, Heart } from 'react-feather';
import { useGoogleFit } from '../lib/googleFit';

interface FitnessMetrics {
  date: string;
  performance: number;
  strength: number;
  endurance: number;
  recovery: number;
  nutrition: number;
}

const Analytics = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 Days');
  const [selectedMetric, setSelectedMetric] = useState('performance');
  const [expandedSection, setExpandedSection] = useState('');
  const [performanceData, setPerformanceData] = useState<FitnessMetrics[]>([]);
  const [radarData, setRadarData] = useState([]);
  const { fitData, isConnected, error, connectGoogleFit } = useGoogleFit();

  useEffect(() => {
    const analyzeData = () => {
      try {
        const days = selectedPeriod === 'Last 7 Days' ? 7 : selectedPeriod === 'Last 30 Days' ? 30 : 90;
        const data = Array.from({ length: days }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
          performance: fitData ? (fitData.steps / 10000) * 100 : 85 + Math.random() * 15,
          strength: fitData ? (fitData.calories / 3000) * 100 : 80 + Math.random() * 20,
          endurance: fitData ? (fitData.distance / 10) * 100 : 75 + Math.random() * 25,
          recovery: fitData ? (fitData.heartRate < 100 ? 90 : 70) : 70 + Math.random() * 30,
          nutrition: 75 + Math.random() * 25
        })).reverse();

        const athleteRadarData = [
          {
            metric: 'Steps',
            value: fitData ? Math.min((fitData.steps / 10000) * 100, 100) : 85,
            fullMark: 100,
          },
          {
            metric: 'Calories',
            value: fitData ? Math.min((fitData.calories / 3000) * 100, 100) : 90,
            fullMark: 100,
          },
          {
            metric: 'Distance',
            value: fitData ? Math.min((fitData.distance / 10) * 100, 100) : 75,
            fullMark: 100,
          },
          {
            metric: 'Heart Rate',
            value: fitData ? Math.min(100 - ((fitData.heartRate - 60) / 100) * 100, 100) : 80,
            fullMark: 100,
          },
          {
            metric: 'Active Minutes',
            value: fitData ? Math.min((fitData.activeMinutes / 60) * 100, 100) : 85,
            fullMark: 100,
          },
        ];
        
        setPerformanceData(data);
        setRadarData(athleteRadarData);

        const generatedInsights = [
          "🏃‍♂️ Daily Activity:",
          fitData ? [
            `- Steps: ${fitData.steps.toLocaleString()} steps`,
            `- Distance: ${fitData.distance.toFixed(2)} km`,
            `- Calories: ${fitData.calories.toLocaleString()} kcal`,
          ].join('\n') : "- Connect Google Fit to see your daily activity",
          "",
          "📈 Performance Analysis:",
          fitData ? [
            `- Active Minutes: ${fitData.activeMinutes} mins`,
            `- Average Heart Rate: ${fitData.heartRate} bpm`,
            "- Activity level is " + (fitData.steps > 10000 ? "above" : "below") + " daily goal",
          ].join('\n') : "- Sync with Google Fit for detailed analysis",
          "",
          "💡 Recommendations:",
          fitData ? [
            fitData.steps < 10000 ? "- Increase daily steps to reach 10,000 goal" : "- Maintain current activity level",
            fitData.activeMinutes < 30 ? "- Aim for at least 30 minutes of active time" : "- Good job on staying active",
            fitData.heartRate > 100 ? "- Consider more recovery activities" : "- Heart rate levels are optimal",
          ].join('\n') : "- Connect Google Fit to get personalized recommendations"
        ];

        setInsights(generatedInsights);
      } catch (error) {
        console.error('Error analyzing data:', error);
        setInsights(['Unable to analyze data at this time']);
      } finally {
        setLoading(false);
      }
    };

    analyzeData();
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={connectGoogleFit}
              className={`px-4 py-2 rounded-lg flex items-center ${isConnected ? 'bg-green-600 hover:bg-green-700' : error ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors duration-200`}
              disabled={loading}
            >
              <Heart className="w-4 h-4 mr-2" />
              {isConnected ? 'Connected to Google Fit' : error ? 'Connection Error' : 'Connect Google Fit'}
            </button>
            <div className="relative inline-block">
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="appearance-none bg-gray-800 text-white px-4 py-2 pr-8 rounded-lg cursor-pointer hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="performance">Performance</option>
                <option value="strength">Strength</option>
                <option value="endurance">Endurance</option>
                <option value="recovery">Recovery</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <div className="relative inline-block">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="appearance-none bg-gray-800 text-white px-4 py-2 pr-8 rounded-lg cursor-pointer hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-6">
              <Activity className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-white">Performance Trends</h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                    itemStyle={{ color: '#E5E7EB' }}
                  />
                  <Bar dataKey={selectedMetric} fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-6">
              <Zap className="w-6 h-6 text-yellow-500 mr-3" />
              <h2 className="text-xl font-semibold text-white">Athlete Profile</h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" stroke="#9CA3AF" />
                  <PolarRadiusAxis stroke="#9CA3AF" />
                  <Radar
                    name="Athlete"
                    dataKey="value"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">AI Insights</h2>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {insights.map((insight, index) => {
                if (insight.startsWith('🏃‍♂️') || insight.startsWith('📈') || 
                    insight.startsWith('🍎') || insight.startsWith('💡')) {
                  const section = insight.slice(0, insight.indexOf(':'));
                  const isExpanded = expandedSection === section;
                  return (
                    <div 
                      key={index} 
                      className="bg-gray-700 rounded-lg p-4 transition-all duration-200 hover:bg-gray-600 cursor-pointer"
                      onClick={() => toggleSection(section)}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-300 font-medium">{insight}</p>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      {isExpanded && (
                        <div className="mt-4 pl-6 border-l-2 border-gray-600">
                          {insights.slice(index + 1).map((item, i) => {
                            if (!item.startsWith('🏃‍♂️') && !item.startsWith('📈') && 
                                !item.startsWith('🍎') && !item.startsWith('💡')) {
                              return item ? (
                                <p key={i} className="text-sm text-gray-400 mb-2">{item}</p>
                              ) : null;
                            }
                            return null;
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;