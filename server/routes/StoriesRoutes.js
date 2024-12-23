const express = require("express");
const router = express.Router();
const StoriesController = require("../controllers/StoriesController");
const { uploadStories } = require("../middleware/upload");
const requireAuth = require("../middleware/requireAuth");

// Create a new story
router.post(
  "/",
  requireAuth,
  uploadStories.single("image"),
  StoriesController.createStory
);

// Get all stories
router.get("/", StoriesController.getAllStories);

// Get a story by ID
router.get("/:id", StoriesController.getStoryById);

// Update a story
router.put(
  "/:id",
  requireAuth,
  uploadStories.single("image"),
  StoriesController.updateStory
);

// Delete a story
router.delete("/:id", requireAuth, StoriesController.deleteStory);

module.exports = router;
