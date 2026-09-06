import express from 'express';
import {
  submitSchoolInquiry,
  getSchoolInquiries,
  updateSchoolInquiryStatus,
  deleteSchoolInquiry,
  submitContact,
  getContactSubmissions,
  updateContactStatus,
  deleteContactSubmission
} from '../controllers/inquiryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// School Inquiry Routes
router.route('/school')
  .post(submitSchoolInquiry)
  .get(protect, getSchoolInquiries);

router.route('/school/:id')
  .patch(protect, updateSchoolInquiryStatus)
  .delete(protect, deleteSchoolInquiry);

// Contact Submission Routes
router.route('/contact')
  .post(submitContact)
  .get(protect, getContactSubmissions);

router.route('/contact/:id')
  .patch(protect, updateContactStatus)
  .delete(protect, deleteContactSubmission);

export default router;
