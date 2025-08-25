const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET top users by score
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .sort({ score: -1 }) // descending
      .limit(10)           // top 10
      .select("username score"); // only username and score
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
