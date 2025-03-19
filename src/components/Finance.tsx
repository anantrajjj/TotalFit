
import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, PieChart, AlertCircle } from 'lucide-react';

const Finance = () => {
  const [financialData, setFinancialData] = useState({
    earnings: 150000,
    expenses: 65000,
    investments: 45000,
    aiPredictions: {
      nextYearEarnings: 180000,
      investmentGrowth: 12,
      riskAssessment: 'Low',
      recommendations: [
        'Consider increasing investment in sustainable sports tech',
        'Diversify endorsement portfolio',
        'Build emergency fund to 6 months of expenses'
      ]
    }
  });

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Financial Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold text-white">Earnings</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              ${financialData.earnings.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-xl font-semibold text-white">Expenses</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              ${financialData.expenses.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <PieChart className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-white">Investments</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              ${financialData.investments.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-6">
            <AlertCircle className="w-6 h-6 text-yellow-500 mr-3" />
            <h3 className="text-xl font-semibold text-white">AI Financial Insights</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-300 mb-2">Projected Earnings</h4>
              <p className="text-2xl font-bold text-green-500">
                ${financialData.aiPredictions.nextYearEarnings.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400 mt-1">Expected next year</p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-gray-300 mb-2">Investment Growth</h4>
              <p className="text-2xl font-bold text-blue-500">
                {financialData.aiPredictions.investmentGrowth}%
              </p>
              <p className="text-sm text-gray-400 mt-1">Projected annual return</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-300 mb-3">AI Recommendations</h4>
            <div className="space-y-2">
              {financialData.aiPredictions.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-700 rounded p-3 text-gray-300">
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
