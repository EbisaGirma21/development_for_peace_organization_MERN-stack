// models/News.js

const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    images: { type: [String], required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
