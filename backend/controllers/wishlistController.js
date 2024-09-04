import Wishlist from '../models/wishlistModel.js';
import Book from '../models/bookModel.js';

// Add a book to the wishlist
export const addToWishlist = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (wishlist) {
            if (!wishlist.books.includes(bookId)) {
                wishlist.books.push(bookId);
                await wishlist.save();
            }
        } else {
            await Wishlist.create({ user: userId, books: [bookId] });
        }

        // Optionally, return the updated wishlist with populated book details
        const populatedWishlist = await Wishlist.findOne({ user: userId }).populate({
            path: 'books',
            select: 'author title coverImage price',
        });
        res.json({
            status: 'success',
            message: 'Book added to wishlist',
            wishlist: populatedWishlist,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to add book to wishlist',
            error: error.message,
        });
    }
};


// Remove a book from the wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (wishlist) {
            wishlist.books = wishlist.books.filter(id => id.toString() !== bookId);
            await wishlist.save();
        }

        res.json({
            status: 'success',
            message: 'Book removed from wishlist',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to remove book from wishlist',
            error: error.message,
        });
    }
};

// Get the wishlist for a user
export const getWishlist = async (req, res) => {
    try {
        const { userId } = req.query;

        const wishlist = await Wishlist.findOne({ user: userId }).populate('books');

        res.json({
            status: 'success',
            wishlist,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch wishlist',
            error: error.message,
        });
    }
};

// Clear the wishlist for a user
export const clearWishlist = async (req, res) => {
    try {
        const { userId } = req.body;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (wishlist) {
            wishlist.books = [];
            await wishlist.save();
        }

        res.json({
            status: 'success',
            message: 'Wishlist cleared',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to clear wishlist',
            error: error.message,
        });
    }
};
