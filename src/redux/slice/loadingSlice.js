import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true, // Nên bắt đầu là false nếu bạn không muốn trạng thái ban đầu là đang tải
  isCount: 0,
};

const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    handleTurnOffLoading: (state, action) => {
      state.isCount -= 1;
      if (state.isCount <= 0) {
        state.isLoading = false;
        state.isCount = 0; // Đảm bảo isCount không xuống dưới 0
      }
    },
    handleTurnOnLoading: (state, action) => {
      state.isCount += 1;
      state.isLoading = true; // Đặt isLoading = true ngay khi tăng isCount
    },
  },
});

export const { handleTurnOffLoading, handleTurnOnLoading } =
  loadingSlice.actions;
export default loadingSlice.reducer;
