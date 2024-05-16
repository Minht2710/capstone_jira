import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyTask } from "../../services/quanLyTask/quanLyTask";
import { message } from "antd";

const initialState = {
  openCreateTask: false,
  statusList: [],
  priorityList: [],
  taskTypeList: [],
  showModal: false,
  taskDetail: null,
  column: [],
  priorityValue: null,
  taskType: null,
  commentList: [],
};

export const getStatusThunk = createAsyncThunk(
  "quanLyTask/getStatusThunk",
  async () => {
    const res = await quanLyTask.getStatus();
    return res.data.content;
  }
);

export const getCommentThunk = createAsyncThunk(
  "quanLyTask/getCommentThunk",
  async (taskId) => {
    const res = await quanLyTask.getComment(taskId);
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

// ---------------------
// UPDATE
// update PRIORITY
export const updatePriorityThunk = createAsyncThunk(
  "quanLyTask/updatePriorityThunk",
  async ({ value, token }, thunkAPI) => {
    const res = await quanLyTask.updatePriority(value, token);
    return res.data.content;
  }
);

//UPDATE DESCRIPTION
export const updateDescriptionThunk = createAsyncThunk(
  "quanLyTask/udpateDescriptionThunk",
  async ({ value, token }, thunkAPI) => {
    const res = await quanLyTask.updateDescription(value, token);
    return res.data.content;
  }
);

// update Estimate
export const updateEstimateThunk = createAsyncThunk(
  "quanLyTask/updateEstimateThunk",
  async ({ value, token }, thunkAPI) => {
    const res = await quanLyTask.updateEstimate(value, token);
    return res.data.content;
  }
);

// update Tracking time
export const updateTrackingTimeThunk = createAsyncThunk(
  "quanLytask/updateTrackingTimeThunk",
  async ({ value, token }, thunkAPI) => {
    const res = await quanLyTask.updateTrackingTime(value, token);
    return res.data.content;
  }
);

export const postCommentThunk = createAsyncThunk(
  "quanLyTask/postCommentThunk",
  async ({ data, token }) => {
    const res = await quanLyTask.postComent(data, token);
    return res.data.content;
  }
);

export const updateCommentThunk = createAsyncThunk(
  "quanLyTask/updateCommentThunk",
  async ({ id, contentComment, token }, thunkAPI) => {
    const res = await quanLyTask.updateComment(id, contentComment, token);
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

    //column
    handleChangeColumn: (state, action) => {
      state.column = action.payload;
    },
    // show modal
    handleShowModal: (state, action) => {
      // console.log("open task detail", action.payload);
      state.taskDetail = action.payload;
      state.showModal = true;
    },
    handleHideModal: (state, action) => {
      console.log(action);
      state.taskDetail = null;
      state.showModal = false;
    },
    // task detail change priority
    handleChangePriorityValue: (state, action) => {
      state.priorityValue = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // post comment
      .addCase(updateCommentThunk.fulfilled, (state, action) => {
        message.success("Update comment complete");
      })
      .addCase(updateCommentThunk.rejected, (state, action) => {
        message.error("Update comment", action.error.message);
        console.log("error comment update", action);
      })
      .addCase(postCommentThunk.fulfilled, (state, action) => {
        console.log(action);
        message.success("Success");
      })
      .addCase(postCommentThunk.rejected, (state, action) => {
        message.error(action.error.message);
      })
      .addCase(getCommentThunk.fulfilled, (state, action) => {
        state.commentList = action.payload;
      })
      .addCase(getCommentThunk.rejected, (state, action) => {
        message.error(action.error.message);
      })
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
      .addCase(getTaskTypeThunk.rejected, (state, action) => {
        message.error(action.error.message);
      })

      // create Task
      .addCase(getCreateTaskThunk.fulfilled, (state, action) => {
        message.success("create Task complete");
        console.log(action);
      })
      .addCase(getCreateTaskThunk.rejected, (state, action) => {
        console.log(action);
      })
      // .addCase(getTaskDetailThunk.fulfilled, (state, action) => {
      //   state.taskDetail = action.payload;
      // })
      // .addCase(getTaskDetailThunk.rejected, (state, action) => {
      //   console.log(action.payload);
      //   message.error("Failed to fetch task detail.");
      // })

      // -------
      // updatePriority
      .addCase(updatePriorityThunk.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(updatePriorityThunk.rejected, (state, action) => {
        console.log(action);
        message.error(action.error.message);
      })

      // update Description
      .addCase(updateDescriptionThunk.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(updateDescriptionThunk.rejected, (state, action) => {
        console.log(action);
      })

      // update ESTIMATE TIME;
      .addCase(updateEstimateThunk.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(updateEstimateThunk.rejected, (state, action) => {
        console.log(action);
      })

      // update Tracking Time
      .addCase(updateTrackingTimeThunk.fulfilled);
  },
});

export const {
  handleChangePriorityValue,
  handleShowModal,
  handleChangeColumn,
  handleHideModal,
  handleCloseCreateTask,
  handleOpenCreateTask,
} = taskSlice.actions;

export default taskSlice.reducer;
