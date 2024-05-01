import { http } from "../config";

export const quanlyProject = {
  getAllProject: () => {
    return http.get("/Project/getAllProject");
  },
  getDeleteProject: (projectId, token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return http.delete(`/Project/deleteProject?projectId=${projectId}`, config);
  },
};
