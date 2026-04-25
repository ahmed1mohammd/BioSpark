import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        default: 'Feedback'
    },
    description: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: 'https://ui-avatars.com/api/?name=BioSpark'
    },
    date: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Review', reviewSchema);
