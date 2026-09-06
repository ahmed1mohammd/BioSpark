import path from 'path';
import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middlewares/errorMiddleware.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import programRoutes from './routes/programRoutes.js';
import workshopRoutes from './routes/workshopRoutes.js';
import campRoutes from './routes/campRoutes.js';
import productRoutes from './routes/productRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import visitorRoutes from './routes/visitorRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import boardMemberRoutes from './routes/boardMemberRoutes.js';
import carouselRoutes from './routes/carouselRoutes.js';

const app = express();

// Trust proxy for rate limiting behind Vercel/Cloudflare
app.set('trust proxy', 1);

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
}));

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 500 // Increased limit for interactive dashboard & public site
});
app.use(limiter);

// Enable CORS
app.use(cors());

// Ensure public/uploads directory exists
const uploadsDir = path.resolve('public/uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Static folder for uploads
app.use('/uploads', express.static(uploadsDir));

// Serve Admin Dashboard
const dashboardDir = path.resolve('../Dashboard');
if (fs.existsSync(dashboardDir)) {
    app.use('/dashboard', express.static(dashboardDir));
    app.get('/dashboard/*', (req, res) => {
        res.sendFile(path.join(dashboardDir, 'index.html'));
    });
}

// Ensure DB is connected on every request (crucial for serverless)
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Root route
app.get('/', (req, res) => {
    res.send('<h1>BioSpark API Server Online</h1>');
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/camps', campRoutes);
app.use('/api/products', productRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/board-members', boardMemberRoutes);
app.use('/api/carousels', carouselRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Export app for Vercel
export default app;

// Only listen if not in production/Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const server = app.listen(
        PORT,
        console.log(`✅ BioSpark Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );

    process.on('unhandledRejection', (err, promise) => {
        console.log(`Error: ${err.message}`);
        server.close(() => process.exit(1));
    });
}
