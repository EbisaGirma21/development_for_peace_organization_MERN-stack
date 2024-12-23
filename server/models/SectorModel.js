// models/SectorModel.js
const mongoose = require("mongoose");

const SectorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" }, // Reference to Program model
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Sector", SectorSchema);
