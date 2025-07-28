const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("../middleware/userAuth");

const router = express.Router();

router.put("/add-book-to-cart", authenticateToken, async (req, res) => {
    try {
      const { bookid, id } = req.headers;
      if (!bookid || !id) {
        return res
          .status(400)
          .json({ message: "bookid and id are required" });
      }
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res
          .status(400)
          .json({ message: "Invalid book ID" });
      }
      const bookExists = await Book.findById(bookid);
      if (!bookExists) {
        return res
          .status(404)
          .json({ message: "Book not found" });
      }
  
      const userData = await User.findById(id);
      if (!userData) {
        return res
          .status(404)
          .json({ message: "User not found" });
      }
  
      const isBookInCart = userData.cart.some(
        (cart) => cart.toString() === bookid
      );
      if (isBookInCart) {
        return res
          .status(200)
          .json({ message: "Book is already in cart" });
      }
  
      userData.cart.push(new mongoose.Types.ObjectId(bookid));
      await userData.save();
      return res
          .status(200)
          .json({ message: "Book added to cart" });
    } catch (error) {
      console.error("Error adding book to cart:", error);
      res
          .status(500)
          .json({ message: "Internal Server Error" });
    }
});


router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;

    if (!id || !bookid) {
      return res
        .status(400)
        .json({ message: "User ID and Book ID are required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pull: { cart: bookid } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    return res.json({
      status: "Success",
      message: "Book removed from cart",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred" });
  }
});

router.get("/get-cart-book", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      if (!id) {
        return res
          .status(400)
          .json({ message: "User ID is required" });
      }
  
      const userData = await User.findById(id)
        .select("cart") 
        .populate("cart"); 
      if (!userData) {
        return res
          .status(404)
          .json({ message: "User not found" });
      }
  
      const cartBooks = userData.cart.reverse();
      if (!cartBooks || cartBooks.length === 0) {
        return res
          .status(200)
          .json({
              status: "Success",
              message: "No cart books found",
              data: [],
          });
      }
      return res
          .status(200)
          .json({
              status: "Success",
              data: cartBooks,
          });
    } catch (error) {
      console.error("Error fetching cart books:", error);
      res
          .status(500)
          .json({ message: "Internal Server Error" });
    }
  });

module.exports = router;
