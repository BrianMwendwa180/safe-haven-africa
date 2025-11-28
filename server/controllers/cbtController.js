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
  res.json(cbtModules);
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
  res.json(modulesWithProgress);
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

  res.json(progress);
});
