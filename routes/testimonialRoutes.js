import express from 'express';
import Testimonial from '../models/Testimonial.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/factoryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAll(Testimonial))
  .post(protect, createOne(Testimonial));

router.route('/:id')
  .get(getOne(Testimonial))
  .put(protect, updateOne(Testimonial))
  .delete(protect, deleteOne(Testimonial));

export default router;
