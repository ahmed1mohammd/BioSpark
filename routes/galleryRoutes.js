import express from 'express';
import Gallery from '../models/Gallery.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/factoryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAll(Gallery))
  .post(protect, createOne(Gallery));

router.route('/:id')
  .get(getOne(Gallery))
  .put(protect, updateOne(Gallery))
  .delete(protect, deleteOne(Gallery));

export default router;
