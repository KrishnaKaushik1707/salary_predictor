import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Code,
  Briefcase,
  UploadCloud,
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
  TrendingUp,
  Award,
  MessageSquare,
  Brain,
} from "lucide-react";

const steps = [
  { id: 1, title: "Academic", icon: BookOpen },
  { id: 2, title: "Technical", icon: Code },
  { id: 3, title: "Experience", icon: Briefcase },
  { id: 4, title: "Resume", icon: FileText },
  { id: 5, title: "Result", icon: Target },
];

const PredictionFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [resumeSkills, setResumeSkills] = useState([]);
  const [atsScore, setAtsScore] = useState(0);

  // State for all inputs
  const [formData, setFormData] = useState({
    cgpa: 8.5,
    percentage10: 90,
    percentage12: 85,
    backlogs: 0,
    attendance: 85,
    dsa: 7,
    webDev: 8,
    dbms: 6,
    oops: 7,
    aptitude: 6,
    communication: 8,
    internships: 1,
    projects: 3,
    certifications: 2,
    hackathons: 1,
    openSource: 0,
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleNext = async () => {
    if (currentStep < 5) {
      if (currentStep === 4) {
        try {
          setIsPredicting(true);

          const response = await axios.post(
            "http://localhost:1234/api/students/predict",
            {
              name: "Krishna",
              email: "krishna@gmail.com",
              cgpa: formData.cgpa,
              dsaSkill: formData.dsa,
              communicationSkill: formData.communication,
              internships: formData.internships,
              projects: formData.projects,
              certifications: formData.certifications,
            },
          );

          console.log(response.data);

          setPredictionResult(response.data);

          setTimeout(() => {
            setIsPredicting(false);

            setCurrentStep(5);
          }, 1000);
        } catch (error) {
          console.log(error);

          setIsPredicting(false);
        }
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };
  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formDataUpload = new FormData();

      formDataUpload.append("resume", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/upload-resume",
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setResumeSkills(response.data.skills);
      const score = calculateATSScore(
        response.data.skills,
        formData.cgpa,
        formData.projects,
        formData.internships,
        formData.certifications,
      );

      setAtsScore(score);

      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateATSScore = (
    skills,
    cgpa,
    projects,
    internships,
    certifications,
  ) => {
    let score = 0;

    // Skills score
    score += skills.length * 5;

    // CGPA score
    score += cgpa * 5;

    // Projects score
    score += projects * 4;

    // Internship score
    score += internships * 5;

    // Certifications score
    score += certifications * 3;

    // Limit max score
    if (score > 100) {
      score = 100;
    }

    return Math.round(score);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Academic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Current CGPA (Out of 10)",
                  name: "cgpa",
                  min: 0,
                  max: 10,
                  step: 0.1,
                },
                {
                  label: "10th Percentage",
                  name: "percentage10",
                  min: 0,
                  max: 100,
                  step: 1,
                },
                {
                  label: "12th Percentage",
                  name: "percentage12",
                  min: 0,
                  max: 100,
                  step: 1,
                },
                {
                  label: "Active Backlogs",
                  name: "backlogs",
                  min: 0,
                  max: 10,
                  step: 1,
                },
                {
                  label: "Attendance Percentage",
                  name: "attendance",
                  min: 0,
                  max: 100,
                  step: 1,
                },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    {field.label}:{" "}
                    <span className="text-primary font-bold">
                      {formData[field.name]}
                    </span>
                  </label>
                  <input
                    type="range"
                    name={field.name}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full accent-primary h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Technical Skills (0-10)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: "Data Structures & Algo", name: "dsa" },
                { label: "Web Development", name: "webDev" },
                { label: "DBMS & SQL", name: "dbms" },
                { label: "Object Oriented Prog.", name: "oops" },
                { label: "Aptitude & Logical", name: "aptitude" },
                { label: "Communication Skills", name: "communication" },
              ].map((field) => (
                <div key={field.name} className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-300">
                      {field.label}
                    </label>
                    <span className="text-primary font-bold">
                      {formData[field.name]}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    name={field.name}
                    min="0"
                    max="10"
                    step="1"
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full accent-secondary h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Professional Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Internships Completed", name: "internships" },
                { label: "Major Projects Built", name: "projects" },
                { label: "Certifications Earned", name: "certifications" },
                { label: "Hackathons Participated", name: "hackathons" },
                { label: "Open Source Contributions", name: "openSource" },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    {field.label}
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          [field.name]: Math.max(0, p[field.name] - 1),
                        }))
                      }
                      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold text-white w-8 text-center">
                      {formData[field.name]}
                    </span>
                    <button
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          [field.name]: p[field.name] + 1,
                        }))
                      }
                      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Upload Resume
            </h2>

            {isPredicting ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-6"></div>

                <h3 className="text-xl font-bold text-white animate-pulse">
                  Running AI Model...
                </h3>

                <p className="text-gray-400 mt-2">
                  Analyzing Resume & Predicting Placement
                </p>
              </div>
            ) : (
              <div className="glassmorphism-card p-8 border-white/5">
                <div
                  className="w-full max-w-2xl mx-auto border-2 border-dashed border-primary/40 rounded-2xl p-10 bg-surface/30 hover:bg-surface/50 transition-colors cursor-pointer group"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();

                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileUpload({
                        target: { files: e.dataTransfer.files },
                      });
                    }
                  }}
                  onClick={() =>
                    document.getElementById("prediction-resume-upload").click()
                  }
                >
                  <input
                    type="file"
                    id="prediction-resume-upload"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileUpload}
                  />

                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/40 transition-colors">
                      {formData.resume ? (
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      ) : (
                        <UploadCloud className="w-8 h-8 text-primary" />
                      )}
                    </div>

                    {formData.resume ? (
                      <>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {formData.resume.name}
                        </h3>

                        <p className="text-gray-400 mb-4">
                          {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                          <span className="px-4 py-2 rounded-full bg-white/10 text-gray-300 text-sm">
                            Resume Uploaded Successfully
                          </span>

                          <span className="px-4 py-2 rounded-full border border-white/10 text-gray-300 text-sm">
                            Click to Replace
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Drag & Drop your Resume
                        </h3>

                        <p className="text-gray-400 mb-6">
                          PDF, DOC, DOCX Supported
                        </p>

                        <div className="mt-4 px-6 py-2 rounded-full border border-white/10 text-gray-300 font-medium group-hover:bg-white/5 transition-colors">
                          Browse Files
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* DETECTED SKILLS */}

                {resumeSkills.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                  >
                    <div className="flex items-center justify-center gap-3 mb-5">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

                      <h3 className="text-2xl font-bold text-white">
                        AI Detected Skills
                      </h3>
                    </div>

                    <p className="text-center text-gray-400 mb-6">
                      Skills extracted automatically from your uploaded resume
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                      {resumeSkills.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-white font-medium shadow-lg backdrop-blur-sm"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    <div className="mt-8 flex justify-center">
                      <div className="px-6 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 font-medium">
                        {resumeSkills.length} Skills Identified Successfully
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ATS SCORE */}

                {atsScore > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10"
                  >
                    <div className="glassmorphism p-8 text-center border border-primary/20">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        ATS Resume Score
                      </h3>

                      <div className="relative w-44 h-44 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-[10px] border-white/10"></div>

                        <div className="absolute inset-0 rounded-full border-[10px] border-primary border-t-transparent border-r-transparent rotate-45"></div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div>
                            <h2 className="text-5xl font-bold text-primary">
                              {atsScore}
                            </h2>

                            <p className="text-gray-400 text-sm">out of 100</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-400 max-w-md mx-auto">
                        This score is calculated using your resume skills,
                        projects, academics, internships, and certifications.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-500/20 text-green-400 rounded-full mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-2">
                Prediction Complete
              </h2>

              <p className="text-gray-400">
                Based on your academic profile, skill set, and experience.
              </p>
            </div>

            {/* Result Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Placement Probability */}
              <div className="glassmorphism p-6 text-center border-t-4 border-t-primary">
                <Target className="w-10 h-10 text-primary mx-auto mb-4" />

                <p className="text-gray-400 text-sm mb-1">
                  Placement Probability
                </p>

                <h3 className="text-4xl font-bold text-white">
                  {predictionResult?.placementProbability || 0}
                  <span className="text-2xl text-gray-500">%</span>
                </h3>
              </div>

              {/* Expected Package */}
              <div className="glassmorphism p-6 text-center border-t-4 border-t-secondary">
                <TrendingUp className="w-10 h-10 text-secondary mx-auto mb-4" />

                <p className="text-gray-400 text-sm mb-1">Expected Package</p>

                <h3 className="text-4xl font-bold text-white">
                  {predictionResult?.expectedPackage || 0}
                  <span className="text-2xl text-gray-500"> LPA</span>
                </h3>
              </div>

              {/* Final Prediction */}
              <div className="glassmorphism p-6 text-center border-t-4 border-t-pink-500">
                <MessageSquare className="w-10 h-10 text-pink-500 mx-auto mb-4" />

                <p className="text-gray-400 text-sm mb-1">Final Prediction</p>

                <h3 className="text-2xl font-bold text-pink-400 mt-2">
                  {predictionResult?.prediction || "Pending"}
                </h3>
              </div>
            </div>

            {/* AI Recommendations */}
            {/* AI Recommendations */}
            <div className="glassmorphism p-6 mt-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6 text-secondary" />
                AI Recommendations
              </h3>

              <ul className="space-y-4">
                {predictionResult?.recommendations?.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-primary/20 text-primary rounded-lg shrink-0">
                      <AlertCircle className="w-5 h-5" />
                    </div>

                    <div>
                      <h4 className="text-white font-medium">
                        Recommendation {index + 1}
                      </h4>

                      <p className="text-gray-400 text-sm">{item}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recalculate Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors font-medium"
              >
                Recalculate Prediction
              </button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Placement Prediction Form
        </h1>
        <p className="text-gray-400">
          Fill in your details for a personalized AI analysis of your career
          prospects.
        </p>
      </div>

      {/* Stepper */}
      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0 rounded-full"></div>
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-primary to-secondary -translate-y-1/2 z-0 rounded-full transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        <div className="relative z-10 flex justify-between">
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
                    ${
                      isActive
                        ? "bg-primary text-white scale-110 shadow-primary/30"
                        : isCompleted
                          ? "bg-secondary text-white"
                          : "bg-surface text-gray-500 border-2 border-white/10"
                    }
                  `}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-medium ${isActive || isCompleted ? "text-white" : "text-gray-500"} hidden md:block`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="glassmorphism-card p-8 border-white/10 min-h-[400px]">
        <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
      </div>

      {/* Navigation */}
      {currentStep < 5 && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1 || isPredicting}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors
              ${currentStep === 1 || isPredicting ? "opacity-50 cursor-not-allowed bg-white/5 text-gray-500" : "bg-white/10 text-white hover:bg-white/20"}`}
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>

          <button
            onClick={handleNext}
            disabled={(currentStep === 4 && !formData.resume) || isPredicting}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20
              ${(currentStep === 4 && !formData.resume) || isPredicting ? "opacity-50 cursor-not-allowed bg-primary/50 text-white/50" : "bg-gradient-to-r from-primary to-secondary hover:scale-105 text-white"}`}
          >
            {currentStep === 4 ? "Predict Placement" : "Continue"}{" "}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PredictionFlow;
