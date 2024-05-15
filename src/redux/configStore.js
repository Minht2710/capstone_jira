import { configureStore } from "@reduxjs/toolkit";
// import checkSlice from "./slice/checkSlice";
import loadingSlice from "./slice/loadingSlice";
import projectSlice from "./slice/projectSlice";
import userSlice from "./slice/userSlice";
import taskSlice from "./slice/taskSlice";

export const store = configureStore({
  reducer: {
    loadingSlice,
    projectSlice,
    userSlice,
    taskSlice,
  },
});
