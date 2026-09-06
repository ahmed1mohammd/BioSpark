import mongoose from 'mongoose';

const schoolInquirySchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: [true, 'Please add school name'],
    trim: true
  },
  contactPerson: {
    type: String,
    required: [true, 'Please add contact person name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add phone number']
  },
  studentCount: {
    type: String,
    default: '50-100'
  },
  studentGrade: {
    type: String,
    default: 'Middle School (Grades 6-8)'
  },
  interestedProgram: {
    type: String,
    default: 'School Workshops'
  },
  preferredDate: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Progress', 'Closed', 'replied', 'pending', 'Replied', 'Pending'],
    default: 'New'
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('SchoolInquiry', schoolInquirySchema);
