import { apiSlice } from "./apiSlice";
import { BOOK_URL } from "../constants";

export const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: (categoryId) => ({
                url: `${BOOK_URL}${categoryId ? `?category=${categoryId}` : ''}`,
                method: "GET",
            }),
        }),
        getBookById: builder.query({
            query: (id) => ({
                url: `${BOOK_URL}/${id}`,
                method: "GET",
            }),
        }),
        addBook: builder.mutation({
            query: (data) => ({
                url: `${BOOK_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        updateBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `${BOOK_URL}/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `${BOOK_URL}/${id}`,
                method: "DELETE",
            }),
        }),
        searchBooks: builder.query({
            query: (query) => ({
                url: `${BOOK_URL}/search?query=${query}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAllBooksQuery,
    useGetBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
    useSearchBooksQuery, // Add the search hook
} = bookApiSlice;
