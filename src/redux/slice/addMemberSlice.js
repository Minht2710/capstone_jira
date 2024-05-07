import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addMemberLayout: false,
};

const addMemberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    handleOpenAddMb: (state, action) => {
      state.addMemberLayout = true;
    },
    handleCloseAddMb: (state, action) => {
      state.addMemberLayout = false;
    },
  },
});

export const { handleOpenAddMb, handleCloseAddMb } = addMemberSlice.actions;

export default addMemberSlice.reducer;
