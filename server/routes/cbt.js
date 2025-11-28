const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getModules,
  getProgress,
  updateProgress,
} = require('../controllers/cbtController');

// Public route to get all modules
router.get('/modules', getModules);

// Protected routes for progress tracking
router.route('/progress')
  .get(protect, getProgress)
  .post(protect, updateProgress);

module.exports = router;
