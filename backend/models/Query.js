const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },
    studentName: {
      type: String,
      required: true,
      trim: true
    },
    studentEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    question: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["Pending", "Answered"],
      default: "Pending"
    },
    adminResponse: {
      type: String,
      trim: true
    },
    respondedBy: {
      type: String,
      trim: true
    },
    respondedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Query", querySchema);
