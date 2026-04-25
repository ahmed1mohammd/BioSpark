import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, 'Please add a customer image URL']
    },
    title: {
        type: String,
        trim: true,
        default: 'Our Partner'
    },
    description: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Customer', customerSchema);
