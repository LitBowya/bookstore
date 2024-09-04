import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Array to hold items in the cart
    totalCartItems: {
        totalQuantity: 0,
        totalPrice: 0,
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const { book, quantity } = action.payload;
            const itemIndex = state.items.findIndex(item => item.book._id === book._id);
            if (itemIndex >= 0) {
                // If item already exists, update the quantity
                state.items[itemIndex].quantity = Math.min(
                    state.items[itemIndex].quantity + quantity,
                    state.items[itemIndex].book.stock
                );
            } else {
                // If item does not exist, add to cart
                state.items.push({ book, quantity });
            }
        },
        removeItemFromCart: (state, action) => {
            // Remove item based on book ID
            state.items = state.items.filter(item => item.book._id !== action.payload.bookId);
        },
        updateItemQuantity: (state, action) => {
            const { bookId, quantity } = action.payload;
            const itemIndex = state.items.findIndex(item => item.book._id === bookId);
            if (itemIndex >= 0) {
                // Update item quantity while ensuring it does not exceed stock
                state.items[itemIndex].quantity = Math.min(quantity, state.items[itemIndex].book.stock);
            }
        },
        clearCart: (state) => {
            // Clear all items from the cart
            state.items = [];
            state.totalCartItems = { totalQuantity: 0, totalPrice: 0 };
        },
        setTotalCartItems: (state, action) => {
            const { totalQuantity, totalPrice } = action.payload;
            state.totalCartItems = { totalQuantity, totalPrice };
        }
    },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, clearCart, setTotalCartItems } = cartSlice.actions;

export default cartSlice.reducer;
