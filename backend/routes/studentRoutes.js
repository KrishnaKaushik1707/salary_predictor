const express = require("express");
const router = express.Router();
const axios = require("axios");
const Student = require("../models/Student");

router.post("/predict", async (req, res) => {
  try {
    const {
      name,
      email,
      cgpa,
      dsaSkill,
      communicationSkill,
      internships,
      projects,
      certifications,
    } = req.body;

    // Call Flask ML API
    const mlResponse = await axios.post("http://127.0.0.1:8000/predict", {
      Age: 22,
      Gender: 1,
      Degree: 0,
      Branch: 1,
      CGPA: cgpa,
      Internships: internships,
      Projects: projects,
      Coding_Skills: dsaSkill,
      Communication_Skills: communicationSkill,
      Aptitude_Test_Score: 85,
      Soft_Skills_Rating: 8,
      Certifications: certifications,
      Backlogs: 0,
    });

    const prediction = mlResponse.data.prediction;
    const recommendations = [];

    // DSA Recommendation
    if (dsaSkill < 7) {
      recommendations.push("Improve Data Structures and Algorithms skills.");
    }

    // Communication
    if (communicationSkill < 7) {
      recommendations.push(
        "Work on communication and interview speaking skills.",
      );
    }

    // Projects
    if (projects < 2) {
      recommendations.push(
        "Build more real-world projects to strengthen your resume.",
      );
    }

    // Internships
    if (internships === 0) {
      recommendations.push("Try to gain internship experience.");
    }

    // Certifications
    if (certifications < 2) {
      recommendations.push("Complete industry-recognized certifications.");
    }

    // ATS Score
    if (atsScore < 70) {
      recommendations.push(
        "Improve your ATS resume score with better keywords and projects.",
      );
    }

    // Resume Skills
    if (!resumeSkills.includes("react")) {
      recommendations.push(
        "Learning React can improve frontend opportunities.",
      );
    }

    if (!resumeSkills.includes("mongodb")) {
      recommendations.push("Add MongoDB/database skills to your profile.");
    }

    if (!resumeSkills.includes("machine learning")) {
      recommendations.push(
        "Learning Machine Learning can improve AI-related opportunities.",
      );
    }

    const placementProbability = prediction === "Placed" ? 85 : 35;

    const expectedPackage = prediction === "Placed" ? 8.5 : 3.0;

    // Save to MongoDB
    const student = new Student({
      name,
      email,
      cgpa,
      dsaSkill,
      communicationSkill,
      internships,
      projects,
      certifications,
      prediction,
      expectedPackage,
    });

    await student.save();

    // Send response to frontend
    res.json({
      placementProbability,
      expectedPackage,
      prediction,
      recommendations,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
