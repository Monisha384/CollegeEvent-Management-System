const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    date: {
      type: Date,
      required: [true, "Event date is required"]
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/400x200"
    },
    featured: {
      type: Boolean,
      default: false
    },
    coordinator: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    liveStreamUrl: {
      type: String,
      trim: true
    },
    isLive: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", eventSchema);
