import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./cat-images.slice";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    images: imageReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
