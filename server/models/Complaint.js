import { Schema, model } from "mongoose";

const complaintSchema = new Schema(
  {
    complaintId: {
      type: String,
      unique: true,
      required: true,
    },
    citizen: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
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
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    status: {
      type: String,
      enum: [
        "submitted",
        "under_review",
        "in_progress",
        "resolved",
        "closed",
        "rejected",
      ],
      default: "submitted",
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: String,
      state: String,
      pincode: String,
      landmark: String,
    },

    media: [
      {
        type: {
          type: String,
          enum: ["image", "video", "document"],
        },
        url: String,
        publicId: String,
        filename: String,
      },
    ],

    assignedTo: {
      department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
      },
      official: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      assignedAt: Date,
    },
    aiAnalysis: {
      suggestedCategory: String,
      suggestedPriority: String,
      sentiment: {
        type: String,
        enum: ["positive", "neutral", "negative", "urgent"],
      },
      keywords: [String],
      confidence: Number,
      processedAt: Date,
    },
    statusHistory: [
      {
        status: String,
        updatedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        remarks: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        message: String,
        isInternal: {
          type: Boolean,
          default: false,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    resolution: {
      actionTaken: String,
      resolvedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      resolvedAt: Date,
      documents: [
        {
          url: String,
          filename: String,
        },
      ],
    },
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      submittedAt: Date,
    },
    isEscalated: {
      type: Boolean,
      default: false,
    },
    escalationHistory: [
      {
        escalatedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        reason: String,
        timestamp: Date,
      },
    ],
    isDuplicate: {
      type: Boolean,
      default: false,
    },
    relatedComplaints: [
      {
        type: Schema.Types.ObjectId,
        ref: "Complaint",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
complaintSchema.index({ location: "2dsphere" });
complaintSchema.index({ complaintId: 1 });
complaintSchema.index({ citizen: 1, createdAt: -1 });
complaintSchema.index({ status: 1, priority: -1 });
complaintSchema.index({ "assignedTo.department": 1, status: 1 });
complaintSchema.index({ category: 1, createdAt: -1 });

// Auto-generate complaintId
complaintSchema.pre("save", async function (next) {
  if (this.isNew) {
    const count = await model("Complaint").countDocuments();
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    this.complaintId = `CMP${year}${month}${String(count + 1).padStart(
      6,
      "0"
    )}`;
  }
  next();
});

// Virtual for response time
complaintSchema.virtual("responseTime").get(function () {
  if (this.resolution && this.resolution.resolvedAt) {
    return Math.ceil(
      (this.resolution.resolvedAt - this.createdAt) / (1000 * 60 * 60 * 24)
    ); // days
  }
  return null;
});

complaintSchema.set("toJSON", { virtuals: true });
complaintSchema.set("toObject", { virtuals: true });

export default model("Complaint", complaintSchema);
