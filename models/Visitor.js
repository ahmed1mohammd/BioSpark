import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email address'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Visitor', visitorSchema);
