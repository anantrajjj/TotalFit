import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { LogOut, User } from 'lucide-react';
import { Activity, DollarSign, Brain, Trophy, BarChart2 } from 'lucide-react';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-gray-800' : '';
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center flex-shrink-0 text-white font-bold text-xl gap-2">
              <img src={logo} alt="TotalFit Logo" className="w-8 h-8" />
              TotalFit
            </Link>

            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link
                to="/dashboard"
                className={`${isActive('/dashboard')} text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}
              >
                <BarChart2 className="w-4 h-4 mr-2" />
                Dashboard
              </Link>

              <Link
                to="/analytics"
                className={`${isActive('/analytics')} text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}
              >
                <Brain className="w-4 h-4 mr-2" />
                Analytics
              </Link>

              <Link
                to="/training"
                className={`${isActive('/training')} text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}
              >
                <Activity className="w-4 h-4 mr-2" />
                Training
              </Link>

              <Link
                to="/finance"
                className={`${isActive('/finance')} text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Finance
              </Link>

              <Link
                to="/career"
                className={`${isActive('/career')} text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Career
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-300">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <button
                  onClick={async () => {
                    await signOut();
                    navigate('/');
                  }}
                  className="flex items-center text-gray-300 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link to="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;