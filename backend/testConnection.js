const mongoose = require("mongoose");

// Test MongoDB Connection
async function testConnection() {
  try {
    console.log("🔍 Testing MongoDB connection...");
    
    await mongoose.connect("mongodb+srv://Monisha:monisha_93@cluster0.qusedb8.mongodb.net/collegeEvents", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 3000
    });
    
    console.log("✅ MongoDB connection successful!");
    console.log("📊 Database:", mongoose.connection.name);
    console.log("🌐 Host:", mongoose.connection.host);
    console.log("🔌 Port:", mongoose.connection.port);
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("\n📁 Collections in database:");
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    
    // Count documents
    const Event = require("./models/Event");
    const User = require("./models/user");
    
    const eventCount = await Event.countDocuments();
    const userCount = await User.countDocuments();
    
    console.log("\n📈 Document counts:");
    console.log(`   - Events: ${eventCount}`);
    console.log(`   - Users: ${userCount}`);
    
    if (eventCount === 0) {
      console.log("\n⚠️  No events found! Run: node seedEvents.js");
    } else {
      console.log("\n✅ Database is ready!");
    }
    
    await mongoose.connection.close();
    process.exit(0);
    
  } catch (error) {
    console.error("\n❌ Connection failed!");
    console.error("Error:", error.message);
    console.log("\n💡 Solutions:");
    console.log("   1. Make sure MongoDB is running");
    console.log("   2. Windows: net start MongoDB");
    console.log("   3. Mac/Linux: sudo systemctl start mongod");
    process.exit(1);
  }
}

testConnection();
