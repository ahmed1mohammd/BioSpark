import express from 'express';
import { getContent, updateContent } from '../controllers/contentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getContent)
  .put(protect, updateContent);

export default router;
