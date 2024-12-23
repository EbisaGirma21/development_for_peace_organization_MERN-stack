const express = require("express");
const router = express.Router();
const {
  createBeneficiary,
  getBeneficiaries,
  getBeneficiaryById,
  updateBeneficiary,
  deleteBeneficiary,
} = require("../controllers/BeneficiaryController");
const { uploadBeneficiary } = require("../middleware/upload");

// Define routes
router.post("/", uploadBeneficiary.single("image"), createBeneficiary);
router.get("/", getBeneficiaries);
router.get("/:id", getBeneficiaryById);
router.put("/:id", uploadBeneficiary.single("image"), updateBeneficiary);
router.delete("/:id", deleteBeneficiary);

module.exports = router;
