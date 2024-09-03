import { apiSlice } from "./apiSlice";
import { BOOK_URL } from "../constants";

export const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: () => ({
                url: `${BOOK_URL}`,
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
                // For file uploads, you might need to adjust the headers or use FormData
            }),
        }),
        updateBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `${BOOK_URL}/${id}`,
                method: "PUT",
                body: data,
                // For file uploads, you might need to adjust the headers or use FormData
            }),
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `${BOOK_URL}/${id}`,
                method: "DELETE",
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
} = bookApiSlice;
