import React from 'react';

const Stats = () => {
  const stats = [
    { value: '10,000+', label: 'Athletes' },
    { value: '95%', label: 'Accuracy' },
    { value: '30%', label: 'Performance Boost' }
  ];

  return (
    <div className="bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-blue-500 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;