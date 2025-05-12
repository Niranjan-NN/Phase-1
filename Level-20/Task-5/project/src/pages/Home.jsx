import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import { useAuth } from '../contexts/AuthContext';
import RecipeCard from '../components/recipes/RecipeCard';
import HeroSection from '../components/layout/HeroSection';

const Home = () => {
  const { recipes, loading } = useRecipes();
  const { isAuthenticated } = useAuth();
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  useEffect(() => {
    // Get 3 random recipes for featured section
    if (recipes.length > 0) {
      const shuffled = [...recipes].sort(() => 0.5 - Math.random());
      setFeaturedRecipes(shuffled.slice(0, 3));
    }
  }, [recipes]);

  return (
    <div className="home-page">
      <HeroSection />
      
      <section className="features-section">
        <div className="container">
          <h2>Welcome to RecipeBox</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Create & Store</h3>
              <p>Create and store all your favorite recipes in one place with easy access anytime.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Search & Filter</h3>
              <p>Quickly find recipes by name, ingredients, cuisine type, or meal type.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Plan Meals</h3>
              <p>Drag and drop recipes to create your perfect weekly meal plan.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Shopping Lists</h3>
              <p>Generate shopping lists from your meal plan with one click.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="featured-recipes">
        <div className="container">
          <div className="section-header">
            <h2>Featured Recipes</h2>
            <Link to="/recipes" className="view-all-link">View All Recipes</Link>
          </div>
          
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div className="recipes-grid">
              {featuredRecipes.length > 0 ? (
                featuredRecipes.map(recipe => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))
              ) : (
                <p className="no-recipes">
                  No recipes available yet. 
                  {isAuthenticated ? (
                    <Link to="/recipes/new"> Create your first recipe!</Link>
                  ) : (
                    <Link to="/login"> Log in to create recipes!</Link>
                  )}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
      
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to organize your cooking?</h2>
            <p>Join RecipeBox today and start managing your recipes and meal plans like a pro.</p>
            {isAuthenticated ? (
              <Link to="/recipes/new" className="button button-primary">Create Recipe</Link>
            ) : (
              <Link to="/register" className="button button-primary">Sign Up Now</Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;