import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code, Menu, X, LogOut, User, Settings, Bell, PlusCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Code className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold">360Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 font-medium">
              Feed
            </Link>
            <Link to="/create-post" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 font-medium">
              Create Post
            </Link>
            <div className="relative">
              <button
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500"
                onClick={toggleProfileMenu}
              >
                <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden mr-2">
                  {authState.user?.avatar ? (
                    <img src={authState.user.avatar} alt={authState.user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </span>
                <span className="font-medium">{authState.user?.name?.split(' ')[0]}</span>
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700">
                  <div className="py-1">
                    <Link
                      to={`/profile/${authState.user?._id}`}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Your Profile
                      </div>
                    </Link>
                    <Link
                      to="/profile/edit"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Edit Profile
                      </div>
                    </Link>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button 
              className="text-gray-700 dark:text-gray-300 focus:outline-none" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 pt-4 pb-4 border-t border-gray-200 dark:border-gray-800 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Feed
              </Link>
              <Link 
                to="/create-post" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Post
                </div>
              </Link>
              <Link 
                to={`/profile/${authState.user?._id}`}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Your Profile
                </div>
              </Link>
              <Link 
                to="/profile/edit" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </div>
              </Link>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="text-left text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium"
              >
                <div className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </div>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;