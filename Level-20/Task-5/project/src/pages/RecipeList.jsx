import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import { useAuth } from '../contexts/AuthContext';
import RecipeCard from '../components/recipes/RecipeCard';
import SearchBar from '../components/recipes/SearchBar';
import Filters from '../components/recipes/Filters';

const RecipeList = () => {
  const { recipes, loading, searchRecipes } = useRecipes();
  const { isAuthenticated } = useAuth();
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    cuisineType: '',
    mealType: ''
  });

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    
    if (!term && !filters.cuisineType && !filters.mealType) {
      setFilteredRecipes(recipes);
      return;
    }
    
    const results = await searchRecipes(term, filters);
    setFilteredRecipes(results);
  };

  const handleFilterChange = async (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    const results = await searchRecipes(searchTerm, updatedFilters);
    setFilteredRecipes(results);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      cuisineType: '',
      mealType: ''
    });
    setFilteredRecipes(recipes);
  };

  return (
    <div className="recipe-list-page">
      <div className="container">
        <div className="page-header">
          <h1>Recipes</h1>
          {isAuthenticated && (
            <Link to="/recipes/new" className="button button-primary">
              Add New Recipe
            </Link>
          )}
        </div>
        
        <div className="search-filter-container">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />
          <Filters 
            filters={filters}
            onFilterChange={handleFilterChange} 
            onClearFilters={clearFilters}
          />
        </div>
        
        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <>
            {filteredRecipes.length > 0 ? (
              <div className="recipes-grid">
                {filteredRecipes.map(recipe => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="no-recipes-found">
                <h3>No recipes found</h3>
                <p>Try adjusting your search or filters</p>
                <button className="button button-outline" onClick={clearFilters}>
                  Clear all filters
                </button>
                {isAuthenticated && (
                  <Link to="/recipes/new" className="button button-primary">
                    Add New Recipe
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeList;