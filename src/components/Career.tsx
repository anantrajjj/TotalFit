
import React, { useState, useEffect } from 'react';
import { Calendar, Award, TrendingUp } from 'lucide-react';

interface CareerMilestone {
  date: string;
  achievement: string;
  impact: string;
  aiInsight: string;
}

const Career = () => {
  const [milestones, setMilestones] = useState<CareerMilestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data fetch
    const sampleMilestones = [
      {
        date: '2024-03-15',
        achievement: 'League Championship Victory',
        impact: 'Scored winning goal in finals',
        aiInsight: 'Performance analytics show 40% improvement in shot accuracy'
      },
      {
        date: '2024-02-01',
        achievement: 'Professional Contract Signed',
        impact: 'Joined Premier Division Team',
        aiInsight: 'Market value increased by 25% based on recent performance metrics'
      },
      {
        date: '2024-01-10',
        achievement: 'National Team Selection',
        impact: 'Selected for Olympic squad',
        aiInsight: 'Exceptional agility scores in top 5% of professional athletes'
      }
    ];
    setMilestones(sampleMilestones);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Career Progression</h1>
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-blue-500 mr-3" />
                <span className="text-gray-300">{milestone.date}</span>
              </div>
              <div className="flex items-start space-x-4">
                <Award className="w-6 h-6 text-yellow-500 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {milestone.achievement}
                  </h3>
                  <p className="text-gray-400 mb-3">{milestone.impact}</p>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-green-500">AI Insight</span>
                    </div>
                    <p className="text-sm text-gray-300">{milestone.aiInsight}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
