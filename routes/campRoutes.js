import express from 'express';
import Camp from '../models/Camp.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/factoryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAll(Camp))
  .post(protect, createOne(Camp));

router.route('/:id')
  .get(getOne(Camp))
  .put(protect, updateOne(Camp))
  .delete(protect, deleteOne(Camp));

export default router;
