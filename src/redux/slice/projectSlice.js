import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanlyProject } from "../../services/quanLyProject/quanLyProject";
import { message } from "antd";
import { handleTurnOffLoading, handleTurnOnLoading } from "./loadingSlice";

const initialState = {
  allProject: [],
  error: null,
  projectDetail: null,
  openProjectDetail: false,
  category: [],
};

// get all project
export const getAllProjectThunk = createAsyncThunk(
  "quanLyProject/getAllProjectThunk",
  async (_, { dispatch }) => {
    dispatch(handleTurnOnLoading());
    const res = await quanlyProject.getAllProject();
    dispatch(handleTurnOffLoading());
    return res.data.content;
  }
);

// delete project
export const getDeleteProjectThunk = createAsyncThunk(
  "quanLyProject/getDeleteProjectThunk",
  async ({ projectId, data, token }) => {
    const res = await quanlyProject.getDeleteProject(data, token);
    return res.data.content;
  }
);

export const getProjectDetailThunk = createAsyncThunk(
  "quanLyProject/getProjectDetailThunk",
  async ({ projectid, token }, { dispatch }) => {
    // dispatch(handleTurnOnLoading());
    const res = await quanlyProject.getProjectDetail(projectid, token);
    // dispatch(handleTurnOffLoading());
    return res.data.content;
  }
);
export const getCategoryThunk = createAsyncThunk(
  "quanLyProject/getCategoryThunk",
  async (_, { dispatch }) => {
    dispatch(handleTurnOnLoading());
    const res = await quanlyProject.getProjectCategory();
    dispatch(handleTurnOffLoading());
    return res.data.content;
  }
);

export const updateStatusThunk = createAsyncThunk(
  "quanLyProject/updateStatusThunk",
  async ({ data, token }, thunkAPI) => {
    const res = await quanlyProject.updateStatusProject(data, token);
    return res.data.content;
  }
);

export const updateProjectThunk = createAsyncThunk(
  "quanLyProject/updateProjectThunk",
  async ({ projectId, data, token }) => {
    const res = await quanlyProject.updateProject(projectId, data, token);
    return res.data.content;
  }
);



const projectSlice = createSlice({
  name: "quanLyProject",
  initialState,
  reducers: {
    // reducer
    handleOpenProjectDetail: (state, action) => {
      state.openProjectDetail = true;
    },
    handleCloseProjectDetail: (state, action) => {
      state.openProjectDetail = false;
    },
  },

  // API
  extraReducers: (builder) => {
    builder
      // update project
      .addCase(updateProjectThunk.fulfilled, (state, action) => {
        setTimeout(message.success("update complete"), 1500);
      })
      .addCase(updateProjectThunk.rejected, (state, action) => {
        setTimeout(message.error("update was failed"), 1500);
        // console.log(action);
      })

      .addCase(getAllProjectThunk.fulfilled, (state, action) => {
        state.allProject = action.payload;
      })
      .addCase(getAllProjectThunk.rejected, (state, action) => {
        // state.allProject = action.payload;
        message.error("lỗi load data");
        console.log(action);
      })

      .addCase(getDeleteProjectThunk.fulfilled, (state, action) => {
        // state.allProject = action.payload;
        message.success("oke");
        getAllProjectThunk();
        console.log(state);
        console.log(action);
      })
      .addCase(getDeleteProjectThunk.rejected, (state, action) => {
        // console.log(state);
        console.log(action);
      })
      .addCase(getProjectDetailThunk.fulfilled, (state, action) => {
        state.projectDetail = action.payload;
      })
      .addCase(getProjectDetailThunk.rejected, (state, action) => {
        // console.log(action);
        message.error(action.error.message);
      })
      .addCase(getCategoryThunk.fulfilled, (state, action) => {
        state.category = action.payload;
      })

      // update Status board
      .addCase(updateStatusThunk.fulfilled, (state, action) => {
        // console.log(action);
      })
      .addCase(updateStatusThunk.rejected, (state, action) => {
        setTimeout(message.error("update status lỗi"), 2000);
        console.log(action);
      });
  },
});

export const {
  handleUpdateStatus,
  handleOpenProjectDetail,
  handleCloseProjectDetail,
} = projectSlice.actions;

export default projectSlice.reducer;
