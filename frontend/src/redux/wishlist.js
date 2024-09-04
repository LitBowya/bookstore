import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [],  // This will store the books in the wishlist
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        // Add a book to the wishlist
        addBookToWishlist: (state, action) => {
            const { wishlist } = action.payload;

            // Replace the current wishlist in the state with the new one from the server
            state.books = wishlist.books.map((book) => ({
                ...book,
                userId: wishlist.user,
            }));
        },
        // Remove a book from the wishlist
        removeBookFromWishlist: (state, action) => {
            const { bookId } = action.payload;
            state.books = state.books.filter(book => book._id !== bookId);
        },
        // Clear all books from the wishlist
        clearWishlist: (state) => {
            state.books = [];
        }
    },
});

export const { addBookToWishlist, removeBookFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
