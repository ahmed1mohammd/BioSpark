import SchoolInquiry from '../models/SchoolInquiry.js';
import ContactSubmission from '../models/ContactSubmission.js';

// --- School Inquiries ---

// @desc    Submit school inquiry (Public)
// @route   POST /api/inquiries/school
// @access  Public
export const submitSchoolInquiry = async (req, res, next) => {
  try {
    const inquiry = await SchoolInquiry.create(req.body);
    res.status(201).json({
      success: true,
      data: inquiry,
      message: 'Thank you! Your school inquiry has been submitted successfully.'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all school inquiries (Admin)
// @route   GET /api/inquiries/school
// @access  Private (Admin)
export const getSchoolInquiries = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const inquiries = await SchoolInquiry.find(filter).sort('-createdAt');
    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update school inquiry status/notes (Admin)
// @route   PATCH /api/inquiries/school/:id
// @access  Private (Admin)
export const updateSchoolInquiryStatus = async (req, res, next) => {
  try {
    const inquiry = await SchoolInquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!inquiry) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }
    res.status(200).json({
      success: true,
      data: inquiry,
      message: 'School inquiry status updated'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete school inquiry (Admin)
// @route   DELETE /api/inquiries/school/:id
// @access  Private (Admin)
export const deleteSchoolInquiry = async (req, res, next) => {
  try {
    const inquiry = await SchoolInquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }
    res.status(200).json({
      success: true,
      data: {},
      message: 'Inquiry deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// --- Contact Submissions ---

// @desc    Submit contact message (Public)
// @route   POST /api/inquiries/contact
// @access  Public
export const submitContact = async (req, res, next) => {
  try {
    const submission = await ContactSubmission.create(req.body);
    res.status(201).json({
      success: true,
      data: submission,
      message: 'Message received! We will get back to you shortly.'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all contact submissions (Admin)
// @route   GET /api/inquiries/contact
// @access  Private (Admin)
export const getContactSubmissions = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const submissions = await ContactSubmission.find(filter).sort('-createdAt');
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update contact submission status (Admin)
// @route   PATCH /api/inquiries/contact/:id
// @access  Private (Admin)
export const updateContactStatus = async (req, res, next) => {
  try {
    const submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!submission) {
      return res.status(404).json({ success: false, error: 'Contact submission not found' });
    }
    res.status(200).json({
      success: true,
      data: submission,
      message: 'Contact submission updated'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete contact submission (Admin)
// @route   DELETE /api/inquiries/contact/:id
// @access  Private (Admin)
export const deleteContactSubmission = async (req, res, next) => {
  try {
    const submission = await ContactSubmission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({ success: false, error: 'Contact submission not found' });
    }
    res.status(200).json({
      success: true,
      data: {},
      message: 'Submission deleted'
    });
  } catch (err) {
    next(err);
  }
};
