import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a product title'],
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
    default: 'Educational Kits'
  },
  shortDescription: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  imageUrl: {
    type: String,
    default: '/main.png'
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  salePrice: {
    type: Number,
    default: 0
  },
  stockStatus: {
    type: String,
    enum: ['In Stock', 'Out of Stock', 'Pre-Order'],
    default: 'In Stock'
  },
  sku: {
    type: String,
    default: ''
  },
  specifications: [{
    key: { type: String },
    value: { type: String }
  }],
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

export default mongoose.model('Product', productSchema);
