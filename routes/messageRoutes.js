import express from 'express';
import rateLimit from 'express-rate-limit';
import Message from '../models/Message.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/factoryController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

// Rate limiter for message submission: 3 requests per minute
const messageLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3,
    message: {
        success: false,
        error: 'Too many messages sent from this IP, please try again after a minute.'
    }
});

const router = express.Router();

// Public route for submitting messages with rate limiting
router.post('/', messageLimiter, createOne(Message));

// Protected routes for dashboard
router.use(protect);
router.use(authorize('admin', 'super-admin'));

router
    .route('/')
    .get(getAll(Message));

router
    .route('/:id')
    .get(getOne(Message))
    .put(updateOne(Message))
    .delete(deleteOne(Message));

export default router;
