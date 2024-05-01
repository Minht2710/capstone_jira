import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movieSlice: null,

};

const checkSlice = createSlice({
  name: "oke",
  initialState,
  reducers: {
    demo: () => {
      
    }
    
  },
});

export const { oke } = checkSlice.actions;

export default checkSlice.reducer;
