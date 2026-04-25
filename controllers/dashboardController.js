import Product from '../models/Product.js';
import Workshop from '../models/Workshop.js';
import Event from '../models/Event.js';
import Article from '../models/Article.js';
import Customer from '../models/Customer.js';
import Review from '../models/Review.js';
import Visitor from '../models/Visitor.js';
import Message from '../models/Message.js';

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
export const getStats = async (req, res, next) => {
    try {
        const products = await Product.countDocuments();
        const workshops = await Workshop.countDocuments();
        const events = await Event.countDocuments();
        const articles = await Article.countDocuments();
        const customers = await Customer.countDocuments();
        const reviews = await Review.countDocuments();
        const visitors = await Visitor.countDocuments();
        const messages = await Message.countDocuments();
        
        // Simulating actual page views for 'visits' or using visitors count as a proxy
        const visits = visitors + Math.floor(Math.random() * 100); 

        res.status(200).json({
            success: true,
            data: {
                visits,
                products,
                workshops,
                events,
                articles,
                customers,
                reviews,
                visitors,
                messages
            },
            message: 'Stats retrieved successfully'
        });
    } catch (err) {
        next(err);
    }
};
