import express from 'express';
import { getStats } from '../controllers/dashboardController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, authorize('admin', 'user'), getStats);

export default router;
