import express from 'express';
import Program from '../models/Program.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/factoryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAll(Program))
  .post(protect, createOne(Program));

router.route('/:id')
  .get(getOne(Program))
  .put(protect, updateOne(Program))
  .delete(protect, deleteOne(Program));

export default router;
