const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, mobile, username, password } = req.body;

  try {
    let user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ name, email, mobile, username, password });
    user = await user.save();
    res.status(200).json({ user: user});
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "interanl server error" });
  }
});

// Sign-in
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = {
        id: user.id,
        username: user.username,
      };
    const token = generateToken(payload);
    res.status(200).json({ user: user, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "interanl server error" });
  }
});


module.exports = router;
