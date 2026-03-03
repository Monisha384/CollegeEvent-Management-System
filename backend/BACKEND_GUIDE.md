# 🔧 BACKEND SETUP & TROUBLESHOOTING GUIDE

## ✅ What Was Fixed

### 1. Database Connection Issue
- **Problem**: seedEvents.js was connecting to wrong database
- **Fixed**: Changed from `event-management` to `collegeEvents`
- **Result**: Frontend and backend now use same database

### 2. Error Handling
- **Added**: Try-catch blocks in all routes
- **Added**: Proper error messages
- **Added**: Status codes (404, 500)
- **Result**: Better error feedback to frontend

### 3. Server Configuration
- **Added**: Health check endpoint
- **Added**: 404 handler
- **Added**: Global error handler
- **Added**: Better connection options
- **Result**: More robust server

## 🚀 STEP-BY-STEP SETUP

### Step 1: Test MongoDB Connection
```bash
cd backend
node testConnection.js
```

**Expected Output:**
```
✅ MongoDB connection successful!
📊 Database: collegeEvents
📁 Collections in database:
   - events
   - users
📈 Document counts:
   - Events: 16
   - Users: 0
```

**If it fails:**
- Start MongoDB: `net start MongoDB` (Windows)
- Check if MongoDB is installed
- Verify port 27017 is available

### Step 2: Seed Database (If No Events)
```bash
node seedEvents.js
```

**Expected Output:**
```
✅ Successfully added 16 events!
```

### Step 3: Start Server
```bash
node server.js
```

**Expected Output:**
```
✅ MongoDB Connected Successfully
🚀 Server running on http://localhost:5001
📊 API available at http://localhost:5001/api
```

### Step 4: Test API Endpoints

**Test Health Check:**
```bash
curl http://localhost:5001/api/health
```

**Test Get Events:**
```bash
curl http://localhost:5001/api/events
```

## 🔍 COMMON ISSUES & SOLUTIONS

### Issue 1: "MongoDB not running"
**Error:** `MongooseServerSelectionError`

**Solution:**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Issue 2: "Port 5001 already in use"
**Error:** `EADDRINUSE`

**Solution 1 - Kill process:**
```bash
# Windows
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5001 | xargs kill -9
```

**Solution 2 - Change port:**
Edit `server.js` line 45:
```javascript
const PORT = 5002; // Change to any available port
```

Then update `frontend/src/api.js`:
```javascript
baseURL: "http://localhost:5002/api"
```

### Issue 3: "Events not showing in frontend"
**Possible causes:**
1. Wrong database name
2. Events not seeded
3. CORS issue
4. Wrong API URL

**Solution:**
```bash
# 1. Check database
node testConnection.js

# 2. Reseed events
node seedEvents.js

# 3. Verify API URL in frontend/src/api.js
# Should be: http://localhost:5001/api

# 4. Check server logs for errors
```

### Issue 4: "Register/Login not working"
**Check:**
1. Auth routes are registered in server.js
2. User model exists
3. bcryptjs is installed
4. JWT secret is set

**Verify:**
```bash
# Check if packages are installed
npm list bcryptjs jsonwebtoken

# If missing, install
npm install bcryptjs jsonwebtoken
```

### Issue 5: "CORS Error"
**Error:** `Access-Control-Allow-Origin`

**Solution:**
Already fixed in server.js with:
```javascript
app.use(cors());
```

If still having issues:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## 📊 API ENDPOINTS

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Health Check
- `GET /api/health` - Check server status

## 🧪 TESTING WITH POSTMAN/CURL

### Register User
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"123456"}'
```

### Login User
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

### Get Events
```bash
curl http://localhost:5001/api/events
```

### Create Event
```bash
curl -X POST http://localhost:5001/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Test Event",
    "description":"Test Description",
    "date":"2024-12-31",
    "venue":"Test Venue",
    "category":"Technical",
    "image":"https://via.placeholder.com/400x200",
    "featured":false
  }'
```

## 📝 CHECKLIST

Before starting frontend, verify:
- [ ] MongoDB is running
- [ ] Database has events (run seedEvents.js)
- [ ] Server starts without errors
- [ ] Port 5001 is available
- [ ] API endpoints respond correctly
- [ ] CORS is enabled
- [ ] All dependencies installed

## 🎯 QUICK COMMANDS

```bash
# Full setup from scratch
cd backend
npm install
node testConnection.js
node seedEvents.js
node server.js

# In another terminal
cd frontend
npm install
npm start
```

## 🔄 RESET DATABASE

If you need to start fresh:
```bash
# Delete all events
node -e "require('mongoose').connect('mongodb://127.0.0.1:27017/collegeEvents').then(() => require('./models/Event').deleteMany({})).then(() => console.log('Deleted')).then(() => process.exit())"

# Reseed
node seedEvents.js
```

## 📞 STILL HAVING ISSUES?

1. Check server logs for specific errors
2. Verify MongoDB is running: `mongo --version`
3. Check Node.js version: `node --version` (should be 14+)
4. Verify all packages: `npm list`
5. Clear node_modules and reinstall: `rm -rf node_modules && npm install`

---

**✅ Backend is now properly configured and ready to work with your frontend!**
