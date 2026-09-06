import mongoose from 'mongoose';

const boardMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a member name'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Please add a role or title'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: 'https://i.ibb.co/Swf7dWKP/1253ad67-7fdc-438e-b138-3945c710d495.jpg'
  },
  imagePosition: {
    type: String,
    default: 'center top'
  },
  linkedin: {
    type: String,
    default: '#'
  },
  facebook: {
    type: String,
    default: '#'
  },
  tiktok: {
    type: String,
    default: '#'
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

export default mongoose.model('BoardMember', boardMemberSchema);
