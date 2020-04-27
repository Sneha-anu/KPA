const mongoose = require("mongoose");

const kpaProfile = mongoose.Schema({
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

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  kpa: [kpaProfile],
  empId: { type: String, unique: true, required: true },
  name: { type: String },
  contact: { type: String },
  mail: { type: String },
  manager: { type: String },
  designation: { type: String },
  project_details: {
    name: { type: String },
    project_manager: { type: String },
    mail: { type: String },
    contact: { type: String },
  },
  target_kpa: {
    component: { type: Number, required: true },
    Master_class: { type: Number, required: true },
    Tech_session: { type: Number, required: true },
    case_study: { type: Number, required: true },
  },
});

module.exports = mongoose.model("User", userSchema);
