const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Monisha:monisha_93@cluster0.qusedb8.mongodb.net/collegeEvents");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
