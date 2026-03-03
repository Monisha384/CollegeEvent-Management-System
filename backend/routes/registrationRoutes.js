const router = require("express").Router();
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const { sendRegistrationEmail } = require("../utils/emailService");

// CREATE Registration
router.post("/", async (req, res) => {
  try {
    const registration = await Registration.create(req.body);
    const event = await Event.findById(req.body.eventId);
    
    // Send confirmation email
    if (event) {
      await sendRegistrationEmail(req.body, event);
    }
    
    res.json({ message: "Registration successful", registration });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

// GET Registrations by Event ID
router.get("/event/:eventId", async (req, res) => {
  try {
    const registrations = await Registration.find({ eventId: req.params.eventId })
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch registrations", error: error.message });
  }
});

// GET All Registrations
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("eventId", "title date venue")
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch registrations", error: error.message });
  }
});

// DELETE Registration
router.delete("/:id", async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.json({ message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete registration", error: error.message });
  }
});

// MARK Attendance
router.patch("/:id/attendance", async (req, res) => {
  try {
    const { attendanceStatus, markedBy } = req.body;
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      {
        attendanceStatus,
        attendanceMarkedBy: markedBy,
        attendanceMarkedAt: new Date()
      },
      { new: true }
    );
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.json({ message: "Attendance marked successfully", registration });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark attendance", error: error.message });
  }
});

module.exports = router;
