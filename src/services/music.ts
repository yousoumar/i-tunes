// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Music } from "../features/music/musicSlice";

// Define a service using a base URL and expected endpoints
export const musicApi = createApi({
  reducerPath: "musicApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://itunes.apple.com/" }),
  endpoints: (builder) => ({
    getMusiscBySearchKeyword: builder.query<{ results: Music[] }, string>({
      query: (searchText) => `search?term=${searchText}&limit=14&media=music`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMusiscBySearchKeywordQuery } = musicApi;
