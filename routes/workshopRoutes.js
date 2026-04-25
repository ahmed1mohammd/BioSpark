import express from 'express';
import Workshop from '../models/Workshop.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/factoryController.js';
import advancedResults from '../middlewares/advancedResults.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(advancedResults(Workshop), getAll(Workshop))
    .post(protect, authorize('admin'), createOne(Workshop));

router
    .route('/:id')
    .get(getOne(Workshop))
    .put(protect, authorize('admin', 'user'), updateOne(Workshop))
    .delete(protect, authorize('admin'), deleteOne(Workshop));

export default router;
