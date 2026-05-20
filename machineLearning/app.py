from flask import Flask, request, jsonify
from flask_cors import CORS

import joblib
import pandas as pd
import pdfplumber
import os
import spacy

# =========================
# FLASK APP SETUP
# =========================

app = Flask(__name__)

# Enable CORS for both local + deployed frontend
CORS(app, origins=[
    "http://localhost:5173",
    "https://salarypredictorapp.vercel.app"
])

# Upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load ML model
model = joblib.load("placement_model.pkl")

# Load spaCy NLP model
nlp = spacy.load("en_core_web_sm")

# =========================
# RESUME TEXT EXTRACTION
# =========================

def extract_resume_text(pdf_path):

    text = ""

    try:

        with pdfplumber.open(pdf_path) as pdf:

            for page in pdf.pages:

                extracted = page.extract_text()

                if extracted:
                    text += extracted + " "

    except Exception as e:

        print("PDF Extraction Error:", e)

    return text


# =========================
# DYNAMIC SKILL EXTRACTION
# =========================

def extract_skills(text):

    text = text.lower()

    tech_keywords = [

        "python",
        "java",
        "c++",
        "javascript",
        "typescript",

        "react",
        "react.js",

        "node",
        "node.js",

        "express",
        "express.js",

        "mongodb",
        "mysql",
        "sql",

        "html",
        "css",
        "bootstrap",
        "tailwind",

        "machine learning",
        "deep learning",
        "nlp",
        "ai",
        "ml",

        "tensorflow",
        "pytorch",
        "scikit-learn",

        "pandas",
        "numpy",

        "docker",
        "kubernetes",
        "aws",

        "git",
        "github",
        "postman",

        "dbms",
        "operating systems",
        "computer networks",

        "flask",
        "django",

        "mern",
        "api"
    ]

    detected_skills = []

    for keyword in tech_keywords:

        if keyword in text:
            detected_skills.append(keyword)

    return list(set(detected_skills))


# =========================
# ATS SCORE CALCULATION
# =========================

def calculate_ats_score(
    skills,
    cgpa,
    projects,
    internships,
    certifications
):

    score = 0

    # Skills
    score += min(len(skills) * 3, 30)

    # CGPA
    score += cgpa * 3

    # Projects
    score += min(projects * 5, 20)

    # Internships
    score += min(internships * 10, 20)

    # Certifications
    score += min(certifications * 4, 10)

    return min(round(score), 100)


# =========================
# RESUME UPLOAD API
# =========================

@app.route("/upload-resume", methods=["POST"])
def upload_resume():

    try:

        if "resume" not in request.files:

            return jsonify({
                "success": False,
                "error": "No file uploaded"
            }), 400

        file = request.files["resume"]

        if file.filename == "":

            return jsonify({
                "success": False,
                "error": "No file selected"
            }), 400

        # Save uploaded file
        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        file.save(file_path)

        # Extract text
        text = extract_resume_text(file_path)

        # Extract skills
        skills = extract_skills(text)

        # Dummy ATS calculation
        ats_score = calculate_ats_score(
            skills,
            8.5,
            3,
            1,
            2
        )

        return jsonify({

            "success": True,

            "skills": skills,

            "resumeText": text[:1000],

            "atsScore": ats_score

        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================
# PLACEMENT PREDICTION API
# =========================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.json

        # Create dataframe
        features = pd.DataFrame([{

            "Age": data["Age"],
            "Gender": data["Gender"],
            "Degree": data["Degree"],
            "Branch": data["Branch"],
            "CGPA": data["CGPA"],
            "Internships": data["Internships"],
            "Projects": data["Projects"],
            "Coding_Skills": data["Coding_Skills"],
            "Communication_Skills": data["Communication_Skills"],
            "Aptitude_Test_Score": data["Aptitude_Test_Score"],
            "Soft_Skills_Rating": data["Soft_Skills_Rating"],
            "Certifications": data["Certifications"],
            "Backlogs": data["Backlogs"]

        }])

        # ML Prediction
        prediction = model.predict(features)

        # Probability
        probability = model.predict_proba(features)[0][1] * 100

        # Result
        result = "Placed" if prediction[0] == 1 else "Not Placed"

        # Package prediction
        if probability >= 85:
            package = 12.0

        elif probability >= 70:
            package = 8.5

        elif probability >= 50:
            package = 5.5

        else:
            package = 3.0

        return jsonify({

            "success": True,

            "prediction": result,

            "placementProbability": round(probability, 2),

            "expectedPackage": package

        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================
# HOME ROUTE
# =========================

@app.route("/")
def home():

    return jsonify({
        "message": "Placement Prediction API Running"
    })


# =========================
# RUN SERVER
# =========================

if __name__ == "__main__":

    port = int(os.environ.get("PORT", 8000))

    app.run(
        host="0.0.0.0",
        port=port
    )