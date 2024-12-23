const express = require("express");
const {
  createPartner,
  getAllPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
} = require("../controllers/PartnersController");
const { uploadPartners } = require("../middleware/upload");

const router = express.Router();

// Routes
router.post("/", uploadPartners.single("image"), createPartner); // Create a partner
router.get("/", getAllPartners); // Get all partners
router.get("/:id", getPartnerById); // Get a single partner by ID
router.put("/:id", uploadPartners.single("image"), updatePartner); // Update a partner
router.delete("/:id", deletePartner); // Delete a partner

module.exports = router;
