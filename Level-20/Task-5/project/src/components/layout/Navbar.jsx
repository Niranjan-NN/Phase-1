import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  
  // Close menu when location changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);
  
  // Handle scroll events for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };
  
  const isScrolled = scrollPosition > 50;
  
  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/" className="logo-link">
              <span className="logo-text">RecipeBox</span>
            </Link>
          </div>
          
          <button 
            className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
          </button>
          
          <nav className={`navbar-links ${menuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/recipes" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Recipes
                </NavLink>
              </li>
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <NavLink 
                      to="/meal-planner" 
                      className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                      Meal Planner
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      to="/shopping-list" 
                      className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                      Shopping List
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            
            <div className="auth-links">
              {isAuthenticated ? (
                <div className="user-menu">
                  <span className="user-greeting">
                    Hello, {currentUser?.name?.split(' ')[0] || 'User'}
                  </span>
                  <button 
                    className="button button-outline button-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="button button-outline button-sm">
                    Log In
                  </Link>
                  <Link to="/register" className="button button-primary button-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;