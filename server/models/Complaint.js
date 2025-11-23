const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId: {
    type: String,
    unique: true,
    default: function () {
      return `GR${Date.now()}${Math.floor(Math.random() * 1000)}`;
    },
  },
  citizen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Roads & Transportation',
      'Water Supply',
      'Electricity',
      'Sanitation',
      'Street Lighting',
      'Public Safety',
      'Healthcare',
      'Education',
      'Others',
    ],
  },
  subCategory: String,
  
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: String,
    landmark: String,
  },
  
  media: [
    {
      url: String,
      publicId: String,
      type: {
        type: String,
        enum: ['image', 'video', 'document'],
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in-progress', 'resolved', 'rejected', 'closed'],
    default: 'pending',
  },
  
  assignedTo: {
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    officer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    assignedAt: Date,
  },
  
  timeline: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      action: String,
      performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      notes: String,
      status: String,
    },
  ],
  
  upvotes: {
    type: Number,
    default: 0,
  },
  upvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  
  aiAnalysis: {
    priorityScore: {
      type: Number,
      min: 0,
      max: 10,
      default: 5,
    },
    sentimentScore: Number,
    urgencyLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes
complaintSchema.index({ location: '2dsphere' });
complaintSchema.index({ status: 1, createdAt: -1 });
complaintSchema.index({ 'assignedTo.department': 1, status: 1 });
complaintSchema.index({ citizen: 1, createdAt: -1 });
complaintSchema.index({ complaintId: 1 });
complaintSchema.index({ category: 1 });

// Update timestamp on save
complaintSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Complaint', complaintSchema);