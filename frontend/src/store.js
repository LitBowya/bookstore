import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "./redux/auth";
import cartSliceReducer from './redux/cart';
import wishlistSliceReducer from './redux/wishlist';
import shippingSliceReducer from './redux/shipping'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// Create a persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'wishlist', 'shipping', 'auth'],
};

// Combine your reducers into a root reducer
const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    cart: cartSliceReducer,
    wishlist: wishlistSliceReducer,
    shipping: shippingSliceReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
        apiSlice.middleware,
    ],
    devtools: true,
});

export const persistor = persistStore(store);

export default store;
