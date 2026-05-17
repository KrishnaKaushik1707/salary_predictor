from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pdfplumber
import os

# =========================
# Flask App Setup
# =========================

app = Flask(__name__)

# Enable CORS for React frontend
CORS(app, origins=["http://localhost:5173"])

# Create uploads folder automatically
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load trained ML model
model = joblib.load("placement_model.pkl")


# =========================
# Resume Text Extraction
# =========================

def extract_resume_text(pdf_path):

    text = ""

    try:
        with pdfplumber.open(pdf_path) as pdf:

            for page in pdf.pages:

                extracted = page.extract_text()

                if extracted:
                    text += extracted

    except Exception as e:
        print("PDF Extraction Error:", e)

    return text


# =========================
# Skill Extraction
# =========================

def extract_skills(text):

    skills_db = [
        "python",
        "java",
        "c++",
        "react",
        "node",
        "mongodb",
        "machine learning",
        "sql",
        "javascript",
        "html",
        "css",
        "express",
        "django",
        "flask",
        "tensorflow",
        "pandas",
        "numpy",
        "git",
        "github"
    ]

    found_skills = []

    text = text.lower()

    for skill in skills_db:

        if skill.lower() in text:
            found_skills.append(skill)

    return found_skills


# =========================
# Resume Upload Route
# =========================

@app.route("/upload-resume", methods=["POST"])
def upload_resume():

    try:

        if "resume" not in request.files:

            return jsonify({
                "error": "No file uploaded"
            }), 400

        file = request.files["resume"]

        if file.filename == "":

            return jsonify({
                "error": "No file selected"
            }), 400

        # Save uploaded file
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        file.save(file_path)

        # Extract text
        text = extract_resume_text(file_path)

        # Extract skills
        skills = extract_skills(text)

        return jsonify({
            "success": True,
            "skills": skills,
            "resumeText": text[:1000]
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================
# Prediction Route
# =========================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.json

        features = np.array([[
            data["Age"],
            data["Gender"],
            data["Degree"],
            data["Branch"],
            data["CGPA"],
            data["Internships"],
            data["Projects"],
            data["Coding_Skills"],
            data["Communication_Skills"],
            data["Aptitude_Test_Score"],
            data["Soft_Skills_Rating"],
            data["Certifications"],
            data["Backlogs"]
        ]])

        # Prediction
        prediction = model.predict(features)

        # Probability
        probability = model.predict_proba(features)[0][1] * 100

        # Result
        result = "Placed" if prediction[0] == 1 else "Not Placed"

        # Dynamic package prediction
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
# Home Route
# =========================

@app.route("/")
def home():

    return jsonify({
        "message": "Placement Prediction API Running"
    })


# =========================
# Run Flask App
# =========================

if __name__ == "__main__":

    app.run(debug=True, port=8000)