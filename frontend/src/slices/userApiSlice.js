import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile`,
                method: "GET",
            }),
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data,
            }),
        }),
        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
                method: "GET",
            }),
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: "GET",
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useGetUsersQuery,
    useGetUserByIdQuery,
    useDeleteUserMutation,
} = userApiSlice;
