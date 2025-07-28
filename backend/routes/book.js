const express = require("express");
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("../middleware/userAuth");
const authorizeRole = require("../middleware/authorizeRole");

const router = express.Router();

router.post("/add-book", authenticateToken, authorizeRole(["admin"]), async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
        res
        .status(400)
        .json({ message: "You are not having access to perform admin access" });
    }

    const existingBook = await Book.findOne({ 
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        description: req.body.description,
        language: req.body.language, 
    });
    if (existingBook) {
        return res
          .status(400)
          .json({ message: "Book already exists" });
    }
    
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      description: req.body.description,
      language: req.body.language,
    });
    await book.save();
    res
        .status(200)
        .json({ message: "Book added succesfully" });
  } catch (error) {
    res
        .status(500)
        .json({ message: "Internal Server Error" });
  }
});


router.put("/update-book", authenticateToken, async (req, res) => {
    try {
      const { bookid } = req.headers;
      if (!bookid) {
        return res
            .status(400)
            .json({ message: "Book ID is required" });
      }

      const updatedBook = {
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        description: req.body.description,
        language: req.body.language,
      };
      const book = await Book.findByIdAndUpdate(bookid, updatedBook, {
        new: true, 
        runValidators: true,  
      });
      if (!book) {
        return res
            .status(404)
            .json({ message: "Book not found" });
      }
      res
        .status(200)
        .json({ message: "Book updated successfully", book });
    } catch (error) {
      console.error("Error updating book:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error" });
    }
});


router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res
            .status(200)
            .json({ message: "Book deleted successfully" });
    } catch (error) {
        res
        .status(500)
        .json({ message: "Internal Server Error" });
    };
});


router.get("/get-all-books", async (req, res) => {
    try {
        const book = await Book.find().sort({ createdAt: -1 });
        return res
            .json({ 
                status: "Success", 
                data: book
            });
    } catch (error) {
        res
        .status(500)
        .json({ message: "Internal Server Error" });
    };
});


//public to all users
router.get("/get-recent-books", async (req, res) => {
    try {
        const book = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res
            .json({ 
                status: "Success", 
                data: book
            });
    } catch (error) {
        res
        .status(500)
        .json({ message: "Internal Server Error" });
    };
});


router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res
            .json({ 
                status: "Success", 
                data: book
            });
    } catch (error) {
        res
        .status(500)
        .json({ message: "Internal Server Error" });
    };
});

module.exports = router;
