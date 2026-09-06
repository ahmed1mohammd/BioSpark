import express from 'express';
import CarouselSlide from '../models/CarouselSlide.js';
import { createOne, getAll, getOne, updateOne, deleteOne } from '../controllers/factoryController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAll(CarouselSlide))
  .post(protect, authorize('admin', 'superadmin'), createOne(CarouselSlide));

router.route('/:id')
  .get(getOne(CarouselSlide))
  .put(protect, authorize('admin', 'superadmin'), updateOne(CarouselSlide))
  .delete(protect, authorize('admin', 'superadmin'), deleteOne(CarouselSlide));

export default router;
