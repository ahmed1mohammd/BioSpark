import express from 'express';
import rateLimit from 'express-rate-limit';
import { 
    register, 
    login, 
    logout, 
    getProfile, 
    getUsers, 
    updateStatus, 
    deleteUser 
} from '../controllers/authController.js';
import { protect, superAdminOnly } from '../middlewares/authMiddleware.js';

// Rate limiter for auth: 3 requests per minute
const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3,
    message: {
        success: false,
        error: 'Too many login or registration attempts. Please try again after a minute.'
    }
});

const router = express.Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.get('/profile', protect, getProfile);

// Admin management routes (Super Admin Only)
router.get('/users', protect, superAdminOnly, getUsers);
router.put('/users/:id/status', protect, superAdminOnly, updateStatus);
router.delete('/users/:id', protect, superAdminOnly, deleteUser);

export default router;
