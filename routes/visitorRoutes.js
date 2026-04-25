import express from 'express';
import Visitor from '../models/Visitor.js';
import { getAll, createOne, deleteOne } from '../controllers/factoryController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(protect, authorize('admin', 'super-admin'), getAll(Visitor))
    .post(createOne(Visitor));

router
    .route('/:id')
    .delete(protect, authorize('admin', 'super-admin'), deleteOne(Visitor));

export default router;
