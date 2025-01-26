const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: [
        "user", 
        "admin"
      ],
    },
    favourite: [{
      type: mongoose.Types.ObjectId,
      ref: "book",
    }],
    cart: [{
      type: mongoose.Types.ObjectId,
      ref: "book",
    }],
    orders: [{
      type: mongoose.Types.ObjectId,
      ref: "order",
    }],
    avatar: {
      type: String,
      default: "https://www.flaticon.com/free-icon/login_6681204",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);
