const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const studentRoutes = require("./routes/studentRoutes");

app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("PlacementIQ Backend Running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Server
const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
