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

  const [jobDescription, setJobDescription] = useState("");

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

    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
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

              resumeSkills: resumeSkills,

              atsScore: atsScore,

              jobDescription: jobDescription,
            },
          );

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

      setAtsScore(response.data.atsScore);

      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Academic Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "CGPA",
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
                  label: "Backlogs",
                  name: "backlogs",
                  min: 0,
                  max: 10,
                  step: 1,
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-white">
                    {field.label}: {formData[field.name]}
                  </label>

                  <input
                    type="range"
                    name={field.name}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full"
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
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Technical Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "DSA", name: "dsa" },

                { label: "Web Dev", name: "webDev" },

                { label: "DBMS", name: "dbms" },

                { label: "OOPS", name: "oops" },

                { label: "Aptitude", name: "aptitude" },

                { label: "Communication", name: "communication" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-white">
                    {field.label}: {formData[field.name]}
                  </label>

                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData[field.name]}
                    name={field.name}
                    onChange={handleChange}
                    className="w-full"
                  />
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
          >
            <h2 className="text-2xl font-bold text-white mb-6">Experience</h2>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Internships", name: "internships" },

                { label: "Projects", name: "projects" },

                { label: "Certifications", name: "certifications" },

                { label: "Hackathons", name: "hackathons" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-white block mb-2">{field.label}</label>

                  <input
                    type="number"
                    min="0"
                    value={formData[field.name]}
                    name={field.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10"
                  />
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
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-white">Upload Resume</h2>

            {isPredicting ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-6"></div>

                <h3 className="text-xl font-bold text-white">
                  Running AI Analysis...
                </h3>
              </div>
            ) : (
              <>
                <div
                  className="w-full max-w-3xl mx-auto border-2 border-dashed border-primary/40 rounded-3xl p-14 bg-white/5 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer group"
                  onClick={() =>
                    document.getElementById("resume-upload").click()
                  }
                >
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />

                  <div className="flex flex-col items-center">
                    <UploadCloud className="w-14 h-14 text-primary mb-4" />

                    {formData.resume ? (
                      <>
                        <h3 className="text-white text-2xl font-bold">
                          {formData.resume.name}
                        </h3>

                        <p className="text-gray-400 mt-2">
                          Resume uploaded successfully
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-white text-2xl font-bold">
                          Upload Resume
                        </h3>

                        <p className="text-gray-400 mt-2">PDF / DOC / DOCX</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Skills */}

                {resumeSkills.length > 0 && (
                  <div>
                    <h3 className="text-2xl text-white font-bold mb-4">
                      AI Detected Skills
                    </h3>

                    <div className="flex flex-wrap gap-3">
                      {resumeSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-white"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ATS Score */}

                {atsScore > 0 && (
                  <div className="glassmorphism-card p-10 rounded-3xl border border-primary/20 text-center backdrop-blur-xl bg-white/5 shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      ATS Resume Score
                    </h3>

                    <h1 className="text-6xl font-bold text-primary">
                      {atsScore}
                    </h1>

                    <p className="text-gray-400 mt-2">
                      Resume ATS Compatibility Score
                    </p>
                  </div>
                )}

                {/* Job Description */}

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Paste Job Description
                  </h3>

                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste company job description here..."
                    className="w-full h-40 rounded-2xl bg-white/5 border border-white/10 p-4 text-white"
                  />
                </div>
              </>
            )}
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />

              <h2 className="text-4xl font-bold text-white">
                Prediction Complete
              </h2>
            </div>

            {/* Result Cards */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glassmorphism-card p-8 rounded-3xl text-center border border-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-xl bg-white/5">
                <Target className="w-10 h-10 text-primary mx-auto mb-4" />

                <h3 className="text-white text-4xl font-bold">
                  {predictionResult?.placementProbability}%
                </h3>

                <p className="text-gray-400 mt-2">Placement Probability</p>
              </div>

              <div className="glassmorphism-card p-8 rounded-3xl text-center border border-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-xl bg-white/5">
                <TrendingUp className="w-10 h-10 text-secondary mx-auto mb-4" />

                <h3 className="text-white text-4xl font-bold">
                  {predictionResult?.expectedPackage} LPA
                </h3>

                <p className="text-gray-400 mt-2">Expected Package</p>
              </div>

              <div className="glassmorphism-card p-8 rounded-3xl text-center border border-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-xl bg-white/5">
                <MessageSquare className="w-10 h-10 text-pink-500 mx-auto mb-4" />

                <h3 className="text-pink-400 text-3xl font-bold">
                  {predictionResult?.prediction}
                </h3>

                <p className="text-gray-400 mt-2">Final Prediction</p>
              </div>
            </div>

            {/* Recommendations */}

            <div className="glassmorphism-card rounded-3xl p-8 border border-white/10 backdrop-blur-xl bg-white/5">
              <h3 className="text-2xl text-white font-bold mb-6">
                AI Recommendations
              </h3>

              <div className="space-y-4">
                {predictionResult?.recommendations?.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <AlertCircle className="text-primary w-5 h-5 mt-1" />

                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Match */}

            <div className="glassmorphism-card rounded-3xl p-8 border border-white/10 backdrop-blur-xl bg-white/5">
              <h3 className="text-2xl text-white font-bold mb-6">
                Resume Job Match Analysis
              </h3>

              <div className="mb-6">
                <p className="text-gray-400 mb-2">Match Percentage</p>

                <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${predictionResult?.matchPercentage || 0}%`,
                    }}
                  ></div>
                </div>

                <p className="text-green-400 mt-2 font-bold">
                  {predictionResult?.matchPercentage || 0}% Match
                </p>
              </div>

              {/* Matched Skills */}

              <div className="mb-6">
                <h4 className="text-green-400 font-bold mb-3">
                  Matched Skills
                </h4>

                <div className="flex flex-wrap gap-3">
                  {predictionResult?.matchedSkills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}

              <div>
                <h4 className="text-red-400 font-bold mb-3">Missing Skills</h4>

                <div className="flex flex-wrap gap-3">
                  {predictionResult?.missingSkills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Placement Prediction System
        </h1>

        <p className="text-gray-400">AI Powered Resume + Placement Analysis</p>
      </div>

      <div className="glassmorphism-card p-10 border border-white/10 rounded-3xl min-h-[550px] backdrop-blur-xl bg-white/5 shadow-2xl">
        <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
      </div>

      {currentStep < 5 && (
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-xl bg-white/10 text-white"
          >
            <ArrowLeft className="inline w-5 h-5 mr-2" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === 4 && !formData.resume}
            className="px-6 py-3 rounded-xl bg-primary text-white"
          >
            {currentStep === 4 ? "Predict Placement" : "Continue"}

            <ArrowRight className="inline w-5 h-5 ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PredictionFlow;
