import { http } from "../config";

export const quanLyTask = {
  getStatus: () => {
    return http.get("/Status/getAll");
  },
  getPriority: () => {
    return http.get("/Priority/getAll");
  },

  getTaskType: () => {
    return http.get("/TaskType/getAll");
  },
  getCreateTask: (values, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.post("/Project/createTask", values, config);
  },
  updatePriority: (data, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.put("/Project/updatePriority", data, config);
  },
};
