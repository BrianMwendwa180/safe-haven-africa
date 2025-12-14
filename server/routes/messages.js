const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Get messages for a user (support chat history)
router.get('/', auth.protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const room = `support-${userId}`;
    const messages = await Message.find({ room }).sort({ timestamp: 1 }).limit(100);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete old messages (cleanup, admin only - optional)
router.delete('/cleanup', auth.protect, async (req, res) => {
  try {
    // Only allow if user is admin (assuming role check)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const result = await Message.deleteMany({ timestamp: { $lt: thirtyDaysAgo } });
    res.json({ message: `Deleted ${result.deletedCount} old messages` });
  } catch (error) {
    console.error('Error cleaning up messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
