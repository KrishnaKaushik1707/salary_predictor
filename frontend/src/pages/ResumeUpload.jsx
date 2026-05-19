import React, { useState } from "react";
import axios from "axios";
import { Upload, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [analysisResult, setAnalysisResult] = useState(null);

  const [resumeText, setResumeText] = useState("");

  // =========================
  // Drag Resume
  // =========================

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // =========================
  // File Upload
  // =========================

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // =========================
  // REAL AI Resume Analysis
  // =========================

  const analyzeResume = async () => {
    if (!file) return;

    try {
      setIsAnalyzing(true);

      const formData = new FormData();

      formData.append("resume", file);

      const response = await axios.post(
        "https://salary-predictor-ml-so9x.onrender.com/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data);

      setResumeText(response.data.resumeText);

      setAnalysisResult({
        score: response.data.atsScore,

        atsStatus:
          response.data.atsScore >= 80
            ? "Excellent"
            : response.data.atsScore >= 60
              ? "Moderate"
              : "Needs Improvement",

        skillsFound: response.data.skills,

        keywordsMissing: response.data.missingSkills || [],

        grammarIssues: 0,

        actionVerbsRate: "Good",
      });

      setIsAnalyzing(false);
    } catch (error) {
      console.log(error);

      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Resume Analysis</h1>

        <p className="text-gray-400">
          Upload your resume for AI-based ATS parsing and skill extraction.
        </p>
      </div>

      {/* UPLOAD SECTION */}

      {!analysisResult ? (
        <div className="glassmorphism-card p-10 border-white/5 text-center">
          <div
            className="w-full max-w-2xl mx-auto border-2 border-dashed border-primary/40 rounded-2xl p-12 bg-surface/30 hover:bg-surface/50 transition-colors cursor-pointer group"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById("resume-upload").click()}
          >
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />

            <AnimatePresence mode="wait">
              {!isAnalyzing ? (
                <motion.div
                  key="upload"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>

                  {file ? (
                    <>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {file.name}
                      </h3>

                      <p className="text-gray-400 mb-6">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          analyzeResume();
                        }}
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium shadow-lg transition-colors"
                      >
                        Start AI Analysis
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Drag & Drop your Resume
                      </h3>

                      <p className="text-gray-400">
                        Supported formats: PDF, DOCX
                      </p>

                      <div className="mt-6 px-6 py-2 rounded-full border border-white/10 text-gray-300 font-medium">
                        Browse Files
                      </div>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="analyzing"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <RefreshCw className="w-16 h-16 text-primary animate-spin mb-6" />

                  <h3 className="text-xl font-bold text-white mb-2">
                    Analyzing Resume...
                  </h3>

                  <p className="text-gray-400">
                    AI is parsing resume and extracting skills.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        // =========================
        // RESULT SECTION
        // =========================

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* ATS CARD */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glassmorphism-card p-6 border-white/5 flex flex-col items-center justify-center text-center">
              <div className="relative w-32 h-32 mb-4">
                <svg
                  viewBox="0 0 36 36"
                  className="w-full h-full stroke-current text-gray-700"
                >
                  <path
                    className="stroke-surface"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  />

                  <path
                    className="stroke-primary"
                    strokeWidth="3"
                    strokeDasharray={`${analysisResult.score}, 100`}
                    fill="none"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {analysisResult.score}%
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white">ATS Score</h3>

              <p className="text-green-400 mt-1">{analysisResult.atsStatus}</p>
            </div>

            {/* SKILLS */}

            <div className="md:col-span-2 glassmorphism-card p-6 border-white/5 space-y-6">
              <div>
                <h4 className="text-white font-semibold flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Extracted Skills
                </h4>

                <div className="flex flex-wrap gap-2">
                  {analysisResult.skillsFound.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-surface border border-white/10 rounded-lg text-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* MISSING SKILLS */}

              <div>
                <h4 className="text-white font-semibold flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  Missing Keywords
                </h4>

                <div className="flex flex-wrap gap-2">
                  {analysisResult.keywordsMissing.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RESUME TEXT */}

          <div className="glassmorphism-card p-6 border-white/5">
            <h3 className="text-xl font-bold text-white mb-4">
              Resume Preview
            </h3>

            <p className="text-gray-400 whitespace-pre-line">{resumeText}</p>
          </div>

          {/* BUTTONS */}

          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setFile(null);

                setAnalysisResult(null);

                setResumeText("");
              }}
              className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-colors"
            >
              Upload Different Resume
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResumeUpload;
