import express from 'express';
import Customer from '../models/Customer.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/factoryController.js';
import advancedResults from '../middlewares/advancedResults.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(advancedResults(Customer), getAll(Customer))
    .post(protect, authorize('admin', 'user'), createOne(Customer));

router
    .route('/:id')
    .get(getOne(Customer))
    .put(protect, authorize('admin', 'user'), updateOne(Customer))
    .delete(protect, authorize('admin', 'user'), deleteOne(Customer));

export default router;
