const mongoose = require("mongoose");
const Event = require("./models/Event");

async function checkEvents() {
  try {
    await mongoose.connect("mongodb+srv://Monisha:monisha_93@cluster0.qusedb8.mongodb.net/collegeEvents", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ Connected to MongoDB");
    
    const events = await Event.find();
    
    console.log(`\n📊 Total Events in Database: ${events.length}\n`);
    
    if (events.length === 0) {
      console.log("❌ No events found! Please run: node seedEvents.js\n");
    } else {
      console.log("📋 Events List:\n");
      events.forEach((evt, index) => {
        console.log(`${index + 1}. ${evt.title}`);
        console.log(`   Category: ${evt.category}`);
        console.log(`   Date: ${evt.date.toDateString()}`);
        console.log(`   Venue: ${evt.venue}`);
        console.log(`   Coordinator: ${evt.coordinator || 'N/A'}`);
        console.log(`   Email: ${evt.email || 'N/A'}`);
        console.log(`   Featured: ${evt.featured ? 'Yes' : 'No'}`);
        console.log('');
      });
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

checkEvents();
