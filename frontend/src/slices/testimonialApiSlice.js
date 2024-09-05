// In testimonialApiSlice.js

import { apiSlice } from "./apiSlice";
import { TESTIMONIAL_URL } from "../constants";

export const testimonialApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTestimonial: builder.mutation({
            query: (data) => ({
                url: `${TESTIMONIAL_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        getRandomTestimonials: builder.query({
            query: () => ({
                url: `${TESTIMONIAL_URL}/random`,
                method: "GET",
            }),
        }),
        getAllTestimonials: builder.query({
            query: () => ({
                url: `${TESTIMONIAL_URL}`,
                method: "GET",
            }),
        }),
        deleteTestimonial: builder.mutation({
            query: (id) => ({
                url: `${TESTIMONIAL_URL}/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useCreateTestimonialMutation,
    useGetAllTestimonialsQuery,
    useGetRandomTestimonialsQuery,
    useDeleteTestimonialMutation
} = testimonialApiSlice;
