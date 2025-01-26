const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address, role } = req.body;
    if (username.length < 6) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 6" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Email already exists" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password's length should be greater than 8" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // if(!role || (role !== "admin" && role !== "user")) {
    //   return res
    //     .status(400)
    //     .json({ message: "Invalid role provided" });
    // }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      role,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "SignUp Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error" });
  }
});


router.post("/log-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Invalid username or password" });
    }

    await bcrypt.compare(password, existingUser.password, (error, data) => {
      if (data) {
        const authClaims = [
          {
            name: existingUser.username,
          },
          {
            role: existingUser.role,
          },
        ];
        const token = jwt.sign({ authClaims }, "book123", { expiresIn: "30d" });
        res
          .status(200)
          .json({
            id: existingUser._id,
            role: existingUser.role,
            token: token,
          });
      } else {
        res
          .status(400)
          .json({ message: "Invalid username or password" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error" });
  }
});


router.get("/get-user-information", authenticateToken, async(req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res
      .status(200)
      .json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error" });
  };
});


router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res
      .status(200)
      .json({ message: "Address updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error" });
  };
});

module.exports = router;
