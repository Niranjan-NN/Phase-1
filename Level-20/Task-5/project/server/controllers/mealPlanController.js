import MealPlan from '../models/MealPlan.js';
import Recipe from '../models/Recipe.js';

// Get current user's meal plan
export const getCurrentMealPlan = async (req, res, next) => {
  try {
    // Find meal plan for current user
    let mealPlan = await MealPlan.findOne({ user: req.user.id })
      .populate('meals.monday.breakfast meals.monday.lunch meals.monday.dinner')
      .populate('meals.tuesday.breakfast meals.tuesday.lunch meals.tuesday.dinner')
      .populate('meals.wednesday.breakfast meals.wednesday.lunch meals.wednesday.dinner')
      .populate('meals.thursday.breakfast meals.thursday.lunch meals.thursday.dinner')
      .populate('meals.friday.breakfast meals.friday.lunch meals.friday.dinner')
      .populate('meals.saturday.breakfast meals.saturday.lunch meals.saturday.dinner')
      .populate('meals.sunday.breakfast meals.sunday.lunch meals.sunday.dinner');
    
    // If no meal plan found, return empty meal plan
    if (!mealPlan) {
      return res.status(404).json({ message: 'No meal plan found' });
    }
    
    res.status(200).json(mealPlan);
  } catch (error) {
    next(error);
  }
};

// Create or update meal plan
export const createOrUpdateMealPlan = async (req, res, next) => {
  try {
    const { meals } = req.body;
    
    // Convert meal objects to just IDs for storage
    const processedMeals = {};
    
    // Process each day of the week
    for (const day of ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']) {
      processedMeals[day] = {};
      
      // Process each meal type
      for (const mealType of ['breakfast', 'lunch', 'dinner']) {
        // If meal exists and has an _id, store just the ID
        if (meals[day]?.[mealType]?._id) {
          processedMeals[day][mealType] = meals[day][mealType]._id;
        } else {
          processedMeals[day][mealType] = null;
        }
      }
    }
    
    // Find existing meal plan or create new one
    let mealPlan = await MealPlan.findOne({ user: req.user.id });
    
    if (mealPlan) {
      // Update existing meal plan
      mealPlan.meals = processedMeals;
      await mealPlan.save();
    } else {
      // Create new meal plan
      mealPlan = new MealPlan({
        user: req.user.id,
        meals: processedMeals
      });
      
      await mealPlan.save();
    }
    
    // Fetch the updated meal plan with populated recipes
    const updatedMealPlan = await MealPlan.findById(mealPlan._id)
      .populate('meals.monday.breakfast meals.monday.lunch meals.monday.dinner')
      .populate('meals.tuesday.breakfast meals.tuesday.lunch meals.tuesday.dinner')
      .populate('meals.wednesday.breakfast meals.wednesday.lunch meals.wednesday.dinner')
      .populate('meals.thursday.breakfast meals.thursday.lunch meals.thursday.dinner')
      .populate('meals.friday.breakfast meals.friday.lunch meals.friday.dinner')
      .populate('meals.saturday.breakfast meals.saturday.lunch meals.saturday.dinner')
      .populate('meals.sunday.breakfast meals.sunday.lunch meals.sunday.dinner');
    
    res.status(200).json(updatedMealPlan);
  } catch (error) {
    next(error);
  }
};