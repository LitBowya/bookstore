import Book from "../models/bookModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";

// Get counts of books and orders
export const getCounts = async (req, res) => {
    try {
        const bookCount = await Book.find({});
        const orderCount = await Order.find({});
        const userCount = await User.find({});
        const categoryCount = await Category.find({});

        res.json({
            bookCount,
            orderCount,
            userCount,
            categoryCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch counts',
            error: error.message
        });
    }
};
