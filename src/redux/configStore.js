import { configureStore } from "@reduxjs/toolkit";
// import checkSlice from "./slice/checkSlice";
import loadingSlice from "./slice/loadingSlice";
import addMemberSlice from "./slice/addMemberSlice";

export const store = configureStore({
  reducer: {
    loadingSlice,
    addMemberSlice,
  },
});
