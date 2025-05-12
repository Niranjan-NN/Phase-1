import express from 'express';
import { generateShoppingList } from '../controllers/shoppingListController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected - requires authentication
router.use(protect);

router.post('/generate', generateShoppingList);

export default router;