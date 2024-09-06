import Order from "../models/orderModel.js";
import Book from "../models/bookModel.js";
import logger from "../utils/logger.js";

// Create a new order
export const createOrder = async (req, res, next) => {
    try {
        const { orderItems, totalPrice, paymentMethod, shippingAddress } = req.body;

        // Verify if books exist and are in stock
        for (let item of orderItems) {
            const book = await Book.findById(item.book);
            if (!book) {
                return res.status(404).json({ status: "failed", message: `Book not found: ${item.book}` });
            }
            if (book.stock < item.qty) {
                return res.status(400).json({ status: "failed", message: `Not enough stock for: ${book.title}` });
            }
        }

        // Create the order
        const order = new Order({
            user: req.user._id,
            orderItems,
            totalPrice,
            payment: paymentMethod, // Make sure paymentMethod matches the field name in your Order model
            shippingAddress,
        });

        // Decrease book stock
        for (let item of orderItems) {
            const book = await Book.findById(item.book);
            book.stock -= item.qty; // Use item.qty here to match the field name in the orderItems schema
            await book.save();
        }

        const createdOrder = await order.save();
        logger.info(`Order created successfully: ${createdOrder._id}`);
        res.status(201).json({
            status: "success",
            message: "Order created successfully",
            order: createdOrder,
        });
    } catch (error) {
        logger.error(`Error creating order: ${error.message}`);
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};

// Get user orders
export const getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("orderItems.book", "title author coverImage bookPdf");
        res.json({
            status: "success",
            message: "User orders fetched successfully",
            orders,
        });
    } catch (error) {
        logger.error(`Error fetching user orders: ${error.message}`);
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};

// Get order by ID
export const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("orderItems.book", "title author coverImage");

        if (!order) {
            return res.status(404).json({ status: "failed", message: "Order not found" });
        }

        res.json({
            status: "success",
            message: "Order fetched successfully",
            order,
        });
    } catch (error) {
        logger.error(`Error fetching order: ${error.message}`);
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate({
                path: 'user',
                select: 'name email profilePicture address'
            })
            .populate({
                path: 'orderItems.book',
                select: 'title author coverImage'
            });

        res.json({
            status: "success",
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        console.error(error)
    }

}
