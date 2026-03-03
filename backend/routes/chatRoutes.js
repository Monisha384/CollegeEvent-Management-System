const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

// Get all messages for an event
router.get("/event/:eventId", async (req, res) => {
  try {
    const messages = await Chat.find({ eventId: req.params.eventId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post a new message
router.post("/", async (req, res) => {
  try {
    const chat = new Chat(req.body);
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a message
router.delete("/:id", async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
