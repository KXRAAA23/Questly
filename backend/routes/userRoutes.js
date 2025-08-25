const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Challenge = require("../models/Challenges");
const verifyToken = require("../middleware/verifyToken");

// GET logged-in user
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// MARK challenge as completed
router.post("/complete-challenge", verifyToken, async (req, res) => {
  const { challengeId } = req.body;

  try {
    const user = await User.findById(req.userId);
    const challenge = await Challenge.findById(challengeId);

    if (!challenge) return res.status(404).json({ message: "Challenge not found" });

    const today = new Date().toDateString();
    const alreadyDone = user.completedChallenges.some(
      (c) =>
        c.challengeId.toString() === challengeId &&
        new Date(c.date).toDateString() === today
    );

    if (alreadyDone) {
      return res.status(400).json({ message: "Challenge already completed today" });
    }

    user.completedChallenges.push({ challengeId, date: new Date() });
    user.score += challenge.points;
    await user.save();

    res.json({ message: "Challenge marked complete!", score: user.score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
