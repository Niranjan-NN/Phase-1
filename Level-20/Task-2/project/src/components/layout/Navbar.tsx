import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, LogOut, Search, BookmarkIcon, Home, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-teal-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and site name */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-serif">
            <BookOpen size={28} />
            <span className="font-bold">BookShelf</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-teal-200 flex items-center gap-1.5">
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            {isAuthenticated && (
              <>
                <Link to="/search" className="hover:text-teal-200 flex items-center gap-1.5">
                  <Search size={18} />
                  <span>Search</span>
                </Link>
                <Link to="/my-books" className="hover:text-teal-200 flex items-center gap-1.5">
                  <BookmarkIcon size={18} />
                  <span>My Books</span>
                </Link>
                <Link to="/notes" className="hover:text-teal-200 flex items-center gap-1.5">
                  <FileText size={18} />
                  <span>Notes</span>
                </Link>
              </>
            )}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-teal-200">Hi, {user?.username}</span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 bg-teal-800 hover:bg-teal-600 px-3 py-1.5 rounded-md transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="hover:text-teal-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-teal-600 hover:bg-teal-500 px-4 py-1.5 rounded-md transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 pb-6">
            <Link 
              to="/" 
              className="block py-2 hover:bg-teal-600 px-3 rounded flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            {isAuthenticated && (
              <>
                <Link 
                  to="/search" 
                  className="block py-2 hover:bg-teal-600 px-3 rounded flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Search size={18} />
                  <span>Search</span>
                </Link>
                <Link 
                  to="/my-books" 
                  className="block py-2 hover:bg-teal-600 px-3 rounded flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookmarkIcon size={18} />
                  <span>My Books</span>
                </Link>
                <Link 
                  to="/notes" 
                  className="block py-2 hover:bg-teal-600 px-3 rounded flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileText size={18} />
                  <span>Notes</span>
                </Link>
                
                <div className="border-t border-teal-600 pt-2 mt-2">
                  <div className="px-3 py-1 text-teal-200">Hi, {user?.username}</div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left py-2 hover:bg-teal-600 px-3 rounded flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
            
            {!isAuthenticated && (
              <div className="border-t border-teal-600 pt-2 mt-2 space-y-2">
                <Link 
                  to="/login" 
                  className="block py-2 hover:bg-teal-600 px-3 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block py-2 bg-teal-600 hover:bg-teal-500 px-3 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;