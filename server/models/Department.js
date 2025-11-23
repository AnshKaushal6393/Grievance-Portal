const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  description: String,
  categories: [
    {
      type: String,
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
  ],
  contactEmail: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'],
  },
  contactPhone: String,
  officers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      designation: String,
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  currentWorkload: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

departmentSchema.index({ code: 1 });
departmentSchema.index({ categories: 1 });

module.exports = mongoose.model('Department', departmentSchema);