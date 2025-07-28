const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../middleware/userAuth");
const authorizeRole = require("../middleware/authorizeRole");

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address, role } = req.body;

    if (username.length < 6) {
      return res.status(400).json({ message: "Username should be at least 6 characters" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password should be at least 8 characters" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const allowedRoles = ["admin", "user"];
    const assignedRole = allowedRoles.includes(role) ? role : "user";

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      role: assignedRole,
    });

    await newUser.save();
    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/log-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const authClaims = {
      id: user._id,
      username: user.username,
      role: user.role,
    };
    const token = jwt.sign({ authClaims }, "book123", { expiresIn: "30d" });
    return res.status(200).json({
      message: "Login successful",
      id: user._id,
      role: user.role,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
