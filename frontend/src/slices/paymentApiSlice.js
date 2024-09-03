import { apiSlice } from "./apiSlice";
import { PAYMENT_URL } from "../constants";

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPayments: builder.query({
            query: () => ({
                url: `${PAYMENT_URL}`,
                method: "GET",
            }),
        }),
        createPayment: builder.mutation({
            query: (data) => ({
                url: `${PAYMENT_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        getAllPayments: builder.query({
            query: () => ({
                url: `${PAYMENT_URL}/all`,
                method: "GET",
            }),
        }),
        initiatePayment: builder.mutation({
            query: (data) => ({
                url: `${PAYMENT_URL}/initiate`,
                method: "POST",
                body: data,
            }),
        }),
        verifyPayment: builder.query({
            query: () => ({
                url: `${PAYMENT_URL}/verify`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetPaymentsQuery,
    useCreatePaymentMutation,
    useGetAllPaymentsQuery,
    useInitiatePaymentMutation,
    useVerifyPaymentQuery,
} = paymentApiSlice;
