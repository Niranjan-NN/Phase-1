import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../search/SearchBar';
import UnitToggle from '../weather/UnitToggle';
import { FaHome, FaHistory, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <motion.span 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              WeatherDash
            </motion.span>
          </Link>
        </div>

        <div className="search-container">
          <SearchBar />
        </div>

        <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                <FaHome /> <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/historical" className={location.pathname === '/historical' ? 'active' : ''}>
                <FaHistory /> <span>Historical</span>
              </Link>
            </li>
            <li>
              <Link to="/favorites" className={location.pathname === '/favorites' ? 'active' : ''}>
                <FaHeart /> <span>Favorites</span>
              </Link>
            </li>
          </ul>
          
          <div className="unit-toggle-container">
            <UnitToggle />
          </div>
        </nav>

        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Header;