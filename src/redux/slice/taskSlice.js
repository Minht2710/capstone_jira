import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyTask } from "../../services/quanLyTask/quanLyTask";
import { message } from "antd";

const initialState = {
  openCreateTask: false,
  statusList: [],
  priorityList: [],
  taskTypeList: [],
};

export const getStatusThunk = createAsyncThunk(
  "quanLyTask/getStatusThunk",
  async () => {
    const res = await quanLyTask.getStatus();
    return res.data.content;
  }
);
export const getPriorityThunk = createAsyncThunk(
  "quanLyTask/getPriorityThunk",
  async () => {
    const res = await quanLyTask.getPriority();
    return res.data.content;
  }
);

export const getTaskTypeThunk = createAsyncThunk(
  "quanLyTask/getTaskTypeThunk",
  async () => {
    const res = await quanLyTask.getTaskType();
    return res.data.content;
  }
);

// create task
export const getCreateTaskThunk = createAsyncThunk(
  "quanLyTask/getCreateTaskThunk",
  async ({ values, token }, thunkAPI) => {
    const res = await quanLyTask.getCreateTask(values, token);
    return res.data.content;
  }
);

export const updatePriorityThunk = createAsyncThunk(
  "quanLyTask/updatePriorityThunk",
  async ({ values, token }, thunkAPI) => {
    const res = await quanLyTask.updatePriority(values, token);
    return res.data.content;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    handleOpenCreateTask: (state, action) => {
      state.openCreateTask = true;
    },
    handleCloseCreateTask: (state, action) => {
      state.openCreateTask = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getStatusThunk.fulfilled, (state, action) => {
        state.statusList = action.payload;
      })
      .addCase(getStatusThunk.rejected, (state, action) => {
        console.log(action.payload);
        message.error("error");
      })
      .addCase(getPriorityThunk.fulfilled, (state, action) => {
        state.priorityList = action.payload;
      })
      .addCase(getTaskTypeThunk.fulfilled, (state, action) => {
        state.taskTypeList = action.payload;
      })

      // create Task
      .addCase(getCreateTaskThunk.fulfilled, (state, action) => {
        message.success("create Task complete");
        console.log(action);
      })
      .addCase(getCreateTaskThunk.rejected, (state, action) => {
        console.log(action);
      })

      // updatePriority
      .addCase(updatePriorityThunk.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(updatePriorityThunk.rejected, (state, action) => {
        console.log(action);
        message.error("You do not have permission to change the priority.");
      });
  },
});

export const { handleCloseCreateTask, handleOpenCreateTask } =
  taskSlice.actions;

export default taskSlice.reducer;
