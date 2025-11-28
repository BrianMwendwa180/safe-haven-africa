const asyncHandler = require('../middleware/asyncHandler');
const JournalEntry = require('../models/JournalEntry');

// @desc    Get all journal entries for user
// @route   GET /api/journal
// @access  Private
exports.getEntries = asyncHandler(async (req, res) => {
  const entries = await JournalEntry.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(entries);
});

// @desc    Create new journal entry
// @route   POST /api/journal
// @access  Private
exports.createEntry = asyncHandler(async (req, res) => {
  const { content, mood } = req.body;
  if (!content) {
    res.status(400);
    throw new Error('Content is required');
  }

  const entry = await JournalEntry.create({
    userId: req.user._id,
    date: new Date().toLocaleDateString(),
    content,
    mood: mood || 'neutral',
  });

  res.status(201).json(entry);
});

// @desc    Update journal entry
// @route   PUT /api/journal/:id
// @access  Private
exports.updateEntry = asyncHandler(async (req, res) => {
  const entry = await JournalEntry.findById(req.params.id);
  if (!entry) {
    res.status(404);
    throw new Error('Entry not found');
  }

  if (entry.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedEntry = await JournalEntry.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedEntry);
});

// @desc    Delete journal entry
// @route   DELETE /api/journal/:id
// @access  Private
exports.deleteEntry = asyncHandler(async (req, res) => {
  const entry = await JournalEntry.findById(req.params.id);
  if (!entry) {
    res.status(404);
    throw new Error('Entry not found');
  }

  if (entry.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await JournalEntry.findByIdAndDelete(req.params.id);
  res.json({ message: 'Entry removed' });
});
