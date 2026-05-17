const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    cgpa: Number,
    dsaSkill: Number,
    communicationSkill: Number,
    internships: Number,
    projects: Number,
    certifications: Number,
    prediction: String,
    expectedPackage: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", studentSchema);
