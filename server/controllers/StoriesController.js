const Story = require("../models/StoriesModel");
const fs = require("fs");
const path = require("path");

// Create a new story
exports.createStory = async (req, res) => {
  try {
    const image = req.file ? req.file.path : null;
    const newStory = new Story({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      image,
    });
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all stories
exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a story by ID
exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a story
exports.updateStory = async (req, res) => {
  try {
    const { title, description } = req.body;

    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });

    // If a new image is uploaded, delete the old one
    if (req.file) {
      const oldImagePath = story.image;

      // Delete the old image if it exists
      if (oldImagePath && fs.existsSync(path.resolve(oldImagePath))) {
        fs.unlinkSync(path.resolve(oldImagePath));
      }
    }

    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          description,
          ...(req.file && { image: req.file.path }),
        },
      },
      { new: true }
    );

    res.status(200).json(updatedStory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a story
exports.deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });

    // Delete the image from the file system
    if (story.image && fs.existsSync(story.image)) {
      fs.unlinkSync(story.image);
    }

    res.status(200).json({ message: "Story deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
