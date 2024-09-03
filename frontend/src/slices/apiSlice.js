import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "/api",
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Cart", "Books", "Orders", "Auth", "Payment", "User", 'Categories'],
    endpoints: (builder) => ({}),
});

export default apiSlice;
