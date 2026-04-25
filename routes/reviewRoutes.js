import express from 'express';
import { 
    getAll, 
    getOne, 
    createOne, 
    updateOne, 
    deleteOne 
} from '../controllers/factoryController.js';
import Review from '../models/Review.js';
import advancedResults from '../middlewares/advancedResults.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(advancedResults(Review), getAll(Review))
    .post(protect, authorize('admin', 'superadmin'), createOne(Review));

router
    .route('/:id')
    .get(getOne(Review))
    .put(protect, authorize('admin', 'superadmin'), updateOne(Review))
    .delete(protect, authorize('admin', 'superadmin'), deleteOne(Review));

export default router;
