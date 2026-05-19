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
      resumeSkills,
      atsScore,
      jobDescription,
    } = req.body;

    // =========================
    // Flask ML API Call
    // =========================

    const mlResponse = await axios.post(`${process.env.ML_API_URL}/predict`, {
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

    const placementProbability = mlResponse.data.placementProbability;

    const expectedPackage = mlResponse.data.expectedPackage;

    // =========================
    // AI Recommendations
    // =========================

    const recommendations = [];

    if (dsaSkill < 7) {
      recommendations.push("Improve Data Structures and Algorithms skills.");
    }

    if (communicationSkill < 7) {
      recommendations.push("Improve communication and interview confidence.");
    }

    if (projects < 2) {
      recommendations.push("Build more real-world full stack projects.");
    }

    if (internships === 0) {
      recommendations.push("Try gaining internship experience.");
    }

    if (certifications < 2) {
      recommendations.push("Complete more industry certifications.");
    }

    if (atsScore < 70) {
      recommendations.push(
        "Improve ATS score with better keywords and project descriptions.",
      );
    }

    // =========================
    // JOB DESCRIPTION MATCHING
    // =========================

    // =========================
    // JOB DESCRIPTION MATCHING
    // =========================

    const jdKeywords = jobDescription
      .toLowerCase()
      .split(/[\s,.\n]+/)
      .filter((word) => word.length > 2);

    const uniqueJDKeywords = [...new Set(jdKeywords)];

    const matchedSkills = [];

    const missingSkills = [];

    // matched skills
    resumeSkills.forEach((skill) => {
      if (jobDescription.toLowerCase().includes(skill.toLowerCase())) {
        matchedSkills.push(skill);
      }
    });

    // missing skills
    uniqueJDKeywords.forEach((word) => {
      const exists = resumeSkills.some(
        (skill) => skill.toLowerCase() === word.toLowerCase(),
      );

      if (!exists) {
        missingSkills.push(word);
      }
    });

    // remove duplicates
    const finalMissingSkills = [...new Set(missingSkills)].slice(0, 10);

    // match percentage
    let matchPercentage = 0;

    if (resumeSkills.length > 0) {
      matchPercentage = Math.round(
        (matchedSkills.length / resumeSkills.length) * 100,
      );
    }

    // =========================
    // Save To MongoDB
    // =========================

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

    // =========================
    // Send Response
    // =========================

    res.json({
      success: true,

      prediction,

      placementProbability,

      expectedPackage,

      atsScore,

      recommendations,

      matchedSkills,

      missingSkills: finalMissingSkills,

      matchPercentage,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
