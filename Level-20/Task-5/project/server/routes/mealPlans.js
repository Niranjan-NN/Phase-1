import express from 'express';
import { getCurrentMealPlan, createOrUpdateMealPlan } from '../controllers/mealPlanController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected - requires authentication
router.use(protect);

router.get('/current', getCurrentMealPlan);
router.post('/', createOrUpdateMealPlan);

export default router;