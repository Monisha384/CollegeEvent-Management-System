# 🚀 QUICK START GUIDE

## Step 1: Start Backend (Terminal 1)
```bash
cd backend
npm install
node seedEvents.js
node server.js
```

## Step 2: Start Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

## Step 3: Test the Application

### ✅ Register a New Account
1. Go to http://localhost:3000
2. Click "Sign Up" button
3. Fill in: Name, Email, Password
4. Click "Register"

### ✅ Login
1. Use your registered email/password
2. Click "Login"
3. You'll be redirected to Dashboard

### ✅ Browse Events
1. Click "🎫 Events" in navbar
2. Use search bar to find events
3. Filter by category
4. Sort by date or featured
5. Click "Register Now" on any event

### ✅ Create Event (Admin)
1. Go to Dashboard
2. Click "➕ Create New Event"
3. Fill in all details
4. Select category from dropdown
5. Toggle "Featured" if needed
6. Click "✨ Create Event"

### ✅ Manage Events
1. Go to Dashboard
2. View stats cards
3. See all events in table
4. Click "🗑️ Delete" to remove events

## 🎯 Features to Try

- ✨ Search events by name
- 🏷️ Filter by category (AI, Technical, Hackathon, Non-Technical)
- 📅 Sort by date or featured
- ⭐ See featured events on home page
- 📊 View stats on dashboard
- 🎫 Register for events (requires login)

## 🎨 What Makes It Professional

✅ Gradient purple theme (like modern apps)
✅ Smooth hover animations on cards
✅ Loading spinners
✅ Error messages
✅ Form validation
✅ Responsive design
✅ Professional typography
✅ Stats dashboard with gradients
✅ Search & filter functionality
✅ Empty states with helpful messages

## 📦 What's Already Loaded

After running `seedEvents.js`, you'll have:
- 16 professional college events
- 4 categories (AI, Technical, Hackathon, Non-Technical)
- 6 featured events
- High-quality images from Unsplash
- Realistic dates and venues

## 🔥 Pro Tips

1. **First Visit**: Check out the home page for featured events
2. **Search**: Try searching "AI" or "Hackathon"
3. **Filter**: Use category dropdown to filter events
4. **Dashboard**: Login to see beautiful stats cards
5. **Create**: Add your own events with custom categories

## ⚡ Troubleshooting

**MongoDB not running?**
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

**Port already in use?**
- Backend: Change port in `server.js`
- Frontend: Change port in `package.json`

**Events not showing?**
- Run `node seedEvents.js` again
- Check MongoDB connection in `config/db.js`

---

**Enjoy your professional event management system! 🎉**
