import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-branding">
            <div className="footer-logo">
              <Link to="/" className="logo-link">
                <span className="logo-text">RecipeBox</span>
              </Link>
            </div>
            <p className="footer-tagline">
              Your personal recipe management system
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4>Navigation</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/recipes">Recipes</Link></li>
                <li><Link to="/meal-planner">Meal Planner</Link></li>
                <li><Link to="/shopping-list">Shopping List</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4>Account</h4>
              <ul>
                <li><Link to="/login">Log In</Link></li>
                <li><Link to="/register">Sign Up</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4>Features</h4>
              <ul>
                <li><Link to="/recipes">Recipe Database</Link></li>
                <li><Link to="/meal-planner">Meal Planning</Link></li>
                <li><Link to="/shopping-list">Shopping Lists</Link></li>
                <li><Link to="/recipes">Recipe Search</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} RecipeBox. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;