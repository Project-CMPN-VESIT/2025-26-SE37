const mongoose = require("mongoose");

const missingPersonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    gender: { type: String },
    missingSince: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("MissingPerson", missingPersonSchema);
