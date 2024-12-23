// routes/SectorRoutes.js
const express = require("express");
const router = express.Router();
const {
  createSector,
  getAllSectors,
  getSectorById,
  updateSector,
  deleteSector,
} = require("../controllers/SectorController");
const { uploadSector } = require("../middleware/upload");
const requireAuth = require("../middleware/requireAuth");

// Create a new sector
router.post("/", uploadSector.single("image"), createSector);

// Get all sectors
router.get("/", getAllSectors);

// Get a sector by ID
router.get("/:id", getSectorById);

// Update a sector by ID
router.put("/:id", uploadSector.single("image"), updateSector);

// Delete a sector by ID
router.delete("/:id", deleteSector);

module.exports = router;
