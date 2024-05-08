import { configureStore } from "@reduxjs/toolkit";
// import checkSlice from "./slice/checkSlice";
import loadingSlice from "./slice/loadingSlice";

export const store = configureStore({
  reducer: {
    loadingSlice,
  },
});
