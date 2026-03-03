const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    college: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true,
      trim: true
    },
    paymentMethod: {
      type: String,
      required: true
    },
    transactionId: {
      type: String,
      trim: true
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Paid"
    },
    participationMode: {
      type: String,
      enum: ["Offline", "Online"],
      required: true,
      default: "Offline"
    },
    attendanceStatus: {
      type: String,
      enum: ["Registered", "Attended", "Absent"],
      default: "Registered"
    },
    attendanceMarkedBy: {
      type: String,
      trim: true
    },
    attendanceMarkedAt: {
      type: Date
    },
    hostelAccommodation: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Registration", registrationSchema);
