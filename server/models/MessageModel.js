// models/MessageModel.js
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
