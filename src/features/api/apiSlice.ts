// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.thecatapi.com/v1",
  }),

  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getCatImages: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: ({ page = 1, limit = 10, categoryIds = 1 }) =>
        `/images/search?page=${page}&limit=${limit}&category_ids=${categoryIds}`,
    }),
    getCategories: builder.query({
      query: () => "categories",
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetCatImagesQuery, useGetCategoriesQuery } = apiSlice;
