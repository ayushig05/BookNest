const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

const router = express.Router();

router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
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

    const isBookFavourite = userData.favourite.some(
      (fav) => fav.toString() === bookid
    );
    if (isBookFavourite) {
      return res
        .status(200)
        .json({ message: "Book is already in favourites" });
    }

    userData.favourite.push(new mongoose.Types.ObjectId(bookid));
    await userData.save();
    return res
        .status(200)
        .json({ message: "Book added to favourites" });
  } catch (error) {
    console.error("Error adding book to favourites:", error);
    res
        .status(500)
        .json({ message: "Internal Server Error" });
  }
});


router.put("/remove-book-from-favourite", authenticateToken,async (req, res) => {
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

      const userData = await User.findById(id);
      if (!userData) {
        return res
            .status(404)
            .json({ message: "User not found" });
      }

      const isBookFavourite = userData.favourite.some((fav) =>
        fav.equals(new mongoose.Types.ObjectId(bookid))
      );
      if (!isBookFavourite) {
        return res
          .status(404)
          .json({ message: "Book not found in favourites" });
      }
      userData.favourite.pull(new mongoose.Types.ObjectId(bookid));
      await userData.save();
      return res
        .status(200)
        .json({ message: "Book removed from favourites" });
    } catch (error) {
      console.error("Error removing book from favourites:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error" });
    }
  }
);


router.get("/get-favourite-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    if (!id) {
      return res
        .status(400)
        .json({ message: "User ID is required" });
    }

    const userData = await User.findById(id)
      .select("favourite") 
      .populate("favourite"); 
    if (!userData) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    const favouriteBooks = userData.favourite;
    if (!favouriteBooks || favouriteBooks.length === 0) {
      return res
        .status(200)
        .json({
            status: "Success",
            message: "No favourite books found",
            data: [],
        });
    }
    return res
        .status(200)
        .json({
            status: "Success",
            data: favouriteBooks,
        });
  } catch (error) {
    console.error("Error fetching favourite books:", error);
    res
        .status(500)
        .json({ message: "Internal Server Error" });
  }
});

module.exports = router;
