import Product from '../models/Product.js';
import Workshop from '../models/Workshop.js';
import Camp from '../models/Camp.js';
import Program from '../models/Program.js';
import Gallery from '../models/Gallery.js';
import Testimonial from '../models/Testimonial.js';
import SchoolInquiry from '../models/SchoolInquiry.js';
import ContactSubmission from '../models/ContactSubmission.js';

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
export const getStats = async (req, res, next) => {
    try {
        const [
            products,
            workshops,
            camps,
            programs,
            gallery,
            testimonials,
            schoolInquiries,
            contactSubmissions
        ] = await Promise.all([
            Product.countDocuments(),
            Workshop.countDocuments(),
            Camp.countDocuments(),
            Program.countDocuments(),
            Gallery.countDocuments(),
            Testimonial.countDocuments(),
            SchoolInquiry.countDocuments(),
            ContactSubmission.countDocuments()
        ]);

        const newInquiries = await SchoolInquiry.countDocuments({ status: 'New' }) + 
                             await ContactSubmission.countDocuments({ status: 'New' });

        res.status(200).json({
            success: true,
            data: {
                totalInquiries: schoolInquiries + contactSubmissions,
                newInquiries,
                schoolInquiries,
                contactSubmissions,
                workshops,
                camps,
                products,
                programs,
                gallery,
                testimonials
            },
            message: 'Dashboard statistics retrieved successfully'
        });
    } catch (err) {
        next(err);
    }
};
