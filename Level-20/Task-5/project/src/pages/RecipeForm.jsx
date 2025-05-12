import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import { toast } from 'react-toastify';
import IngredientInput from '../components/recipes/IngredientInput';
import InstructionInput from '../components/recipes/InstructionInput';
import LoadingSpinner from '../components/common/LoadingSpinner';

const RecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipe, createRecipe, updateRecipe } = useRecipes();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(isEditMode);
  const [formSubmitting, setFormSubmitting] = useState(false);
  
  const initialFormState = {
    name: '',
    description: '',
    cuisineType: '',
    mealType: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    ingredients: [{ name: '', quantity: '', unit: '' }],
    instructions: [''],
    notes: '',
    image: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  
  // Cuisine and meal type options
  const cuisineTypes = [
    'American', 'Italian', 'Mexican', 'Indian', 'Chinese', 
    'Japanese', 'Thai', 'Mediterranean', 'French', 'Greek', 
    'Spanish', 'Lebanese', 'Moroccan', 'Korean', 'Vietnamese', 'Other'
  ];
  
  const mealTypes = [
    'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 
    'Appetizer', 'Side Dish', 'Drink', 'Sauce', 'Other'
  ];
  
  useEffect(() => {
    const fetchRecipe = async () => {
      if (isEditMode) {
        const recipeData = await getRecipe(id);
        
        if (recipeData) {
          setFormData(recipeData);
        } else {
          navigate('/recipes');
        }
        
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [id, isEditMode, getRecipe, navigate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    // Only allow positive numbers
    if (value === '' || parseInt(value) >= 0) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Handle ingredient updates
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = { 
      ...updatedIngredients[index], 
      [field]: value 
    };
    
    setFormData(prev => ({ 
      ...prev, 
      ingredients: updatedIngredients 
    }));
  };
  
  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '', unit: '' }]
    }));
  };
  
  const removeIngredient = (index) => {
    if (formData.ingredients.length === 1) {
      toast.warning("Recipe must have at least one ingredient");
      return;
    }
    
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(index, 1);
    
    setFormData(prev => ({ 
      ...prev, 
      ingredients: updatedIngredients 
    }));
  };
  
  // Handle instruction updates
  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    
    setFormData(prev => ({ 
      ...prev, 
      instructions: updatedInstructions 
    }));
  };
  
  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };
  
  const removeInstruction = (index) => {
    if (formData.instructions.length === 1) {
      toast.warning("Recipe must have at least one instruction");
      return;
    }
    
    const updatedInstructions = [...formData.instructions];
    updatedInstructions.splice(index, 1);
    
    setFormData(prev => ({ 
      ...prev, 
      instructions: updatedInstructions 
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    // Basic validation
    if (!formData.name) {
      toast.error("Recipe name is required");
      setFormSubmitting(false);
      return;
    }
    
    // Check if all ingredients have a name
    if (formData.ingredients.some(ingredient => !ingredient.name.trim())) {
      toast.error("All ingredients must have a name");
      setFormSubmitting(false);
      return;
    }
    
    // Check if all instructions have content
    if (formData.instructions.some(instruction => !instruction.trim())) {
      toast.error("All instructions must have content");
      setFormSubmitting(false);
      return;
    }
    
    try {
      if (isEditMode) {
        await updateRecipe(id, formData);
        toast.success("Recipe updated successfully!");
      } else {
        const newRecipe = await createRecipe(formData);
        toast.success("Recipe created successfully!");
        navigate(`/recipes/${newRecipe._id}`);
        return;
      }
      
      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error("Error submitting recipe:", error);
      toast.error("Error saving recipe. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="recipe-form-page">
      <div className="container">
        <h1>{isEditMode ? 'Edit Recipe' : 'Create New Recipe'}</h1>
        
        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-group">
            <label htmlFor="name">Recipe Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter recipe name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of the recipe"
              rows="3"
            ></textarea>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cuisineType">Cuisine Type</label>
              <select
                id="cuisineType"
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleInputChange}
              >
                <option value="">Select cuisine type</option>
                {cuisineTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="mealType">Meal Type</label>
              <select
                id="mealType"
                name="mealType"
                value={formData.mealType}
                onChange={handleInputChange}
              >
                <option value="">Select meal type</option>
                {mealTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prepTime">Prep Time (minutes)</label>
              <input
                type="number"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleNumberInputChange}
                placeholder="Prep time in minutes"
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cookTime">Cook Time (minutes)</label>
              <input
                type="number"
                id="cookTime"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleNumberInputChange}
                placeholder="Cook time in minutes"
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="servings">Servings</label>
              <input
                type="number"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={handleNumberInputChange}
                placeholder="Number of servings"
                min="1"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="URL to recipe image"
            />
          </div>
          
          <div className="form-section">
            <div className="section-header">
              <h2>Ingredients</h2>
              <button 
                type="button" 
                className="button button-outline"
                onClick={addIngredient}
              >
                Add Ingredient
              </button>
            </div>
            
            {formData.ingredients.map((ingredient, index) => (
              <IngredientInput
                key={index}
                ingredient={ingredient}
                index={index}
                onChange={handleIngredientChange}
                onRemove={removeIngredient}
              />
            ))}
          </div>
          
          <div className="form-section">
            <div className="section-header">
              <h2>Instructions</h2>
              <button 
                type="button" 
                className="button button-outline"
                onClick={addInstruction}
              >
                Add Step
              </button>
            </div>
            
            {formData.instructions.map((instruction, index) => (
              <InstructionInput
                key={index}
                instruction={instruction}
                index={index}
                onChange={handleInstructionChange}
                onRemove={removeInstruction}
              />
            ))}
          </div>
          
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Additional notes or tips"
              rows="3"
            ></textarea>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="button button-outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="button button-primary"
              disabled={formSubmitting}
            >
              {formSubmitting ? 'Saving...' : isEditMode ? 'Update Recipe' : 'Create Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;