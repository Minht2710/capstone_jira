import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyTaiKhoanServ } from "../../services/quanLyTaiKhoan/quanLyTaiKhoanServ";
import { message } from "antd";

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

export const addMemberTaskThunk = createAsyncThunk(
  "quanLyTaiKhoanServ/addMemberTaskThunk",
  async ({ data, token }) => {
    const res = await quanLyTaiKhoanServ.addMemberTask(data, token);
    return res.data.content;
  }
);
const userSlice = createSlice({
  name: "quanLyUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.listUser = action.payload;
      })
      // add member task
      .addCase(addMemberTaskThunk.fulfilled, (state, action) => {
        console.log(action);
        setTimeout(message.success("Add member complete"), 1500);
      })
      .addCase(addMemberTaskThunk.rejected, (state, action) => {
        setTimeout(message.error("You can't add Member Task"));
        console.log(action);
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
