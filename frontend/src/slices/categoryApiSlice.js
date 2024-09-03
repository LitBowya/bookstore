import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}`,
                method: "GET",
            }),
        }),
        getCategoryById: builder.query({
            query: (id) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: "GET",
            }),
        }),
        addCategory: builder.mutation({
            query: (data) => ({
                url: `${CATEGORY_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    useGetCategoryByIdQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApiSlice;
