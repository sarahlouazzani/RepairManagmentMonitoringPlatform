import express from 'express';
import { signup, login, getProfile } from '../auth/authController';
import { verifyToken } from '../auth/authMiddleware';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Profile route (protected)
router.get('/profile', verifyToken, getProfile);

export default router;