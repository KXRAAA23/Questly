require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

const app = express();

// ---------------------------
// Middleware
// ---------------------------

// Enable CORS for your frontend only
app.use(cors({
  origin: "https://kxraaa23.github.io", // your GitHub Pages URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Handle preflight requests
app.options("*", cors());

// Body parser
app.use(express.json());

// ---------------------------
// Routes
// ---------------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// ---------------------------
// Connect to MongoDB
// ---------------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// ---------------------------
// Start server
// ---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
