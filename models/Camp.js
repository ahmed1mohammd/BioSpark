import mongoose from 'mongoose';

const campSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a camp title'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    trim: true,
    default: 'Young Scientists'
  },
  description: {
    type: String,
    required: true
  },
  ageRange: {
    type: String,
    default: 'Ages 8-16'
  },
  duration: {
    type: String,
    default: '5 Days (Summer Camp)'
  },
  dates: {
    type: String,
    default: 'July - August 2026'
  },
  location: {
    type: String,
    default: 'BioSpark Lab Center / Partner Schools'
  },
  activities: [{
    type: String
  }],
  imageUrl: {
    type: String,
    default: '/main.png'
  },
  price: {
    type: Number,
    default: 0
  },
  capacity: {
    type: String,
    default: '15-20 Students per session'
  },
  active: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: true
  },
  ordering: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Camp', campSchema);
