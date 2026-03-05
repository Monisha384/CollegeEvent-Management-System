# Deployment Guide

## Current Issues:
1. Events not showing - Backend not connected
2. Registration errors - API calls failing
3. Password emoji not showing - Font/encoding issue

## Solution:

### Step 1: Deploy Backend on Render.com

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: college-events-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: npm install
   - **Start Command**: node server.js
   
5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://Monisha:monisha_93@cluster0.qusedb8.mongodb.net/collegeEvents
   PORT=5001
   NODE_ENV=production
   ```

6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
8. Copy your backend URL (e.g., https://college-events-backend.onrender.com)

### Step 2: Test Backend

Open in browser:
```
https://your-backend-url.onrender.com/api/health
```

Should return:
```json
{"status":"OK","message":"Server is running"}
```

### Step 3: Configure Vercel Frontend

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```
5. Go to Deployments
6. Click "..." → Redeploy

### Step 4: Verify Deployment

1. Open your Vercel site
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Look for: "🌐 API Base URL: https://..."
5. Check Network tab for API calls

### Common Errors:

**Error: "Already registered"**
- Cause: Backend not connected, using cached error
- Fix: Set REACT_APP_API_URL correctly

**Error: "Events not showing"**
- Cause: API URL is wrong or backend is down
- Fix: Check backend URL in console

**Error: "Emoji not showing"**
- Cause: Font encoding issue
- Fix: Already fixed in code

### Alternative: Use Vercel for Both

If you want to deploy backend on Vercel too:

1. Create separate Vercel project for backend
2. Root directory: backend
3. Build command: npm install
4. Output directory: .
5. Add same environment variables

### Quick Test Commands:

Test backend locally:
```bash
cd backend
node server.js
```

Test frontend locally:
```bash
cd frontend
npm start
```

### Environment Variables Summary:

**Backend (.env):**
```
MONGODB_URI=mongodb+srv://Monisha:monisha_93@cluster0.qusedb8.mongodb.net/collegeEvents
PORT=5001
NODE_ENV=production
```

**Frontend (Vercel):**
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

### Troubleshooting:

1. **Check browser console** - Shows API errors
2. **Check Network tab** - Shows failed requests
3. **Test backend URL** - Open /api/health in browser
4. **Check Vercel logs** - Shows build errors
5. **Check Render logs** - Shows backend errors
