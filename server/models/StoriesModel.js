const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: [String], required: true },
  impact: { type: String, required: true },
  image: { type: String },
  sector: { type: mongoose.Schema.Types.ObjectId, ref: "Sector" },
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
