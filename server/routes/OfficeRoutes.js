const express = require("express");
const router = express.Router();
const officeController = require("../controllers/OfficeController");
const requireAuth = require("../middleware/requireAuth");

// Create a new Office
router.post("/", requireAuth, officeController.createOffice);

// Get all Offices
router.get("/", officeController.getAllOffices);

// Get a Office by ID
router.get("/:id", officeController.getOfficeById);

// Update a Office
router.put("/:id", requireAuth, officeController.updateOffice);

// Delete a Office
router.delete("/:id", requireAuth, officeController.deleteOffice);

module.exports = router;
