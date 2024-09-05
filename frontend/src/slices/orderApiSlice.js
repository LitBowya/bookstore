import { apiSlice } from "./apiSlice";
import { ORDER_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: `${ORDER_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        getUserOrders: builder.query({
            query: () => ({
                url: `${ORDER_URL}`,
                method: "GET",
            }),
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: `${ORDER_URL}/all`,
                method: "GET",
            }),
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url: `${ORDER_URL}/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetUserOrdersQuery,
    useGetAllOrdersQuery,
    useGetOrderByIdQuery,
} = orderApiSlice;
