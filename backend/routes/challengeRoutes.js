const express = require("express");
const router = express.Router();
const Challenge = require("../models/Challenges");

// GET all challenges
router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
