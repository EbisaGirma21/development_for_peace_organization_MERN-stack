// routes/programRoutes.js
const express = require("express");
const router = express.Router();
const programController = require("../controllers/ProgramController");
const { uploadProgram } = require("../middleware/uplooad");
const requireAuth = require("../middleware/requireAuth");

// Create a new program
router.post(
  "/",
  requireAuth,
  uploadProgram.single("image"),
  programController.createProgram
);

// Get all programs
router.get("/", programController.getAllPrograms);

// Get a program by ID
router.get("/:id", programController.getProgramById);

// Update a program
router.put(
  "/:id",
  requireAuth,
  uploadProgram.single("image"),
  programController.updateProgram
);

// Delete a program
router.delete("/:id", requireAuth, programController.deleteProgram);

module.exports = router;
