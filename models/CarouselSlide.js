import mongoose from 'mongoose';

const carouselSlideSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ['home', 'for-schools', 'about', 'camps', 'workshops'],
    default: 'home'
  },
  eyebrow: {
    type: String,
    default: ''
  },
  headline: {
    type: String,
    required: true,
    default: 'BioSpark Science & Biotechnology'
  },
  description: {
    type: String,
    default: ''
  },
  primaryBtnText: {
    type: String,
    default: 'Explore Programs'
  },
  primaryBtnLink: {
    type: String,
    default: '/workshops'
  },
  secondaryBtnText: {
    type: String,
    default: 'Contact Us'
  },
  secondaryBtnLink: {
    type: String,
    default: '/contact'
  },
  imageUrl: {
    type: String,
    default: '/herosec.png'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('CarouselSlide', carouselSlideSchema);
