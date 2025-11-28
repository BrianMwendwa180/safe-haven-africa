const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
} = require('../controllers/journalController');

// All routes protected
router.route('/')
  .get(protect, getEntries)
  .post(protect, createEntry);

router.route('/:id')
  .put(protect, updateEntry)
  .delete(protect, deleteEntry);

module.exports = router;
