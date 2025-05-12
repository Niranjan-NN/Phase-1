import express from 'express';
import { getCurrentUser, updateUserProfile, changePassword } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protected routes - requires authentication
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateUserProfile);
router.put('/change-password', protect, changePassword);

export default router;