const express = require("express");
const router = express.Router();
const tenderController = require("../controllers/TendersController");
const requireAuth = require("../middleware/requireAuth");

// Create a new Tender
router.post("/", requireAuth, tenderController.createTender);

// Get all Tenders
router.get("/", tenderController.getAllTenders);

// Get a Tender by ID
router.get("/:id", tenderController.getTenderById);

// Update a Tender
router.put("/:id", requireAuth, tenderController.updateTender);

// Delete a Tender
router.delete("/:id", requireAuth, tenderController.deleteTender);

module.exports = router;
