import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanlyProject } from "../../services/quanLyProject/quanLyProject";
import { message } from "antd";

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
  async () => {
    const res = await quanlyProject.getAllProject();
    return res.data.content;
  }
);

// delete project
export const getDeleteProjectThunk = createAsyncThunk(
  "quanLyProject/getDeleteProjectThunk",
  async ({ data, token }, thunkAPI) => {
    const res = await quanlyProject.getDeleteProject(data, token);
    return res.data.content;
  }
);

export const getProjectDetailThunk = createAsyncThunk(
  "quanLyProject/getProjectDetailThunk",
  async ({ projectid, token }, thunkAPI) => {
    const res = await quanlyProject.getProjectDetail(projectid, token);
    return res.data.content;
  }
);
export const getCategoryThunk = createAsyncThunk(
  "quanLyProject/getCategoryThunk",
  async () => {
    const res = await quanlyProject.getProjectCategory();
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
      .addCase(getAllProjectThunk.fulfilled, (state, action) => {
        state.allProject = action.payload;
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
        console.log(action);
      })
      .addCase(getCategoryThunk.fulfilled, (state, action) => {
        state.category = action.payload;
      })

      // update Status board
      .addCase(updateStatusThunk.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(updateStatusThunk.rejected, (state, action) => {
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
