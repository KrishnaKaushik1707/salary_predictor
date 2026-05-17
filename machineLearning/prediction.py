import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# =========================
# Load Dataset
# =========================

train_df = pd.read_csv("train.csv")
test_df = pd.read_csv("test.csv")

# =========================
# Remove Unnecessary Column
# =========================

train_df.drop("Student_ID", axis=1, inplace=True)
test_df.drop("Student_ID", axis=1, inplace=True)

# =========================
# Encode Categorical Columns
# =========================

label_cols = ["Gender", "Degree", "Branch", "Placement_Status"]

encoders = {}

for col in label_cols:

    le = LabelEncoder()

    train_df[col] = le.fit_transform(train_df[col])

    test_df[col] = le.transform(test_df[col])

    encoders[col] = le

# =========================
# Features and Target
# =========================

X_train = train_df.drop("Placement_Status", axis=1)
y_train = train_df["Placement_Status"]

X_test = test_df.drop("Placement_Status", axis=1)
y_test = test_df["Placement_Status"]

# =========================
# Train Model
# =========================

model = RandomForestClassifier(random_state=42)

model.fit(X_train, y_train)

# =========================
# Predict
# =========================

y_pred = model.predict(X_test)

# =========================
# Accuracy
# =========================

accuracy = accuracy_score(y_test, y_pred)

print("Accuracy:", accuracy)

# =========================
# Save Model
# =========================

joblib.dump(model, "placement_model.pkl")

print("Model saved successfully")

# =========================
# Show Sample Predictions
# =========================

sample_results = pd.DataFrame({
    "Actual": y_test,
    "Predicted": y_pred
})

print(sample_results.head())