const Office = require("../models/OfficeModel");

// Create a new Office
exports.createOffice = async (req, res) => {
  try {
    const { location, coordinate, officeType } = req.body;
    const office = new Office({ location, coordinate, officeType });
    const savedOffice = await office.save();
    res.status(201).json(savedOffice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Offices
exports.getAllOffices = async (req, res) => {
  try {
    const offices = await Office.find();
    res.status(200).json(offices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a Office by ID
exports.getOfficeById = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);
    if (!office) return res.status(404).json({ error: "Office not found" });
    res.status(200).json(office);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Office
exports.updateOffice = async (req, res) => {
  try {
    const { location, coordinate, officeType } = req.body;
    const updatedOffice = await Office.findByIdAndUpdate(
      req.params.id,
      { location, coordinate, officeType },
      { new: true }
    );
    if (!updatedOffice)
      return res.status(404).json({ error: "Office not found" });
    res.status(200).json(updatedOffice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Office
exports.deleteOffice = async (req, res) => {
  try {
    const deletedOffice = await Office.findByIdAndDelete(req.params.id);
    if (!deletedOffice)
      return res.status(404).json({ error: "Office not found" });
    res.status(200).json({ message: "Office deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
