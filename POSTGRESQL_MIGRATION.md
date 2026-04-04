# PostgreSQL Migration Guide

## ✅ Conversion Complete!

Your project has been converted from MongoDB to PostgreSQL.

## 🔧 Local Setup

### Step 1: Install PostgreSQL

**Windows:**
1. Download from https://www.postgresql.org/download/windows/
2. Install PostgreSQL 15+
3. Remember your password during installation

**Mac:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 2: Create Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE college_events;

# Exit
\q
```

### Step 3: Install Dependencies

```bash
cd backend
npm install
```

### Step 4: Update .env File

Create `backend/.env`:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/college_events
PORT=5001
NODE_ENV=development
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

### Step 5: Update Models in Code

Replace all model imports in routes:

**Old (MongoDB):**
```javascript
const Event = require("./models/Event");
```

**New (PostgreSQL):**
```javascript
const Event = require("./models/Event.postgres");
```

Do this for all models:
- Event.postgres.js
- User.postgres.js
- Registration.postgres.js
- Query.postgres.js
- Chat.postgres.js

### Step 6: Update server.js

Replace MongoDB connection with PostgreSQL:

**Old:**
```javascript
const mongoose = require("mongoose");
mongoose.connect(...)
```

**New:**
```javascript
const { connectDB } = require("./config/database");
connectDB();
```

### Step 7: Start Server

```bash
cd backend
node server.js
```

Should see:
```
✅ PostgreSQL Connected Successfully
📊 Database synced
🚀 Server running on port 5001
```

## 🌐 Deployment on Render

### Step 1: Create PostgreSQL Database on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: college-events-db
   - **Database**: college_events
   - **User**: postgres
   - **Region**: Choose closest
   - **Plan**: Free
4. Click "Create Database"
5. **Copy Internal Database URL** (starts with `postgresql://`)

### Step 2: Deploy Backend

1. Click "New +" → "Web Service"
2. Connect GitHub repository
3. Configure:
   - **Root Directory**: backend
   - **Build Command**: npm install
   - **Start Command**: node server.js

4. Add Environment Variable:
   - **Key**: `DATABASE_URL`
   - **Value**: (paste the Internal Database URL from Step 1)

5. Click "Create Web Service"

### Step 3: Seed Database (Optional)

After deployment, you can seed data using Render Shell:
1. Go to your web service
2. Click "Shell" tab
3. Run: `node seedEvents.postgres.js`

## 📊 Database Schema

PostgreSQL will auto-create these tables:
- events
- users
- registrations
- queries
- chats

All with proper relationships and constraints.

## 🔄 Migration from MongoDB (Optional)

If you want to migrate existing MongoDB data:

1. Export from MongoDB:
```bash
mongoexport --uri="mongodb+srv://..." --collection=events --out=events.json
```

2. Convert and import to PostgreSQL (custom script needed)

## ✅ Verification

Test your PostgreSQL connection:
```bash
psql -U postgres -d college_events -c "SELECT * FROM events;"
```

## 🎯 Benefits of PostgreSQL

- ✅ ACID compliance
- ✅ Better for relational data
- ✅ Strong data integrity
- ✅ Advanced querying
- ✅ Free tier on Render

## 📝 Next Steps

1. Update all route files to use `.postgres` models
2. Test all API endpoints
3. Deploy on Render
4. Update frontend API URL

Your project is now using PostgreSQL! 🎉
