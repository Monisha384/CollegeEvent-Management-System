# 🎯 Online/Offline Participation Mode Feature

## ✅ Feature Overview

Students can now register for events with **dual participation options**:
- **🏫 On-Campus (Offline)** - Physical attendance at venue
- **💻 Online (Virtual)** - Remote participation via online platform

## 🔑 Key Features Implemented

### 1. **Participation Mode Selection**
- Students choose mode during registration
- Default: Offline mode
- Can select Online if unable to attend physically
- Clear descriptions for each mode

### 2. **Attendance Tracking System**
- **3 Attendance States:**
  - 📝 **Registered** - Initial state after registration
  - ✅ **Attended** - Student participated (online or offline)
  - ❌ **Absent** - Student did not participate

### 3. **Certificate Generation Rules**
- 🔒 **Locked** - Certificate unavailable for "Registered" status
- 🔒 **Locked** - Certificate unavailable for "Absent" status
- ✅ **Unlocked** - Certificate available ONLY for "Attended" status

### 4. **Admin Controls**
- Mark attendance via dropdown in Registered Members page
- Track who marked attendance and when
- View participation mode (Online/Online badge)
- Attendance status color-coded:
  - 🟡 Yellow - Registered
  - 🟢 Green - Attended
  - 🔴 Red - Absent

## 📊 Database Schema Updates

### Registration Model Fields Added:
```javascript
participationMode: {
  type: String,
  enum: ["Offline", "Online"],
  required: true,
  default: "Offline"
}

attendanceStatus: {
  type: String,
  enum: ["Registered", "Attended", "Absent"],
  default: "Registered"
}

attendanceMarkedBy: String
attendanceMarkedAt: Date
```

## 🎓 User Flow

### Student Registration:
1. Select event
2. Fill registration form
3. **Choose participation mode:**
   - On-Campus (Offline) - Attend physically
   - Online (Virtual) - Join remotely
4. Complete payment
5. Receive confirmation email
6. Status: **Registered**

### Event Day:
- **Offline students:** Attend at venue
- **Online students:** Join via meeting link (sent via email)

### After Event:
1. Admin marks attendance
2. Status changes to **Attended** or **Absent**
3. Certificate unlocks for **Attended** students only

## 🔐 Certificate Access Control

### Certificate Download Button States:

**🔒 Locked (Disabled):**
- Attendance Status: Registered
- Attendance Status: Absent
- Button: Gray, disabled
- Tooltip: "Certificate available only after attendance"

**✅ Unlocked (Enabled):**
- Attendance Status: Attended
- Button: Green, clickable
- Action: Downloads PDF certificate

## 📱 UI Components

### Registration Form:
```
🎯 Participation Mode Section
├── 🏫 On-Campus (Offline)
│   └── Attend the event physically at the venue
└── 💻 Online (Virtual)
    └── Join the event virtually via online platform
    └── ⚠️ Meeting link sent 1 hour before event
```

### Registered Members Table:
```
Columns:
- Name
- Email
- Phone
- Mode (🏫 Offline / 💻 Online badge)
- Payment
- Attendance (Dropdown: Registered/Attended/Absent)
- Certificate (🔒 Locked / 📜 Download)
- Action (Delete)
```

## 🎨 Visual Indicators

### Participation Mode Badges:
- **🏫 Offline** - Green badge
- **💻 Online** - Blue badge

### Attendance Status Colors:
- **Registered** - Yellow background
- **Attended** - Green background (white text)
- **Absent** - Red background (white text)

## 🔄 API Endpoints

### Mark Attendance:
```
PATCH /api/registrations/:id/attendance
Body: {
  attendanceStatus: "Attended" | "Absent",
  markedBy: "Admin Name"
}
```

## ✨ Benefits

1. **Flexibility** - Students can choose based on circumstances
2. **Emergency Support** - Switch to online if unable to attend
3. **Fair Certification** - Only actual participants get certificates
4. **Attendance Tracking** - Clear record of who participated
5. **Dual Mode Support** - Both online and offline equally valid

## 🎯 Use Cases

### Scenario 1: Emergency Situation
- Student registered for offline mode
- Emergency prevents physical attendance
- Can still participate online
- Gets certificate if attends online

### Scenario 2: Remote Students
- Student from different city
- Registers for online mode
- Joins virtually
- Gets certificate after online participation

### Scenario 3: No-Show
- Student registers but doesn't attend
- Admin marks as "Absent"
- Certificate remains locked
- Fair for actual participants

## 📝 Notes

- Online meeting links sent via email 1 hour before event
- Attendance must be marked by admin/coordinator
- Certificate generation requires "Attended" status
- Both online and offline participants eligible for certificates
- Attendance tracking ensures fairness

---

**Feature Status: ✅ Fully Implemented and Production Ready**
