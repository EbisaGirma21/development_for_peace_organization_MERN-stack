// controllers/newsController.js

const fs = require("fs");
const path = require("path");
const News = require("../models/NewsModel"); // Import your News model

// Create a news article with multiple images
exports.createNews = async (req, res) => {
  try {
    // Check if files are uploaded
    const imagePaths = req.files ? req.files.map((file) => file.path) : [];

    // Create the news article
    const news = new News({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      images: imagePaths, // Store array of image paths
    });

    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all news
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a news by ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a news article with multiple images
exports.updateNews = async (req, res) => {
  try {
    // Find the news article by ID
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ error: "News article not found" });

    // If new images are uploaded, delete the old ones
    if (req.files) {
      // Delete the old images
      news.images.forEach((image) => {
        const imagePath = path.resolve(image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    // Update the news article
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        images: req.files ? req.files.map((file) => file.path) : news.images, // Only update images if new ones are uploaded
      },
      { new: true }
    );

    res.status(200).json(updatedNews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a news article and its images
exports.deleteNews = async (req, res) => {
  try {
    // Find the news article by ID
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ error: "News article not found" });

    // Delete the images associated with the news article
    news.images.forEach((image) => {
      const imagePath = path.resolve(image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image from the server
      }
    });

    // Delete the news article
    await News.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "News article and images deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
