import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import { useAuth } from '../contexts/AuthContext';
import { useMealPlan } from '../contexts/MealPlanContext';
import { toast } from 'react-toastify';
import ServingAdjuster from '../components/recipes/ServingAdjuster';
import MealPlanSelector from '../components/meal-plan/MealPlanSelector';
import LoadingSpinner from '../components/common/LoadingSpinner';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipe, deleteRecipe, scaleRecipe } = useRecipes();
  const { isAuthenticated, currentUser } = useAuth();
  const { addToMealPlan } = useMealPlan();
  
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [scaledRecipe, setScaledRecipe] = useState(null);
  const [servings, setServings] = useState(0);
  
  useEffect(() => {
    const loadRecipe = async () => {
      const recipeData = await getRecipe(id);
      
      if (!recipeData) {
        navigate('/recipes');
        return;
      }
      
      setRecipe(recipeData);
      setServings(recipeData.servings);
      setScaledRecipe(recipeData);
      setLoading(false);
    };
    
    loadRecipe();
  }, [id, getRecipe, navigate]);

  const handleServingsChange = (newServings) => {
    if (newServings < 1) return;
    
    setServings(newServings);
    const newScaledRecipe = scaleRecipe(recipe, newServings);
    setScaledRecipe(newScaledRecipe);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      const deleted = await deleteRecipe(id);
      
      if (deleted) {
        navigate('/recipes');
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddToMealPlan = () => {
    setShowMealPlanModal(true);
  };

  const addToMealPlanAndClose = (day, mealType) => {
    addToMealPlan(recipe, day, mealType);
    setShowMealPlanModal(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!recipe) {
    return (
      <div className="container">
        <h2>Recipe not found</h2>
        <Link to="/recipes" className="button button-outline">
          Back to Recipes
        </Link>
      </div>
    );
  }

  const isOwner = currentUser && recipe.user === currentUser._id;

  return (
    <div className="recipe-detail-page">
      <div className="container">
        <div className="recipe-detail-header">
          <h1>{recipe.name}</h1>
          
          <div className="recipe-meta">
            <span className="cuisine-type">{recipe.cuisineType}</span>
            <span className="meal-type">{recipe.mealType}</span>
            <span className="prep-time">{recipe.prepTime} mins prep</span>
            <span className="cook-time">{recipe.cookTime} mins cook</span>
          </div>
          
          <div className="recipe-actions no-print">
            <ServingAdjuster 
              servings={servings} 
              onServingsChange={handleServingsChange} 
            />
            
            <button className="button button-outline" onClick={handlePrint}>
              Print Recipe
            </button>
            
            {isAuthenticated && (
              <button className="button button-primary" onClick={handleAddToMealPlan}>
                Add to Meal Plan
              </button>
            )}
            
            {isOwner && (
              <div className="owner-actions">
                <Link to={`/recipes/edit/${id}`} className="button button-outline">
                  Edit
                </Link>
                <button className="button button-secondary" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="recipe-content">
          <div className="recipe-image-container">
            {recipe.image ? (
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            ) : (
              <div className="placeholder-image">No Image Available</div>
            )}
          </div>
          
          <div className="recipe-details">
            <div className="recipe-description">
              <h2>Description</h2>
              <p>{recipe.description}</p>
            </div>
            
            <div className="recipe-ingredients">
              <h2>Ingredients</h2>
              <ul>
                {scaledRecipe?.ingredients?.map((ingredient, index) => (
                  <li key={index} className="ingredient-item">
                    <span className="ingredient-quantity">{ingredient.quantity}</span>
                    <span className="ingredient-unit">{ingredient.unit}</span>
                    <span className="ingredient-name">{ingredient.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="recipe-instructions">
              <h2>Instructions</h2>
              <ol>
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="instruction-step">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            
            {recipe.notes && (
              <div className="recipe-notes">
                <h2>Notes</h2>
                <p>{recipe.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showMealPlanModal && (
        <MealPlanSelector 
          onSelect={addToMealPlanAndClose} 
          onClose={() => setShowMealPlanModal(false)} 
        />
      )}
    </div>
  );
};

export default RecipeDetail;