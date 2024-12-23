// routes/newsRoutes.js

const express = require("express");
const router = express.Router();
const newsController = require("../controllers/NewsController");
const { uploadNews } = require("../middleware/upload");
const requireAuth = require("../middleware/requireAuth");

// Create News with multiple images
router.post(
  "/",
  requireAuth,
  uploadNews.array("images", 5),
  newsController.createNews
); // Limit to 5 images (optional)

// Get all programs
router.get("/", newsController.getAllNews);

// Get a program by ID
router.get("/:id", newsController.getNewsById);

// Delete News
router.delete("/:id", requireAuth, newsController.deleteNews);

// Update News with multiple images
router.put(
  "/:id",
  requireAuth,
  uploadNews.array("images", 5),
  newsController.updateNews
); // Limit to 5 images (optional)

module.exports = router;
