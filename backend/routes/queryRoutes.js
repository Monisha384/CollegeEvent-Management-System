const express = require("express");
const router = express.Router();
const Query = require("../models/Query");

// Get all queries (admin)
router.get("/", async (req, res) => {
  try {
    const queries = await Query.find().populate("eventId").sort({ createdAt: -1 });
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get queries by event
router.get("/event/:eventId", async (req, res) => {
  try {
    const queries = await Query.find({ eventId: req.params.eventId }).sort({ createdAt: -1 });
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get queries by student email
router.get("/student/:email", async (req, res) => {
  try {
    const queries = await Query.find({ studentEmail: req.params.email }).populate("eventId").sort({ createdAt: -1 });
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit a new query
router.post("/", async (req, res) => {
  try {
    const query = new Query(req.body);
    await query.save();
    res.status(201).json(query);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update query with admin response
router.patch("/:id/respond", async (req, res) => {
  try {
    const { adminResponse, respondedBy } = req.body;
    const query = await Query.findByIdAndUpdate(
      req.params.id,
      {
        adminResponse,
        respondedBy,
        respondedAt: new Date(),
        status: "Answered"
      },
      { new: true }
    );
    res.json(query);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete query
router.delete("/:id", async (req, res) => {
  try {
    await Query.findByIdAndDelete(req.params.id);
    res.json({ message: "Query deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
