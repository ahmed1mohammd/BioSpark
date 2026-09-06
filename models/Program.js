import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a program title'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    default: 'School Workshops'
  },
  shortDescription: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  fullDescription: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: '/main.png'
  },
  icon: {
    type: String,
    default: 'FlaskConical'
  },
  ordering: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('Program', programSchema);
