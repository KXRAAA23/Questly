const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
  points: { type: Number, default: 10 },
}, { timestamps: true });

module.exports = mongoose.model("Challenges", challengeSchema);
