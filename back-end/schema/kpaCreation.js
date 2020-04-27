const mongoose = require("mongoose");

const kpaStage = mongoose.Schema({
  title: { type: String },
  id: { type: String },
});

const kpaTarget = mongoose.Schema({
  role: { type: String },
  label: { type: String },
  target: { type: String },
});
const kpaCreation = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  stage: [kpaStage],
  target: [kpaTarget],
  name: { type: String, required: true },
  description: { type: String },
});

exports.KpaCreation = mongoose.model("KpaCreation", kpaCreation);
exports.kpaStage = mongoose.model("KpaStage", kpaStage);
exports.kpaTarget = mongoose.model("KpaTarget", kpaTarget);
