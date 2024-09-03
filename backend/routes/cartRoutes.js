import express from 'express';
import {
    getCart,
    addItemToCart,
    removeItemFromCart,
    clearCart
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js'; // Middleware to protect routes

const router = express.Router();

router.route('/')
    .get(protect, getCart) // Get the user's cart
    .post(protect, addItemToCart) // Add an item to the cart
    .delete(protect, clearCart); // Clear the cart

router.route('/remove')
    .post(protect, removeItemFromCart); // Remove an item from the cart

export default router;
