import express from 'express';
import Product from '../models/Product.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/factoryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAll(Product))
  .post(protect, createOne(Product));

router.route('/:id')
  .get(getOne(Product))
  .put(protect, updateOne(Product))
  .delete(protect, deleteOne(Product));

export default router;
