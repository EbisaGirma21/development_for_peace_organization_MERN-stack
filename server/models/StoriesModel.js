const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date },
  image: { type: String }, // Single image path
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
