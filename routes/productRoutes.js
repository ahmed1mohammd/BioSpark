import express from 'express';
import Product from '../models/Product.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/factoryController.js';
import advancedResults from '../middlewares/advancedResults.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(advancedResults(Product), getAll(Product))
    .post(protect, authorize('admin'), createOne(Product));

router
    .route('/:id')
    .get(getOne(Product))
    .put(protect, authorize('admin', 'user'), updateOne(Product))
    .delete(protect, authorize('admin'), deleteOne(Product));

export default router;
