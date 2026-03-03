# 🎓 Professional College Event Management System

A modern, feature-rich event management platform built with MERN stack, designed with professional UI/UX inspired by Flipkart and Amazon.

## ✨ Features

### 🎯 Core Features
- **User Authentication** - Secure login/register with JWT
- **Event Discovery** - Browse all campus events with beautiful cards
- **Advanced Search & Filters** - Search by name, filter by category, sort by date/featured
- **Event Registration** - One-click registration for events
- **Admin Dashboard** - Comprehensive stats and event management
- **Create Events** - Easy-to-use form with validation
- **Responsive Design** - Works perfectly on all devices

### 🎨 Professional UI Features
- **Gradient Backgrounds** - Modern purple gradient theme
- **Hover Animations** - Smooth card lift effects
- **Loading States** - Professional spinners and feedback
- **Error Handling** - User-friendly error messages
- **Stats Dashboard** - Visual analytics with gradient cards
- **Featured Events** - Highlight important events
- **Category Badges** - Color-coded event categories
- **Empty States** - Helpful messages when no data

### 📊 Event Categories
- 🤖 AI & Machine Learning
- 💻 Technical (Workshops, Seminars)
- 💡 Hackathons
- 🎯 Non-Technical (Cultural, Sports)

## 🚀 Quick Start

### 1. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Start MongoDB (make sure it's running)
# Windows: net start MongoDB
# Mac/Linux: sudo systemctl start mongod

# Seed the database with 16 professional events
node seedEvents.js

# Start backend server
node server.js
```

Backend runs on: `http://localhost:5000`

### 2. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start React app
npm start
```

Frontend runs on: `http://localhost:3000`

## 📦 What's Included

### Backend Files
- ✅ **Fixed authRoutes.js** - Proper error handling for register/login
- ✅ **Updated Event.js model** - Added category, image, featured fields
- ✅ **seedEvents.js** - 16 professional college events ready to use

### Frontend Files
- ✅ **Register.js** - Fixed with error handling and validation
- ✅ **Login.js** - Professional UI with error messages
- ✅ **Home.js** - Hero section, stats, featured events, categories
- ✅ **Events.js** - Advanced search, filters, sorting, registration
- ✅ **Dashboard.js** - Stats cards, table view, delete functionality
- ✅ **CreateEvent.js** - Professional form with dropdown categories
- ✅ **Navbar.js** - Dynamic auth state, gradient design
- ✅ **App.css** - Modern global styles
- ✅ **Events.css** - Hover animations

## 🎨 Design Highlights

### Color Scheme
- Primary Gradient: `#667eea → #764ba2` (Purple)
- Accent Colors: Pink, Blue, Yellow gradients for stats
- Clean white cards with subtle shadows

### Typography
- Segoe UI font family
- Bold headings with proper hierarchy
- Readable body text with proper spacing

### Animations
- Card hover lift effect
- Button hover animations
- Smooth transitions throughout
- Custom scrollbar styling

## 📱 Pages Overview

### 1. Home Page
- Hero section with gradient background
- Live stats (Total, Upcoming, Categories)
- Featured events showcase
- Category cards with icons

### 2. Events Page
- Search bar with real-time filtering
- Category dropdown filter
- Sort by date or featured
- Event count badge
- Registration functionality
- Professional event cards

### 3. Dashboard (Admin)
- 4 gradient stat cards
- Events table with images
- Status badges (Upcoming/Completed)
- Delete functionality
- Create event button

### 4. Create Event
- Professional form layout
- Category dropdown
- Date picker
- Image URL input
- Description textarea
- Featured toggle switch
- Form validation

### 5. Login/Register
- Gradient background
- Error handling
- Loading states
- Form validation
- Links between pages

## 🔐 Authentication Flow

1. User registers → Backend checks for existing email
2. Password hashed with bcrypt
3. User logs in → JWT token generated
4. Token stored in localStorage
5. Protected routes check for token
6. Navbar shows/hides based on auth state

## 📊 Sample Events Included

The seed script adds 16 professional events:
- AI & ML Summit (Featured)
- HackNation 2024 (Featured)
- Web Development Bootcamp
- Cloud Computing Workshop
- Cybersecurity Challenge (Featured)
- Data Science Symposium
- Mobile App Development
- Startup Pitch Competition (Featured)
- Blockchain Workshop
- Leadership Summit
- IoT Innovation Challenge
- AI Ethics Discussion
- Code Sprint Competition
- Design Thinking Workshop
- Game Development Jam (Featured)
- Career Fair 2024 (Featured)

## 🛠️ Technologies Used

### Frontend
- React 18
- React Router v6
- Bootstrap 5
- Axios
- Custom CSS animations

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

## 🎯 Key Improvements Made

### Fixed Issues
✅ Register form error handling
✅ Backend validation for duplicate emails
✅ Proper error messages
✅ Form validation
✅ Loading states

### Enhanced Features
✅ Professional UI like Flipkart/Amazon
✅ Gradient designs
✅ Hover animations
✅ Search & filter functionality
✅ Sorting options
✅ Stats dashboard
✅ Event registration flow
✅ Responsive design
✅ Empty states
✅ Success/error feedback

## 📝 Usage Tips

1. **First Time Setup**: Run `node seedEvents.js` to populate events
2. **Create Account**: Register with any email/password
3. **Browse Events**: Visit /events to see all events
4. **Register for Events**: Click "Register Now" (requires login)
5. **Admin Access**: Login and visit /dashboard
6. **Create Events**: Use the form with proper categories
7. **Delete Events**: Use dashboard table actions

## 🎨 Customization

### Change Colors
Edit gradient values in:
- `Navbar.js` - Line 19
- `Home.js` - Line 23
- `Dashboard.js` - Stats cards
- `App.css` - Global styles

### Add Categories
Update dropdown in:
- `CreateEvent.js` - Line 65-72

### Modify Event Cards
Edit layout in:
- `Events.js` - Line 130-180

## 🚀 Deployment Ready

The application is production-ready with:
- Error boundaries
- Loading states
- Form validation
- Secure authentication
- Responsive design
- Professional UI/UX

## 📞 Support

If you encounter any issues:
1. Make sure MongoDB is running
2. Check if ports 3000 and 5000 are available
3. Run `npm install` in both folders
4. Clear browser cache if needed

---

**Built with ❤️ for College Event Management**
