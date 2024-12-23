// models/MessageModel.js
const mongoose = require("mongoose");

const BeneficiarySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    value: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Beneficiary", BeneficiarySchema);
