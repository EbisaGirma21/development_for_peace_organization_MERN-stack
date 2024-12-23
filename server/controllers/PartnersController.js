const Partner = require("../models/PartnersModel");
const fs = require("fs");
const path = require("path");

// Create a new partner
exports.createPartner = async (req, res) => {
  try {
    const { name, type, location } = req.body;
    const image = req.file ? req.file.path : null;

    if (!image) {
      return res.status(400).json({ error: "Image is required." });
    }

    const newPartner = new Partner({
      name,
      type,
      location,
      image,
    });

    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all partners
exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a partner by ID
exports.getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ error: "Partner not found" });
    res.status(200).json(partner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a partner
exports.updatePartner = async (req, res) => {
  try {
    const { name, type, location } = req.body;

    const partners = await Partner.findById(req.params.id);
    if (!partners) return res.status(404).json({ error: "Partners not found" });

    // If a new image is uploaded, delete the old one
    if (req.file) {
      const oldImagePath = partners.image;

      // Delete the old image if it exists
      if (oldImagePath && fs.existsSync(path.resolve(oldImagePath))) {
        fs.unlinkSync(path.resolve(oldImagePath));
      }
    }

    const updatedPartners = await Partner.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          type,
          location,
          ...(req.file && { image: req.file.path }),
        },
      },
      { new: true }
    );

    res.status(200).json(updatedPartners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a partner
exports.deletePartner = async (req, res) => {
  try {
    const deletedPartner = await Partner.findByIdAndDelete(req.params.id);
    if (!deletedPartner) {
      return res.status(404).json({ error: "Partner not found" });
    }
    res.status(200).json({ message: "Partner deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
