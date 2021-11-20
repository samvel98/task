import { createSlice } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";

import type { RootState } from "./";

type ImageState = {
  images: ICatImage[];
};

const initialState: ImageState = {
  images: [],
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage(state, action) {
      state.images.push(...action.payload);
      state.images = uniqBy(state.images, "id");
    },
    setImage(state, action) {
      state.images = action.payload;
    },
  },
});

export const { addImage, setImage } = imageSlice.actions;
export default imageSlice.reducer;

export const selectImages = (state: RootState) => state.images;
