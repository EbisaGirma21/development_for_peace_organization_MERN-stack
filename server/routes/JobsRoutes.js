const express = require("express");
const router = express.Router();
const jobController = require("../controllers/JobsController");
const requireAuth = require("../middleware/requireAuth");

// Create a new Job
router.post("/", requireAuth, jobController.createJob);

// Get all Jobs
router.get("/", jobController.getAllJobs);

// Get a Job by ID
router.get("/:id", jobController.getJobById);

// Update a Job
router.put("/:id", requireAuth, jobController.updateJob);

// Delete a Job
router.delete("/:id", requireAuth, jobController.deleteJob);

module.exports = router;
