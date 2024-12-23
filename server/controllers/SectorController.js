const Sector = require("../models/SectorModel");
const fs = require("fs");
const path = require("path");

// Create a new Sector
const createSector = async (req, res) => {
  try {
    const { name, description, program } = req.body;

    const sector = new Sector({
      name,
      image: req.file ? req.file.path : null,
      description,
      program,
    });

    await sector.save();
    res.status(201).json({ message: "Sector created successfully!", sector });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating sector", error: error.message });
  }
};

// Get all Sectors
const getAllSectors = async (req, res) => {
  try {
    const sectors = await Sector.find().populate("program"); // Populates the program reference
    res.status(200).json(sectors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching sectors", error: error.message });
  }
};

// Get a single Sector by ID
const getSectorById = async (req, res) => {
  try {
    const { id } = req.params;
    const sector = await Sector.findById(id).populate("program");

    if (!sector) {
      return res.status(404).json({ message: "Sector not found" });
    }

    res.status(200).json(sector);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching sector", error: error.message });
  }
};

// Update a Sector
const updateSector = async (req, res) => {
  try {
    const { name, description, program } = req.body;

    const sector = await Sector.findById(req.params.id);
    if (!sector) return res.status(404).json({ error: "Sector not found" });

    // If a new image is uploaded, delete the old one
    if (req.file) {
      const oldImagePath = sector.image;

      // Delete the old image if it exists
      if (oldImagePath && fs.existsSync(path.resolve(oldImagePath))) {
        fs.unlinkSync(path.resolve(oldImagePath));
      }
    }

    const updatedSector = await Sector.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          description,
          program,
          ...(req.file && { image: req.file.path }),
        },
      },
      { new: true }
    );

    res.status(200).json(updatedSector);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Sector
const deleteSector = async (req, res) => {
  try {
    const sector = await Sector.findById(req.params.id);
    if (!sector) {
      return res.status(404).json({ error: "Sector not found" });
    }

    if (sector.image) {
      const imagePath = sector.image;

      if (fs.existsSync(path.resolve(imagePath))) {
        fs.unlinkSync(path.resolve(imagePath));
      }
    }

    await Sector.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Sector deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting sector", error: error.message });
  }
};

module.exports = {
  createSector,
  getAllSectors,
  getSectorById,
  updateSector,
  deleteSector,
};
