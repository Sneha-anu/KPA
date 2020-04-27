const mongoose = require("mongoose");

const profile = mongoose.Schema({
  type: { type: String },
  title: { type: String },
  description: { type: String },
  stage: { type: String, required: true },
  created_on: {
    type: Date,
    default: Date.now,
  },
  modified_on: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Kpa", profile);
