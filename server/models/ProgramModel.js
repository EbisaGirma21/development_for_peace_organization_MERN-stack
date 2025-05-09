// models/ProgramModel.js
const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Program", ProgramSchema);
