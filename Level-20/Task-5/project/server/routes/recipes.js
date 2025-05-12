import express from 'express';
import { 
  getAllRecipes, 
  getRecipeById, 
  createRecipe, 
  updateRecipe, 
  deleteRecipe,
  searchRecipes
} from '../controllers/recipeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllRecipes);
router.get('/search', searchRecipes);
router.get('/:id', getRecipeById);

// Protected routes - requires authentication
router.post('/', protect, createRecipe);
router.put('/:id', protect, updateRecipe);
router.delete('/:id', protect, deleteRecipe);

export default router;