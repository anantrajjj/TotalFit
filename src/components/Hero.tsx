import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative py-24 overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          filter: 'brightness(0.3)'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your Athletic Career with{' '}
            <span className="text-blue-500">AI</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Leverage cutting-edge AI technology to optimize your performance,
            prevent injuries, and make data-driven decisions for your athletic career.
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-lg"
          >
            Get Started →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;