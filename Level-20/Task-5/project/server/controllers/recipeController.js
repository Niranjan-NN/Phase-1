import Recipe from '../models/Recipe.js';

// Get all recipes
export const getAllRecipes = async (req, res, next) => {
  try {
    // Fetch all recipes
    const recipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name');
    
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

// Get recipe by ID
export const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find recipe by ID
    const recipe = await Recipe.findById(id)
      .populate('user', 'name');
    
    // If recipe not found
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

// Create a new recipe
export const createRecipe = async (req, res, next) => {
  try {
    const newRecipe = new Recipe({
      ...req.body,
      user: req.user.id
    });
    
    // Save recipe to database
    const savedRecipe = await newRecipe.save();
    
    res.status(201).json(savedRecipe);
  } catch (error) {
    next(error);
  }
};

// Update recipe
export const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find recipe by ID
    const recipe = await Recipe.findById(id);
    
    // If recipe not found
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    // Check if user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this recipe' });
    }
    
    // Update recipe
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

// Delete recipe
export const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find recipe by ID
    const recipe = await Recipe.findById(id);
    
    // If recipe not found
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    // Check if user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this recipe' });
    }
    
    // Delete recipe
    await Recipe.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Search recipes
export const searchRecipes = async (req, res, next) => {
  try {
    const { search, cuisineType, mealType } = req.query;
    
    // Build query object
    const query = {};
    
    // Add text search if search term provided
    if (search) {
      query.$text = { $search: search };
    }
    
    // Add cuisine type filter
    if (cuisineType) {
      query.cuisineType = cuisineType;
    }
    
    // Add meal type filter
    if (mealType) {
      query.mealType = mealType;
    }
    
    // Find recipes matching query
    const recipes = await Recipe.find(query)
      .sort({ createdAt: -1 })
      .populate('user', 'name');
    
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};