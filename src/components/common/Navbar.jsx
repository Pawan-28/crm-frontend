import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon,
  HomeIcon,
  UsersIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600">CRM</span>
              <span className="text-gray-600">Lead Management</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              <HomeIcon className="h-5 w-5" />
            </Link>
            
            {user?.role === 'admin' && (
              <>
                <Link to="/leads" className="text-gray-700 hover:text-blue-600">
                  <UsersIcon className="h-5 w-5" />
                </Link>
                <Link to="/users" className="text-gray-700 hover:text-blue-600">
                  <UserGroupIcon className="h-5 w-5" />
                </Link>
              </>
            )}
            
            <div className="flex items-center space-x-2">
              <UserCircleIcon className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-700">
                {user?.full_name || user?.username}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;