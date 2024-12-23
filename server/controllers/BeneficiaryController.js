const Beneficiary = require("../models/BeneficiaryModel");
const fs = require("fs");
const path = require("path");

// Create a new beneficiary
const createBeneficiary = async (req, res) => {
  try {
    const { title, value, description } = req.body;

    const newBeneficiary = new Beneficiary({
      title,
      value,
      description,
      image: req.file ? req.file.path : null,
    });

    await newBeneficiary.save();
    res.status(201).json(newBeneficiary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all beneficiaries
const getBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find();
    res.status(200).json(beneficiaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single beneficiary by ID
const getBeneficiaryById = async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findById(req.params.id);
    if (!beneficiary)
      return res.status(404).json({ error: "Beneficiary not found" });

    res.status(200).json(beneficiary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a beneficiary
const updateBeneficiary = async (req, res) => {
  try {
    const { title, value, description } = req.body;

    const beneficiary = await Beneficiary.findById(req.params.id);
    if (!beneficiary)
      return res.status(404).json({ error: "Beneficiary not found" });

    // If a new image is uploaded, delete the old one
    if (req.file) {
      const oldImagePath = beneficiary.image;
      if (beneficiary.image && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedBeneficiary = await Beneficiary.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          value,
          description,
          ...(req.file && { image: req.file.path }),
        },
      },
      { new: true }
    );

    res.status(200).json(updatedBeneficiary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a beneficiary
const deleteBeneficiary = async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findById(req.params.id);
    if (!beneficiary) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }

    if (beneficiary.image) {
      const imagePath = beneficiary.image;

      if (fs.existsSync(path.resolve(imagePath))) {
        fs.unlinkSync(path.resolve(imagePath));
      }
    }

    await Beneficiary.findByIdAndDelete(req.params.id);

    res.status(200).json({ beneficiary: "Beneficiary deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createBeneficiary,
  getBeneficiaries,
  getBeneficiaryById,
  updateBeneficiary,
  deleteBeneficiary,
};
