import Recipe from '../models/Recipe.js';

// Generate shopping list from meal plan
export const generateShoppingList = async (req, res, next) => {
  try {
    const { meals } = req.body;
    
    // Collect all recipe IDs from meal plan
    const recipeIds = [];
    
    // Iterate through days and meal types
    for (const day of Object.keys(meals)) {
      for (const mealType of Object.keys(meals[day])) {
        const recipe = meals[day][mealType];
        
        // If recipe exists and has an _id, add it to the list
        if (recipe && recipe._id) {
          recipeIds.push(recipe._id);
        }
      }
    }
    
    // If no recipes found, return empty list
    if (recipeIds.length === 0) {
      return res.status(200).json([]);
    }
    
    // Fetch complete recipe data for all recipe IDs
    const recipes = await Recipe.find({ _id: { $in: recipeIds } });
    
    // Create shopping list by aggregating ingredients
    const shoppingList = [];
    const itemsMap = new Map();
    
    // Process each recipe
    recipes.forEach(recipe => {
      // Process each ingredient
      recipe.ingredients.forEach(ingredient => {
        const key = `${ingredient.name.toLowerCase()}-${ingredient.unit.toLowerCase()}`;
        
        // If ingredient already exists in map, update quantity
        if (itemsMap.has(key)) {
          const existingItem = itemsMap.get(key);
          
          // Try to parse quantities as numbers for addition
          let quantity1 = parseFloat(existingItem.quantity) || 0;
          let quantity2 = parseFloat(ingredient.quantity) || 0;
          
          // Add quantities if both are valid numbers
          if (!isNaN(quantity1) && !isNaN(quantity2)) {
            existingItem.quantity = (quantity1 + quantity2).toString();
          } else {
            // If quantities can't be added numerically, concatenate
            existingItem.quantity = `${existingItem.quantity}, ${ingredient.quantity}`;
          }
          
          // Add recipe ID to list of recipes using this ingredient
          if (!existingItem.recipeIds.includes(recipe._id.toString())) {
            existingItem.recipeIds.push(recipe._id.toString());
          }
        } 
        // Otherwise, add new ingredient to map
        else {
          itemsMap.set(key, {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            recipeIds: [recipe._id.toString()],
            completed: false
          });
        }
      });
    });
    
    // Convert map to array
    for (const item of itemsMap.values()) {
      shoppingList.push(item);
    }
    
    // Sort alphabetically by name
    shoppingList.sort((a, b) => a.name.localeCompare(b.name));
    
    res.status(200).json(shoppingList);
  } catch (error) {
    next(error);
  }
};