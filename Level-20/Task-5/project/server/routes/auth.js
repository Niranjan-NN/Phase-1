import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Route to register a new user
router.post('/register', register);

// Route to log in a user
router.post('/login', login);

export default router;