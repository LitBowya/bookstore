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
    }),
});

export const { useCreateTestimonialMutation, useGetRandomTestimonialsQuery } = testimonialApiSlice;
