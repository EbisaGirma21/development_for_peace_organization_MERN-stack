const Tender = require("../models/TendersModel");

// Create a new Tender
exports.createTender = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const tender = new Tender({ title, description, link });
    const savedTender = await tender.save();
    res.status(201).json(savedTender);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Tenders
exports.getAllTenders = async (req, res) => {
  try {
    const tenders = await Tender.find();
    res.status(200).json(tenders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a Tender by ID
exports.getTenderById = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) return res.status(404).json({ error: "Tender not found" });
    res.status(200).json(tender);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Tender
exports.updateTender = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const updatedTender = await Tender.findByIdAndUpdate(
      req.params.id,
      { title, description, link },
      { new: true }
    );
    if (!updatedTender)
      return res.status(404).json({ error: "Tender not found" });
    res.status(200).json(updatedTender);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Tender
exports.deleteTender = async (req, res) => {
  try {
    const deletedTender = await Tender.findByIdAndDelete(req.params.id);
    if (!deletedTender)
      return res.status(404).json({ error: "Tender not found" });
    res.status(200).json({ message: "Tender deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
