import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { useMealPlan } from '../contexts/MealPlanContext';
import { useRecipes } from '../contexts/RecipeContext';
import { toast } from 'react-toastify';
import MealPlanDay from '../components/meal-plan/MealPlanDay';
import RecipesForMealPlan from '../components/meal-plan/RecipesForMealPlan';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MealPlanner = () => {
  const navigate = useNavigate();
  const { 
    mealPlan, 
    loading, 
    saveMealPlan, 
    moveRecipeInMealPlan,
    generateShoppingList
  } = useMealPlan();
  const { recipes, loading: recipesLoading } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  
  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);
  
  // Filter recipes based on search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term) {
      setFilteredRecipes(recipes);
      return;
    }
    
    const filtered = recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(term) || 
      recipe.cuisineType.toLowerCase().includes(term) ||
      recipe.mealType.toLowerCase().includes(term)
    );
    
    setFilteredRecipes(filtered);
  };
  
  // Handle drag and drop
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    
    // If dropped outside of a droppable area
    if (!destination) return;
    
    // Parse the droppable IDs to get day and meal type
    const sourceId = source.droppableId.split('-');
    const destId = destination.droppableId.split('-');
    
    // For recipe list to meal plan drops
    if (sourceId[0] === 'recipe' && destId[0] === 'meal') {
      const recipeId = sourceId[1];
      const day = destId[1];
      const mealType = destId[2];
      
      // Find the recipe
      const recipe = recipes.find(r => r._id === recipeId);
      
      if (recipe) {
        // Update meal plan with dragged recipe
        const updatedMealPlan = { ...mealPlan };
        updatedMealPlan[day][mealType] = recipe;
        
        // Save the updated meal plan
        try {
          saveMealPlan();
          toast.success(`Added ${recipe.name} to ${day}'s ${mealType}`);
        } catch (error) {
          toast.error('Failed to update meal plan');
        }
      }
    } 
    // For meal plan to meal plan drops
    else if (sourceId[0] === 'meal' && destId[0] === 'meal') {
      const sourceDay = sourceId[1];
      const sourceMealType = sourceId[2];
      const destDay = destId[1];
      const destMealType = destId[2];
      
      // Move recipe in meal plan
      moveRecipeInMealPlan(sourceDay, sourceMealType, destDay, destMealType);
      
      // Save changes
      try {
        saveMealPlan();
      } catch (error) {
        toast.error('Failed to update meal plan');
      }
    }
  };
  
  const handleSaveMealPlan = async () => {
    const saved = await saveMealPlan();
    
    if (saved) {
      toast.success('Meal plan saved successfully!');
    }
  };
  
  const handleGenerateShoppingList = async () => {
    const shoppingList = await generateShoppingList();
    
    if (shoppingList.length > 0) {
      navigate('/shopping-list');
    }
  };
  
  if (loading || recipesLoading) {
    return <LoadingSpinner />;
  }
  
  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner'];
  
  return (
    <div className="meal-planner-page">
      <div className="container">
        <div className="page-header">
          <h1>Meal Planner</h1>
          <div className="header-actions">
            <button 
              className="button button-outline"
              onClick={handleSaveMealPlan}
            >
              Save Meal Plan
            </button>
            <button 
              className="button button-primary"
              onClick={handleGenerateShoppingList}
            >
              Generate Shopping List
            </button>
          </div>
        </div>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="meal-planner-layout">
            <div className="meal-planner-calendar">
              <div className="meal-planner-grid">
                <div className="meal-types-header">
                  <div className="day-header"></div>
                  {mealTypes.map(mealType => (
                    <div key={mealType} className="meal-type-header">
                      {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                    </div>
                  ))}
                </div>
                
                {weekdays.map(day => (
                  <div key={day} className="day-row">
                    <div className="day-header">
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </div>
                    
                    {mealTypes.map(mealType => (
                      <MealPlanDay 
                        key={`${day}-${mealType}`}
                        day={day}
                        mealType={mealType}
                        recipe={mealPlan[day][mealType]}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="meal-planner-recipes">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input"
                />
              </div>
              
              <RecipesForMealPlan recipes={filteredRecipes} />
            </div>
          </div>
        </DragDropContext>
        
        <div className="meal-planner-instructions">
          <h3>How to use the Meal Planner</h3>
          <ol>
            <li>Drag recipes from the right panel into meal slots</li>
            <li>Rearrange meals by dragging between slots</li>
            <li>Click "Save Meal Plan" to store your plan</li>
            <li>Click "Generate Shopping List" to create a shopping list based on your plan</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;