# 🔧 NO EVENTS SHOWING - TROUBLESHOOTING GUIDE

## Problem: Events page shows "No events found"

### ✅ SOLUTION - Follow These Steps:

## Step 1: Check if MongoDB is Running

### Windows:
```bash
net start MongoDB
```

### Mac:
```bash
brew services start mongodb-community
```

### Linux:
```bash
sudo systemctl start mongod
```

---

## Step 2: Check Database for Events

```bash
cd backend
node checkEvents.js
```

**Expected Output:**
```
✅ Connected to MongoDB
📊 Total Events in Database: 15

📋 Events List:
1. AI & Machine Learning Workshop
   Category: Technical
   ...
```

**If you see "0 events"**, go to Step 3.

---

## Step 3: Seed the Database

```bash
cd backend
node seedEvents.js
```

**Expected Output:**
```
✅ Successfully added 15 events!
📊 Categories:
   - Technical: 6 events
   - Hackathon: 2 events
   - Paper Presentation: 1 event
   - Project Expo: 1 event
   - Non-Technical: 5 events
```

---

## Step 4: Verify Backend is Running

```bash
cd backend
node server.js
```

**Expected Output:**
```
✅ MongoDB Connected Successfully
🚀 Server running on http://localhost:5001
📊 API available at http://localhost:5001/api
```

---

## Step 5: Test API Endpoint

Open browser or use curl:
```bash
curl http://localhost:5001/api/events
```

**Should return:** JSON array with 15 events

---

## Step 6: Check Frontend API Configuration

File: `frontend/src/api.js`

Should have:
```javascript
baseURL: "http://localhost:5001/api"
```

---

## Step 7: Start Frontend

```bash
cd frontend
npm start
```

Open: http://localhost:3000/events

---

## 🔍 Common Issues & Fixes

### Issue 1: MongoDB Not Running
**Error:** `MongooseServerSelectionError`

**Fix:**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

---

### Issue 2: Wrong Port
**Error:** Events not loading

**Check:**
1. Backend running on port 5001?
2. Frontend api.js pointing to port 5001?

**Fix:** Make sure both match

---

### Issue 3: Database Empty
**Error:** "No events found"

**Fix:**
```bash
cd backend
node seedEvents.js
```

---

### Issue 4: CORS Error
**Error:** `Access-Control-Allow-Origin`

**Fix:** Already handled in server.js with `app.use(cors())`

---

### Issue 5: Backend Not Running
**Error:** Network error in frontend

**Fix:**
```bash
cd backend
node server.js
```

Keep this terminal open!

---

## 📝 Complete Fresh Start

If nothing works, do a complete reset:

```bash
# 1. Stop all servers (Ctrl+C)

# 2. Start MongoDB
net start MongoDB

# 3. Backend - Seed & Start
cd backend
node seedEvents.js
node server.js

# 4. New Terminal - Frontend
cd frontend
npm start

# 5. Open browser
http://localhost:3000/events
```

---

## ✅ Verification Checklist

Before opening frontend, verify:

- [ ] MongoDB is running
- [ ] Database has 15 events (run `node checkEvents.js`)
- [ ] Backend server is running on port 5001
- [ ] API endpoint works: `curl http://localhost:5001/api/events`
- [ ] Frontend is running on port 3000
- [ ] No console errors in browser (F12)

---

## 🎯 Quick Test Commands

```bash
# Test MongoDB
mongo --version

# Test Backend API
curl http://localhost:5001/api/health

# Test Events API
curl http://localhost:5001/api/events

# Check Events Count
cd backend && node checkEvents.js
```

---

## 📞 Still Not Working?

1. Check browser console (F12) for errors
2. Check backend terminal for errors
3. Verify MongoDB is installed: `mongo --version`
4. Check if ports 3000 and 5001 are free
5. Try restarting computer

---

## 🎉 Success Indicators

You should see:
- ✅ 15 events on events page
- ✅ Each event shows: title, description, date, venue, coordinator, email
- ✅ Search works
- ✅ Filter by category works
- ✅ Sort works
- ✅ Register button works

---

**If you followed all steps and still have issues, share the error message from browser console (F12) or backend terminal.**
