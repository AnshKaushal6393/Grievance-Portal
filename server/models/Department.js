const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
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
          "Roads & Transportation",
          "Water Supply",
          "Electricity",
          "Sanitation",
          "Street Lighting",
          "Public Safety",
          "Healthcare",
          "Education",
          "Others",
        ],
      },
    ],
    head: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    officials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    contact: {
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: String,
    },
    sla: {
      responseTime: {
        type: Number, // in hours
        default: 48,
      },
      resolutionTime: {
        type: Number, // in hours
        default: 168, // 7 days
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    stats: {
      totalComplaints: { type: Number, default: 0 },
      pendingComplaints: { type: Number, default: 0 },
      resolvedComplaints: { type: Number, default: 0 },
      avgResolutionTime: { type: Number, default: 0 },
      satisfactionRating: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

departmentSchema.index({ code: 1 });
departmentSchema.index({ categories: 1 });
departmentSchema.index({ isActive: 1 });

module.exports = mongoose.model("Department", departmentSchema);
