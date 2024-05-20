import { http } from "../config";

export const quanlyProject = {
  getAllProject: () => {
    return http.get("/Project/getAllProject");
  },
  getProjectDetail: (id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.get(`/Project/getProjectDetail?id=${id}`, config);
  },

  // delete project
  getDeleteProject: (projectId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.delete(`/Project/deleteProject?projectId=${projectId}`, config);
  },

  // category
  getProjectCategory: () => {
    return http.get("/ProjectCategory");
  },

  //create new project
  createNewProject: (projectData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.post("/Project/createProjectAuthorize", projectData, config);
  },

  updateStatusProject: (data, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.put("/Project/updateStatus", data, config);
  },
  updateProject: (projectId, data, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.put(
      `/Project/updateProject?projectId=${projectId}`,
      data,
      config
    );
  },
};
