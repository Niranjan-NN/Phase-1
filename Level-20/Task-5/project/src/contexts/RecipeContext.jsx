import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from './AuthContext';

const RecipeContext = createContext();

export const useRecipes = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  
  // Set the base URL for API requests using environment variable
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Get all recipes
  const fetchRecipes = async () => {
    setLoading(true);
    
    try {
      const response = await axios.get(`${API_URL}/recipes`);
      setRecipes(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to fetch recipes');
      toast.error('Failed to load recipes. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Get single recipe by ID
  const getRecipe = async (id) => {
    setLoading(true);
    
    try {
      const response = await axios.get(`${API_URL}/recipes/${id}`);
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Error fetching recipe:', err);
      setError('Failed to fetch recipe');
      toast.error('Failed to load recipe details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create new recipe
  const createRecipe = async (recipeData) => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to create a recipe');
      return null;
    }
    
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post(`${API_URL}/recipes`, recipeData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setRecipes([...recipes, response.data]);
      toast.success('Recipe created successfully!');
      return response.data;
    } catch (err) {
      console.error('Error creating recipe:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create recipe';
      toast.error(errorMessage);
      return null;
    }
  };

  // Update existing recipe
  const updateRecipe = async (id, recipeData) => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to update a recipe');
      return null;
    }
    
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.put(`${API_URL}/recipes/${id}`, recipeData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setRecipes(recipes.map(recipe => 
        recipe._id === id ? response.data : recipe
      ));
      
      toast.success('Recipe updated successfully!');
      return response.data;
    } catch (err) {
      console.error('Error updating recipe:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update recipe';
      toast.error(errorMessage);
      return null;
    }
  };

  // Delete recipe
  const deleteRecipe = async (id) => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to delete a recipe');
      return false;
    }
    
    const token = localStorage.getItem('token');
    
    try {
      await axios.delete(`${API_URL}/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setRecipes(recipes.filter(recipe => recipe._id !== id));
      toast.success('Recipe deleted successfully!');
      return true;
    } catch (err) {
      console.error('Error deleting recipe:', err);
      const errorMessage = err.response?.data?.message || 'Failed to delete recipe';
      toast.error(errorMessage);
      return false;
    }
  };

  // Scale recipe ingredients
  const scaleRecipe = (recipe, servings) => {
    if (!recipe || !recipe.ingredients || !recipe.servings) {
      return null;
    }
    
    const scaleFactor = servings / recipe.servings;
    
    const scaledIngredients = recipe.ingredients.map(ingredient => {
      // Parse quantity to number for scaling
      const quantity = parseFloat(ingredient.quantity);
      
      // Handle case when quantity is not a number
      if (isNaN(quantity)) {
        return ingredient;
      }
      
      const scaledQuantity = (quantity * scaleFactor).toFixed(2);
      
      // Remove trailing zeros
      const formattedQuantity = parseFloat(scaledQuantity).toString();
      
      return {
        ...ingredient,
        quantity: formattedQuantity
      };
    });
    
    return {
      ...recipe,
      servings,
      ingredients: scaledIngredients
    };
  };

  // Search recipes
  const searchRecipes = async (query, filters = {}) => {
    setLoading(true);
    
    try {
      const queryParams = new URLSearchParams();
      
      if (query) {
        queryParams.append('search', query);
      }
      
      if (filters.cuisineType) {
        queryParams.append('cuisineType', filters.cuisineType);
      }
      
      if (filters.mealType) {
        queryParams.append('mealType', filters.mealType);
      }
      
      const response = await axios.get(`${API_URL}/recipes/search?${queryParams.toString()}`);
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Error searching recipes:', err);
      setError('Failed to search recipes');
      toast.error('Failed to search recipes');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Load recipes on initial render if user is authenticated
  useEffect(() => {
    fetchRecipes();
  }, [isAuthenticated]);

  const value = {
    recipes,
    loading,
    error,
    fetchRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    scaleRecipe,
    searchRecipes
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};