// controllers/programController.js
const Program = require("../models/ProgramModel");
const fs = require("fs");
const path = require("path");

// Create a new program
exports.createProgram = async (req, res) => {
  try {
    const { name, description } = req.body;

    const program = new Program({
      name,
      description,
      image: req.file ? req.file.path : null,
    });

    // Save the program to the database
    const savedProgram = await program.save();
    res.status(201).json(savedProgram);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a program by ID
exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ error: "Program not found" });
    res.status(200).json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProgram = async (req, res) => {
  try {
    const { name, description } = req.body;

    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ error: "Program not found" });

    // If a new image is uploaded, delete the old one
    if (req.file) {
      const oldImagePath = program.image;

      // Delete the old image if it exists
      if (oldImagePath && fs.existsSync(path.resolve(oldImagePath))) {
        fs.unlinkSync(path.resolve(oldImagePath));
      }
    }

    const updatedProgram = await Program.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          description,
          ...(req.file && { image: req.file.path }),
        },
      },
      { new: true }
    );

    res.status(200).json(updatedProgram);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a program
exports.deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }

    if (program.image) {
      const imagePath = program.image;

      if (fs.existsSync(path.resolve(imagePath))) {
        fs.unlinkSync(path.resolve(imagePath));
      }
    }

    await Program.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Program deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
