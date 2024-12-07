const express = require("express");
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");
const { authenticateToken } = require("./userAuth");

const router = express.Router();

//only for user
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;
        if (!order || order.length === 0) {
            return res
                .status(400)
                .json({ message: "Order is empty" });
        }
        for (const orderData of order) {
            const bookExists = await Book.findById(orderData._id);
            if (!bookExists) {
                return res
                    .status(404)
                    .json({ message: `Book with ID ${orderData._id} not found` });
            }

            const newOrder = new Order({ 
                user: id, 
                book: orderData._id 
            });
            const orderDataFromDb = await newOrder.save();
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
                $pull: { cart: orderData._id }
            });
        }

        return res
            .json({ 
                status: "Success", 
                message: "Order placed successfully" 
            });
    } catch (error) {
        console.error("Error placing order:", error);
        res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
});

router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" }
        });
        if (!userData) {
            return res
                .status(404)
                .json({ message: "User not found" });
        }

        const orderData = userData.orders.reverse();
        return res
            .json({ 
                status: "Success", 
                data: orderData 
            });
    } catch (error) {
        console.error("Error fetching order history:", error);
        res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
});


//only for admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
            .populate({ path: "book" })
            .populate({ path: "user" })
            .sort({ createdAt: -1 });
        return res
            .json({ 
                status: "Success", 
                data: userData 
            });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
});


router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            return res
                .status(400)
                .json({ message: "Status is required" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedOrder) {
            return res
                .status(404)
                .json({ message: "Order not found" });
        }

        return res
            .json({ 
                status: "Success", 
                message: "Status updated successfully" 
            });
    } catch (error) {
        console.error("Error updating order status:", error);
        res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
});

module.exports = router;
