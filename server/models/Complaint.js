import mongoose from "mongoose";

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
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxLength: [200, "Title cannot exceed 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxLength: [2000, "Description cannot exceed 2000 characters"],
  },
  category: {
    type: String,
    required: true,
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
  subCategory: String,

  aiAnalysis: {
    detectedCategories: [
      {
        category: String,
        confidence: Number,
      },
    ],
    priorityScore: {
      type: Number,
      min: 0,
      max: 10,
      default: 5,
    },
    sentimentScore: {
      type: Number,
      min: -1,
      max: 1,
      default: 0,
    },
    urgencyLevel: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    keywords: [String],
    predictedResolutionTime: Number,
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
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
        enum: ["image", "video", "document"],
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  status: {
    type: String,
    enum: [
      "pending",
      "assigned",
      "in-progress",
      "resolved",
      "rejected",
      "closed",
    ],
    default: "pending",
  },

  assignedTo: {
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    officer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
        ref: "User",
      },
      notes: String,
      status: String,
    },
  ],

  relatedComplaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
    },
  ],
  isDuplicate: {
    type: Boolean,
    default: false,
  },
  masterComplaint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Complaint",
  },

  upvotes: {
    type: Number,
    default: 0,
  },
  upvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  resolutionDetails: {
    resolvedAt: Date,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resolutionNotes: String,
    resolutionImages: [String],
    citizenRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    citizenFeedback: String,
  },

  sla: {
    targetResolutionTime: Number, // in hours
    breached: {
      type: Boolean,
      default: false,
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

complaintSchema.index({ location: "2dsphere" });
complaintSchema.index({ status: 1, createdAt: -1 });
complaintSchema.index({ "assignedTo.department": 1, status: 1 });
complaintSchema.index({ citizen: 1, createdAt: -1 });
complaintSchema.index({ complaintId: 1 });
complaintSchema.index({ category: 1 });

complaintSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
