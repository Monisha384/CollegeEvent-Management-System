const mongoose = require("mongoose");
const Event = require("./models/Event");

mongoose.connect("mongodb+srv://Monisha:monisha_93@cluster0.qusedb8.mongodb.net/collegeEvents", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000
});

mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

const events = [
  {
    title: "AI & Machine Learning Workshop",
    category: "Technical",
    description: "Hands-on session on AI tools and ML model building.",
    date: new Date("2026-03-10"),
    venue: "Seminar Hall A",
    coordinator: "Moni",
    email: "moni@college.edu",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "National Level Hackathon",
    category: "Hackathon",
    description: "24-hour coding challenge with exciting prizes.",
    date: new Date("2026-03-15"),
    venue: "Main Auditorium",
    coordinator: "Monika",
    email: "monika@college.edu",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
    featured: true
  },
  {
    title: "Paper Presentation on Cloud Computing",
    category: "Paper Presentation",
    description: "Students present research ideas in cloud technologies.",
    date: new Date("2026-03-18"),
    venue: "Conference Hall",
    coordinator: "Nandhini",
    email: "nandhini@college.edu",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "Project Expo 2026",
    category: "Project Expo",
    description: "Innovative final year projects showcase.",
    date: new Date("2026-03-20"),
    venue: "Expo Center",
    coordinator: "Mouli",
    email: "mouli@college.edu",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    featured: true
  },
  {
    title: "Cultural Fest - Rhythm Night",
    category: "Non-Technical",
    description: "Music, dance and cultural performances.",
    date: new Date("2026-03-22"),
    venue: "Open Ground",
    coordinator: "Harini",
    email: "harini@college.edu",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "Web Development Bootcamp",
    category: "Technical",
    description: "Full stack development hands-on training.",
    date: new Date("2026-03-25"),
    venue: "Lab 3",
    coordinator: "Shivani",
    email: "shivani@college.edu",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "Debugging Contest",
    category: "Technical",
    description: "Find and fix coding errors.",
    date: new Date("2026-03-28"),
    venue: "Computer Lab",
    coordinator: "Nathiya",
    email: "nathiya@college.edu",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "IoT Innovations",
    category: "Technical",
    description: "Explore smart devices and IoT solutions.",
    date: new Date("2026-04-02"),
    venue: "Lab 1",
    coordinator: "Moni",
    email: "moni@college.edu",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "Cyber Security Awareness",
    category: "Technical",
    description: "Learn ethical hacking basics.",
    date: new Date("2026-04-05"),
    venue: "Seminar Hall B",
    coordinator: "Monika",
    email: "monika@college.edu",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    featured: true
  },
  {
    title: "Startup Pitching Event",
    category: "Non-Technical",
    description: "Present your startup ideas.",
    date: new Date("2026-04-08"),
    venue: "Innovation Hub",
    coordinator: "Harini",
    email: "harini@college.edu",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "Code Sprint 2026",
    category: "Hackathon",
    description: "Rapid problem-solving coding event.",
    date: new Date("2026-04-10"),
    venue: "Main Lab",
    coordinator: "Mouli",
    email: "mouli@college.edu",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "Robotics Workshop",
    category: "Technical",
    description: "Design and program robots.",
    date: new Date("2026-04-12"),
    venue: "Robotics Lab",
    coordinator: "Nandhini",
    email: "nandhini@college.edu",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "Treasure Hunt",
    category: "Non-Technical",
    description: "Fun campus adventure challenge.",
    date: new Date("2026-04-15"),
    venue: "College Campus",
    coordinator: "Shivani",
    email: "shivani@college.edu",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "Mobile App Development",
    category: "Technical",
    description: "Build Android & iOS applications.",
    date: new Date("2026-04-18"),
    venue: "Lab 5",
    coordinator: "Moni",
    email: "moni@college.edu",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "Quiz Competition",
    category: "Non-Technical",
    description: "Test your knowledge skills.",
    date: new Date("2026-04-20"),
    venue: "Auditorium",
    coordinator: "Nathiya",
    email: "nathiya@college.edu",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "Data Science Symposium",
    category: "Paper Presentation",
    description: "Present research on data analytics and visualization.",
    date: new Date("2026-04-22"),
    venue: "Conference Hall",
    coordinator: "Monika",
    email: "monika@college.edu",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "Blockchain Technology Workshop",
    category: "Technical",
    description: "Learn cryptocurrency and smart contracts.",
    date: new Date("2026-04-25"),
    venue: "Lab 2",
    coordinator: "Harini",
    email: "harini@college.edu",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "Game Development Jam",
    category: "Hackathon",
    description: "Create games in 48 hours.",
    date: new Date("2026-04-28"),
    venue: "Gaming Lab",
    coordinator: "Mouli",
    email: "mouli@college.edu",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    featured: true
  },
  {
    title: "Green Energy Project Showcase",
    category: "Project Expo",
    description: "Sustainable energy solutions by students.",
    date: new Date("2026-05-02"),
    venue: "Expo Hall",
    coordinator: "Nandhini",
    email: "nandhini@college.edu",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop",
    featured: false
  },
  {
    title: "Sports Day 2026",
    category: "Non-Technical",
    description: "Annual sports and athletics meet.",
    date: new Date("2026-05-05"),
    venue: "Sports Ground",
    coordinator: "Shivani",
    email: "shivani@college.edu",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
    featured: false
  }
];

async function seedEvents() {
  try {
    console.log('⏳ Waiting for MongoDB connection...');
    await mongoose.connection.asPromise();
    console.log('🔄 Clearing existing events...');
    await Event.deleteMany({});
    console.log('📝 Inserting new events...');
    await Event.insertMany(events);
    console.log("✅ Successfully added", events.length, "events!");
    console.log("📊 Categories:");
    console.log("   - Technical: 7 events");
    console.log("   - Hackathon: 3 events");
    console.log("   - Paper Presentation: 2 events");
    console.log("   - Project Expo: 2 events");
    console.log("   - Non-Technical: 6 events");
    console.log("👥 Coordinators: Moni, Monika, Nandhini, Mouli, Nathiya, Harini, Shivani");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding events:", error);
    process.exit(1);
  }
}

seedEvents();
