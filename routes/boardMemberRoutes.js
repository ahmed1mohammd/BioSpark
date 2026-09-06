import express from 'express';
import BoardMember from '../models/BoardMember.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all board members
router.get('/', async (req, res) => {
  try {
    const members = await BoardMember.find({ active: true }).sort({ ordering: 1, createdAt: 1 });
    res.json({ success: true, count: members.length, data: members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Admin: Get all board members (including inactive)
router.get('/admin/all', protect, async (req, res) => {
  try {
    const members = await BoardMember.find().sort({ ordering: 1, createdAt: -1 });
    res.json({ success: true, count: members.length, data: members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create board member
router.post('/', protect, async (req, res) => {
  try {
    const member = await BoardMember.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update board member
router.put('/:id', protect, async (req, res) => {
  try {
    const member = await BoardMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!member) {
      return res.status(404).json({ success: false, error: 'Member not found' });
    }
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete board member
router.delete('/:id', protect, async (req, res) => {
  try {
    const member = await BoardMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, error: 'Member not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
