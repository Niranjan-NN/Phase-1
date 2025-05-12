import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">WeatherDash</h3>
          <p className="footer-description">
            Get accurate weather forecasts and historical data for any location around the world.
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li><a href="/">Dashboard</a></li>
            <li><a href="/historical">Historical Data</a></li>
            <li><a href="/favorites">Favorites</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Resources</h4>
          <ul className="footer-links">
            <li><a href="#api">API Documentation</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Connect</h4>
          <div className="social-links">
            <a href="#github" aria-label="GitHub"><FaGithub /></a>
            <a href="#twitter" aria-label="Twitter"><FaTwitter /></a>
            <a href="#linkedin" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {year} WeatherDash. All rights reserved.</p>
        <p>Weather data provided by OpenWeatherMap</p>
      </div>
    </footer>
  );
};

export default Footer;