import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyTaiKhoanServ } from "../../services/quanLyTaiKhoan/quanLyTaiKhoanServ";

const initialState = {
  listUser: [],
};

// export const
export const getUserThunk = createAsyncThunk(
  "quanLyTaiKhoanServ/getUserThunk",
  async (token) => {
    const res = await quanLyTaiKhoanServ.getUser(token);
    return res.data.content;
  }
);
const userSlice = createSlice({
  name: "quanLyUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.listUser = action.payload;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
