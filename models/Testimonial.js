import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  role: {
    type: String,
    default: 'Science Educator / School Principal'
  },
  organization: {
    type: String,
    default: 'International STEM School'
  },
  content: {
    type: String,
    required: [true, 'Please add testimonial content']
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  featured: {
    type: Boolean,
    default: true
  },
  active: {
    type: Boolean,
    default: true
  },
  ordering: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
