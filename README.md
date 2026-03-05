# 🎓 College Event Management System

A modern, full-stack event management platform built with MERN stack for college events.

## ✨ Features

### Core Features
- 🔐 User Authentication (JWT)
- 🎫 Event Discovery & Registration
- 📊 Admin Dashboard
- 📝 Create & Manage Events
- 💳 UPI Payment with QR Code
- 📜 Certificate Generation
- 📧 Email Notifications

### Advanced Features
- ⏱️ Countdown Timer
- 🏨 Hostel Accommodation
- 👥 Attendance Tracking (Registered/Attended/Absent)
- 🎯 Online/Offline Participation Mode
- ❓ Query & Response System
- 🔴 Live Event Streaming (YouTube/Google Meet)
- 📺 Live Classes Page
- 🎥 Event Videos
- 📱 Responsive Design
- 🔝 Scroll to Top Button

## 🚀 Tech Stack

**Frontend:**
- React 18
- React Router v6
- Bootstrap 5
- Axios
- jsPDF

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Git

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/college-event-management.git
cd college-event-management
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=mongodb+srv://Monisha:monisha_93@cluster0.qusedb8.mongodb.net/collegeEvents
PORT=5001
NODE_ENV=development
```

Start backend:
```bash
node server.js
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm start
```

4. **Seed Database (Optional)**
```bash
cd backend
node seedEvents.js
```

## 🌐 Deployment

### Backend Deployment (Render.com)

1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables:
   - `MONGODB_URI`
   - `PORT=5001`
   - `NODE_ENV=production`

### Frontend Deployment (Vercel)

1. Go to https://vercel.com
2. Import GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add Environment Variable:
   - `REACT_APP_API_URL=https://your-backend-url.onrender.com/api`

## 📱 Pages

- `/` - Home Page
- `/events` - Browse Events
- `/live-classes` - Live Streaming Events
- `/register/:id` - Event Registration
- `/login` - User Login
- `/register` - User Registration
- `/dashboard` - Admin Dashboard
- `/create` - Create Event
- `/my-queries` - Student Queries
- `/manage-queries` - Admin Query Management
- `/members/:id` - Registered Members
- `/videos` - Event Videos
- `/api-test` - API Connection Test

## 🔑 Environment Variables

### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
NODE_ENV=production
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## 📊 Database Schema

### Event
- title, description, date, venue
- category, image, featured
- coordinator, email
- liveStreamUrl, isLive

### User
- name, email, password (hashed)

### Registration
- eventId, name, email, phone
- college, year, department
- paymentMethod, transactionId, paymentStatus
- participationMode, attendanceStatus
- hostelAccommodation

### Query
- eventId, studentName, studentEmail
- question, status, adminResponse
- respondedBy, respondedAt

### Chat
- eventId, userName, userEmail
- message, isCoordinator

## 🎨 UI Features

- Modern gradient design
- Hover animations
- Loading states
- Error handling
- Empty states
- Professional forms
- Responsive cards

## 🔒 Security

- JWT authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation
- Protected routes

## 📝 API Endpoints

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `GET /api/events/:id` - Get event by ID
- `DELETE /api/events/:id` - Delete event

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Registrations
- `POST /api/registrations` - Register for event
- `GET /api/registrations/event/:id` - Get event registrations
- `PATCH /api/registrations/:id/attendance` - Mark attendance

### Queries
- `POST /api/queries` - Submit query
- `GET /api/queries/student/:email` - Get student queries
- `GET /api/queries` - Get all queries (admin)
- `PATCH /api/queries/:id/respond` - Respond to query

## 👥 Contributors

- Your Name

## 📄 License

MIT License

## 🙏 Acknowledgments

- MongoDB Atlas
- Vercel
- Render.com
- Unsplash (for images)

---

**Built with ❤️ for College Event Management**
