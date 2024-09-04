import { apiSlice } from "./apiSlice";
import { STATISTICS_URL } from "../constants";

export const statisticsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCounts: builder.query({
            query: () => ({
                url: `${STATISTICS_URL}/counts`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetCountsQuery } = statisticsApiSlice;
