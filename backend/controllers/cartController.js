import Cart from '../models/cartModel.js';
import Book from '../models/bookModel.js';

// Get cart by user ID
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.book');
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Your cart is empty' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add an item to the cart
export const addItemToCart = async (req, res) => {
    const { bookId, quantity } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            cart.items.push({ book: bookId, quantity });
        }

        await cart.save();
        // Populate book details in the response if necessary
        const populatedCart = await Cart.findById(cart._id).populate('items.book');
        res.status(201).json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Remove an item from the cart
export const removeItemFromCart = async (req, res) => {
    const { bookId } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the item from the cart
        cart.items = cart.items.filter(item => item.book.toString() !== bookId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear the cart
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
