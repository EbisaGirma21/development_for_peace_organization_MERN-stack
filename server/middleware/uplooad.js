const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the directories exist or create them if not
const createDirIfNotExist = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Directories for program and news images
const programFolder = "uploads/program";
const newsFolder = "uploads/news";
const storiesFolder = "uploads/stories";

// Ensure these directories exist
createDirIfNotExist(programFolder);
createDirIfNotExist(newsFolder);
createDirIfNotExist(storiesFolder);

// Storage configuration for program images
const programStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, programFolder);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Storage configuration for program images
const storiesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storiesFolder);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Storage configuration for news images (handling multiple files)
const newsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, newsFolder); // Store in the 'uploads/news' folder
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Middleware configuration for handling uploads (single file for program)
const uploadProgram = multer({
  storage: programStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit, for example
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Error: Only image files are allowed"));
    }
  },
});

// Middleware configuration for handling uploads (single file for story)
const uploadStories = multer({
  storage: storiesStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit, for example
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Error: Only image files are allowed"));
    }
  },
});

// Middleware configuration for handling multiple news images
const uploadNews = multer({
  storage: newsStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit for each file
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Error: Only image files are allowed"));
    }
  },
});

// Export the middleware for use in routes
module.exports = { uploadProgram, uploadNews, uploadStories };
