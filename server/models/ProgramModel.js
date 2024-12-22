// models/ProgramModel.js
const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    sub_category: { type: String },
    accomplishment: { type: String },
    image: { type: String },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Program", ProgramSchema);
