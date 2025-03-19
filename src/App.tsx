
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Activity, Shield, Brain, DollarSign, Trophy } from 'lucide-react';
import { useAuth } from './lib/auth';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureCard from './components/FeatureCard';
import Stats from './components/Stats';
import AthleteRegistration from './components/AthleteRegistration';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import Analytics from './components/Analytics';
import Training from './components/Training';
import Finance from './components/Finance';
import Career from './components/Career';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

function App() {
  const features = [
    {
      icon: <Activity className="w-8 h-8 text-blue-500" />,
      title: "Performance Analytics",
      description: "AI-powered insights on your stats, fitness levels, and training progress"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Injury Prevention",
      description: "Predict and prevent injuries using Google Vertex AI movement analysis"
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: "Smart Training Plans",
      description: "Personalized workout and nutrition plans tailored to your goals"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-yellow-500" />,
      title: "Financial Management",
      description: "Track and optimize your training budget and sponsorship earnings"
    },
    {
      icon: <Trophy className="w-8 h-8 text-red-500" />,
      title: "Career Growth",
      description: "AI-driven mentorship and career development suggestions"
    }
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<AthleteRegistration />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/training" element={<ProtectedRoute><Training /></ProtectedRoute>} />
          <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
          <Route path="/career" element={<ProtectedRoute><Career /></ProtectedRoute>} />
          <Route path="/" element={
            <>
              <Hero />
              <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </div>
              </section>
              <Stats />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
