import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from './AuthContext';

const MealPlanContext = createContext();

export const useMealPlan = () => useContext(MealPlanContext);

export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState({
    monday: { breakfast: null, lunch: null, dinner: null },
    tuesday: { breakfast: null, lunch: null, dinner: null },
    wednesday: { breakfast: null, lunch: null, dinner: null },
    thursday: { breakfast: null, lunch: null, dinner: null },
    friday: { breakfast: null, lunch: null, dinner: null },
    saturday: { breakfast: null, lunch: null, dinner: null },
    sunday: { breakfast: null, lunch: null, dinner: null }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);
  const { isAuthenticated, currentUser } = useAuth();
  
  // Set the base URL for API requests
  const API_URL = 'http://localhost:5000/api';

  // Fetch current user's meal plan
  const fetchMealPlan = async () => {
    if (!isAuthenticated || !currentUser) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get(`${API_URL}/meal-plans/current`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // If user has a meal plan, set it
      if (response.data) {
        setMealPlan(response.data.meals);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching meal plan:', err);
      setError('Failed to fetch meal plan');
      // Don't show error toast since user might not have a meal plan yet
    } finally {
      setLoading(false);
    }
  };

  // Save meal plan
  const saveMealPlan = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to save a meal plan');
      return false;
    }
    
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      await axios.post(
        `${API_URL}/meal-plans`, 
        { meals: mealPlan },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      toast.success('Meal plan saved successfully!');
      setError(null);
      return true;
    } catch (err) {
      console.error('Error saving meal plan:', err);
      setError('Failed to save meal plan');
      toast.error('Failed to save meal plan');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Add recipe to meal plan
  const addToMealPlan = (recipe, day, mealType) => {
    if (!day || !mealType) {
      toast.error('Please specify day and meal type');
      return;
    }
    
    setMealPlan(prevMealPlan => ({
      ...prevMealPlan,
      [day]: {
        ...prevMealPlan[day],
        [mealType]: recipe
      }
    }));
    
    toast.success(`Added ${recipe.name} to ${day}'s ${mealType}`);
  };

  // Remove recipe from meal plan
  const removeFromMealPlan = (day, mealType) => {
    setMealPlan(prevMealPlan => ({
      ...prevMealPlan,
      [day]: {
        ...prevMealPlan[day],
        [mealType]: null
      }
    }));
    
    toast.info(`Removed recipe from ${day}'s ${mealType}`);
  };

  // Move recipe in meal plan (for drag and drop)
  const moveRecipeInMealPlan = (sourceDay, sourceMealType, destDay, destMealType) => {
    const sourceRecipe = mealPlan[sourceDay][sourceMealType];
    
    if (!sourceRecipe) return;
    
    setMealPlan(prevMealPlan => {
      const newMealPlan = JSON.parse(JSON.stringify(prevMealPlan));
      
      // Store the destination recipe before overwriting
      const destRecipe = newMealPlan[destDay][destMealType];
      
      // Swap the recipes
      newMealPlan[destDay][destMealType] = sourceRecipe;
      newMealPlan[sourceDay][sourceMealType] = destRecipe;
      
      return newMealPlan;
    });
    
    toast.info(`Moved recipe to ${destDay}'s ${destMealType}`);
  };

  // Generate shopping list from meal plan
  const generateShoppingList = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to generate a shopping list');
      return [];
    }
    
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post(
        `${API_URL}/shopping-lists/generate`, 
        { meals: mealPlan },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setShoppingList(response.data);
      toast.success('Shopping list generated successfully!');
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Error generating shopping list:', err);
      setError('Failed to generate shopping list');
      toast.error('Failed to generate shopping list');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Print shopping list
  const printShoppingList = () => {
    window.print();
  };

  // Load user's meal plan on authentication change
  useEffect(() => {
    if (isAuthenticated) {
      fetchMealPlan();
    } else {
      // Reset meal plan when user logs out
      setMealPlan({
        monday: { breakfast: null, lunch: null, dinner: null },
        tuesday: { breakfast: null, lunch: null, dinner: null },
        wednesday: { breakfast: null, lunch: null, dinner: null },
        thursday: { breakfast: null, lunch: null, dinner: null },
        friday: { breakfast: null, lunch: null, dinner: null },
        saturday: { breakfast: null, lunch: null, dinner: null },
        sunday: { breakfast: null, lunch: null, dinner: null }
      });
    }
  }, [isAuthenticated, currentUser]);

  const value = {
    mealPlan,
    loading,
    error,
    shoppingList,
    fetchMealPlan,
    saveMealPlan,
    addToMealPlan,
    removeFromMealPlan,
    moveRecipeInMealPlan,
    generateShoppingList,
    printShoppingList
  };

  return (
    <MealPlanContext.Provider value={value}>
      {children}
    </MealPlanContext.Provider>
  );
};