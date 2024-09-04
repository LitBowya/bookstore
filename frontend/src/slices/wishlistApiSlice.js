import { apiSlice } from "./apiSlice";
import { WISHLIST_URL } from "../constants";

export const wishlistApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query({
            query: (userId) => ({
                url: `${WISHLIST_URL}?userId=${userId}`,
                method: "GET",
            }),
        }),
        addToWishlist: builder.mutation({
            query: (data) => ({
                url: `${WISHLIST_URL}/add`,
                method: "POST",
                body: data,
            }),
        }),
        removeFromWishlist: builder.mutation({
            query: (data) => ({
                url: `${WISHLIST_URL}/remove`,
                method: "POST",
                body: data,
            }),
        }),
        clearWishlist: builder.mutation({
            query: (data) => ({
                url: `${WISHLIST_URL}/clear`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
    useClearWishlistMutation, // Add this line
} = wishlistApiSlice;
