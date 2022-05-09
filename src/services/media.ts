// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Media } from "../features/media/mediaSlice";

// Define a service using a base URL and expected endpoints
export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://itunes.apple.com/" }),
  endpoints: (builder) => ({
    getMediaBySearchKeyword: builder.query<{ results: Media[] }, string>({
      query: (searchParam) => `search?limit=14&${searchParam}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMediaBySearchKeywordQuery } = mediaApi;
