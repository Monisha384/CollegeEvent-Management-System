const axios = require('axios');

const events = [
  {
    title: "AI & Machine Learning Workshop",
    category: "Technical",
    description: "Hands-on session on AI tools and ML model building.",
    date: "2026-03-10",
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
    date: "2026-03-15",
    venue: "Main Auditorium",
    coordinator: "Monika",
    email: "monika@college.edu",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
    featured: true
  },
  {
    title: "Project Expo 2026",
    category: "Project Expo",
    description: "Innovative final year projects showcase.",
    date: "2026-03-20",
    venue: "Expo Center",
    coordinator: "Mouli",
    email: "mouli@college.edu",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    featured: true
  }
];

async function addEvents() {
  for (const event of events) {
    try {
      await axios.post('http://localhost:5001/api/events', event);
      console.log(`✅ Added: ${event.title}`);
    } catch (error) {
      console.error(`❌ Failed: ${event.title}`, error.message);
    }
  }
  console.log('✅ Done!');
}

addEvents();
