const Filters = ({ filters, onFilterChange, onClearFilters }) => {
  const cuisineTypes = [
    'American', 'Italian', 'Mexican', 'Indian', 'Chinese', 
    'Japanese', 'Thai', 'Mediterranean', 'French', 'Greek', 
    'Spanish', 'Lebanese', 'Moroccan', 'Korean', 'Vietnamese', 'Other'
  ];
  
  const mealTypes = [
    'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 
    'Appetizer', 'Side Dish', 'Drink', 'Sauce', 'Other'
  ];
  
  const handleCuisineChange = (e) => {
    onFilterChange({ cuisineType: e.target.value });
  };
  
  const handleMealTypeChange = (e) => {
    onFilterChange({ mealType: e.target.value });
  };
  
  const handleClear = () => {
    onClearFilters();
  };
  
  return (
    <div className="filters-container">
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="cuisineType">Cuisine Type</label>
          <select
            id="cuisineType"
            name="cuisineType"
            value={filters.cuisineType}
            onChange={handleCuisineChange}
          >
            <option value="">All Cuisines</option>
            {cuisineTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="mealType">Meal Type</label>
          <select
            id="mealType"
            name="mealType"
            value={filters.mealType}
            onChange={handleMealTypeChange}
          >
            <option value="">All Meal Types</option>
            {mealTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <button 
          className="button button-outline button-sm clear-filters" 
          onClick={handleClear}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;