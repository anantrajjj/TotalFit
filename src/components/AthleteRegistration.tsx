import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface RegistrationForm {
  email: string;
  password: string;
  name: string;
  sport: string;
  experienceLevel: string;
  goals: string;
  height: string;
  weight: string;
}

const AthleteRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RegistrationForm>({
    email: '',
    password: '',
    name: '',
    sport: '',
    experienceLevel: '',
    goals: '',
    height: '',
    weight: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) throw authError;

      // 2. Create athlete profile
      const { error: profileError } = await supabase
        .from('athletes')
        .insert([
          {
            user_id: authData.user?.id,
            name: form.name,
            sport: form.sport,
            experience_level: form.experienceLevel,
            goals: form.goals,
            height: parseFloat(form.height),
            weight: parseFloat(form.weight),
          }
        ]);

      if (profileError) throw profileError;

      // 3. Generate initial AI recommendations
      await generateAIRecommendations(authData.user?.id);

      navigate('/dashboard');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateAIRecommendations = async (userId: string | undefined) => {
    if (!userId) return;

    // Here we would integrate with an AI service to generate recommendations
    // For now, we'll insert some sample metrics
    const metrics = [
      { metric_type: 'strength_score', value: 75 },
      { metric_type: 'endurance_score', value: 82 },
      { metric_type: 'recovery_rate', value: 90 },
    ];

    await supabase
      .from('athlete_metrics')
      .insert(metrics.map(metric => ({
        athlete_id: userId,
        ...metric
      })));
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create Your Athlete Profile
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="sport" className="sr-only">Sport</label>
              <input
                id="sport"
                name="sport"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Sport"
                value={form.sport}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="experienceLevel" className="sr-only">Experience Level</label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                value={form.experienceLevel}
                onChange={handleChange}
              >
                <option value="">Select Experience Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="professional">Professional</option>
              </select>
            </div>
            <div>
              <label htmlFor="goals" className="sr-only">Goals</label>
              <textarea
                id="goals"
                name="goals"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Your Athletic Goals"
                value={form.goals}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="height" className="sr-only">Height (cm)</label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Height (cm)"
                  value={form.height}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="weight" className="sr-only">Weight (kg)</label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Weight (kg)"
                  value={form.weight}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Creating Profile...' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AthleteRegistration;