import express from 'express';
import Event from '../models/Event.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/factoryController.js';
import advancedResults from '../middlewares/advancedResults.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(advancedResults(Event), getAll(Event))
    .post(protect, authorize('admin', 'user'), createOne(Event));

router
    .route('/:id')
    .get(getOne(Event))
    .put(protect, authorize('admin', 'user'), updateOne(Event))
    .delete(protect, authorize('admin', 'user'), deleteOne(Event));

export default router;
