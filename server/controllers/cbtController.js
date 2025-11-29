const asyncHandler = require('../middleware/asyncHandler');
const CBTProgress = require('../models/CBTProgress');

// Static CBT modules data (matching frontend)
const cbtModules = [
  {
    id: "1",
    title: "Understanding Your Feelings",
    description: "Learn to identify and name the emotions you're experiencing after digital trauma. This foundational exercise helps you regain a sense of control.",
    duration: "5-10 min",
  },
  {
    id: "2",
    title: "Challenging Negative Thoughts",
    description: "Digital trauma can lead to harmful self-talk. This module teaches you to recognize and reframe these thoughts with evidence-based techniques.",
    duration: "10-15 min",
  },
  {
    id: "3",
    title: "Managing Shame and Guilt",
    description: "Address the common feelings of shame that survivors experience. Learn that what happened is not your fault and develop self-compassion.",
    duration: "10-15 min",
  },
  {
    id: "4",
    title: "Rebuilding Trust in Online Spaces",
    description: "Gradually work through anxiety about digital platforms. Learn healthy boundaries and safety practices for online engagement.",
    duration: "15-20 min",
  },
  {
    id: "5",
    title: "Creating Your Safety Plan",
    description: "Develop a personalized action plan for managing triggers, setting boundaries, and knowing when to seek additional support.",
    duration: "15-20 min",
  },
];

// @desc    Get all CBT modules
// @route   GET /api/cbt/modules
// @access  Public (or Private if needed)
exports.getModules = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: cbtModules,
    message: 'CBT modules retrieved successfully'
  });
});

// @desc    Get CBT progress for user
// @route   GET /api/cbt/progress
// @access  Private
exports.getProgress = asyncHandler(async (req, res) => {
  const progress = await CBTProgress.find({ userId: req.user._id });
  // Merge with static modules to include completion status
  const modulesWithProgress = cbtModules.map(module => {
    const userProgress = progress.find(p => p.moduleId === module.id);
    return {
      ...module,
      completed: userProgress ? userProgress.completed : false,
      completedAt: userProgress ? userProgress.completedAt : null,
    };
  });
  res.status(200).json({
    success: true,
    data: modulesWithProgress,
    message: 'User progress retrieved successfully'
  });
});

// @desc    Update CBT progress for user
// @route   POST /api/cbt/progress
// @access  Private
exports.updateProgress = asyncHandler(async (req, res) => {
  const { moduleId, completed } = req.body;
  if (!moduleId) {
    res.status(400);
    throw new Error('Module ID is required');
  }

  const progress = await CBTProgress.findOneAndUpdate(
    { userId: req.user._id, moduleId },
    {
      completed,
      completedAt: completed ? new Date() : null,
    },
    { new: true, upsert: true }
  );

  res.status(200).json({
    success: true,
    data: progress,
    message: 'Progress updated successfully'
  });
});

// @desc    Save CBT response
// @route   POST /api/cbt/responses
// @access  Private
exports.saveResponse = asyncHandler(async (req, res) => {
  const { moduleId, stepId, response } = req.body;

  if (!moduleId || !stepId || response === undefined) {
    res.status(400);
    throw new Error('Module ID, step ID, and response are required');
  }

  // Find or create journal entry for CBT responses
  let journalEntry = await require('../models/JournalEntry').findOne({
    userId: req.user._id,
    title: 'CBT Exercise Responses'
  });

  if (!journalEntry) {
    journalEntry = new (require('../models/JournalEntry'))({
      userId: req.user._id,
      title: 'CBT Exercise Responses',
      content: 'Storage for CBT exercise responses',
      cbtResponses: []
    });
  }

  // Update or add response
  const existingResponseIndex = journalEntry.cbtResponses.findIndex(
    r => r.moduleId === moduleId && r.stepId === stepId
  );

  if (existingResponseIndex >= 0) {
    journalEntry.cbtResponses[existingResponseIndex].response = response;
    journalEntry.cbtResponses[existingResponseIndex].updatedAt = new Date();
  } else {
    journalEntry.cbtResponses.push({
      moduleId,
      stepId,
      response,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  journalEntry.updatedAt = new Date();
  await journalEntry.save();

  res.status(200).json({
    success: true,
    data: { 
      moduleId, 
      stepId, 
      response,
      savedAt: new Date()
    },
    message: 'Response saved successfully'
  });
});
