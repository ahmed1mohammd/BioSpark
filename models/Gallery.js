import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an image title'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide image URL']
  },
  category: {
    type: String,
    enum: ['Workshops', 'Experiments', 'Events', 'Students', 'Behind the Scenes', 'Mobile Lab', 'Science Days', 'Camps', 'Exhibitions'],
    default: 'Workshops'
  },
  size: {
    type: String,
    enum: ['large', 'medium', 'portrait', 'wide', 'small'],
    default: 'medium'
  },
  featured: {
    type: Boolean,
    default: true
  },
  ordering: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
