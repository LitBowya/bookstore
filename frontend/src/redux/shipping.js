// src/redux/shippingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    shippingDetails: {
        street: "",
        town: "",
        city: "",
        additionalInfo: "",
        region: "",
    }
};

const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        setShippingDetails: (state, action) => {
            state.shippingDetails = action.payload;
        },
        clearShippingDetails: (state) => {
            state.shippingDetails = initialState.shippingDetails;
        },
    },
});

export const { setShippingDetails, clearShippingDetails } = shippingSlice.actions;

export default shippingSlice.reducer;
