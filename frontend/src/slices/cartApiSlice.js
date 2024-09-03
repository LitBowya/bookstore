import { apiSlice } from "./apiSlice";
import { CART_URL } from "../constants";

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => ({
                url: `${CART_URL}`,
                method: "GET",
            }),
        }),
        addItemToCart: builder.mutation({
            query: (data) => ({
                url: `${CART_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        removeItemFromCart: builder.mutation({
            query: (data) => ({
                url: `${CART_URL}/remove`,
                method: "POST",
                body: data,
            }),
        }),
        clearCart: builder.mutation({
            query: () => ({
                url: `${CART_URL}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddItemToCartMutation,
    useRemoveItemFromCartMutation,
    useClearCartMutation,
} = cartApiSlice;
