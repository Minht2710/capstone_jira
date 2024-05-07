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

  getDeleteProject: (projectId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.delete(`/Project/deleteProject?projectId=${projectId}`, config);
  },
  getProjectCategory: () => {
    return http.get("/ProjectCategory");
  },

  createNewProject: (projectData) => {
    return http.post("/Project/createProject", projectData);
  },
};
