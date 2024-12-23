const mongoose = require("mongoose");

const offcieSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
      trim: true,
    },
    coordinate: {
      type: [Number],
      required: true,
    },
    officeType: {
      type: String,
      enum: ["regional_office", "sub_office", "project_office"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Office", offcieSchema);
