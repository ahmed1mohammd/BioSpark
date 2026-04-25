import express from 'express';
import Article from '../models/Article.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/factoryController.js';
import advancedResults from '../middlewares/advancedResults.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(advancedResults(Article), getAll(Article))
    .post(protect, authorize('admin', 'user'), createOne(Article));

router
    .route('/:id')
    .get(getOne(Article))
    .put(protect, authorize('admin', 'user'), updateOne(Article))
    .delete(protect, authorize('admin', 'user'), deleteOne(Article));

export default router;
