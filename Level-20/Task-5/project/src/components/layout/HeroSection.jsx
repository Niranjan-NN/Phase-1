import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="hero-section">
      <div className="hero-image">
        <img 
          src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          alt="Cooking ingredients" 
        />
      </div>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Organize Your Recipes, Simplify Meal Planning</h1>
          <p className="hero-subtitle">
            Store recipes, plan meals, and generate shopping lists all in one place.
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <>
                <Link to="/recipes/new" className="button button-primary">
                  Create Recipe
                </Link>
                <Link to="/meal-planner" className="button button-outline hero-button-light">
                  Plan Your Meals
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="button button-primary">
                  Get Started
                </Link>
                <Link to="/recipes" className="button button-outline hero-button-light">
                  Browse Recipes
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;