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
  getTaskDetail: (data, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.get(`/Project/getTaskDetail?taskId=${data}`, config);
  },

  // get comment
  getComment: (taskId) => {
    return http.get(`/Comment/getAll?taskId=${taskId}`);
  },

  updateComment: (id, contentComment, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.put(
      `/Comment/updateComment?id=${id}&contentComment=${contentComment}`,
      config
    );
  },

  deleteComment: (idComment, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.delete(`/Comment/deleteComment?idComment=${idComment}`, config);
  },
  // -------------
  // update
  // update PRIORITY
  updatePriority: (data, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.put("/Project/updatePriority", data, config);
  },

  //  post comment
  // {
  //   "taskId": 0,
  //   "contentComment": "string"
  // }
  postComent: (data, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.post(`/Comment/insertComment`, data, config);
  },

  // update DESCRIPTION
  // {
  //   "taskId": 0,
  //   "description": "string"
  // }
  updateDescription: (value, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.put("/Project/updateDescription", value, config);
  },

  // update ESTIMATE TIME
  updateEstimate: (data, token) => {
    //  data: {
    //   "taskId": 0,
    //   "originalEstimate": 0
    // }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.put("/Project/updateEstimate", data, config);
  },

  // update TRACKING TIME
  updateTrackingTime: (data, token) => {
    // {
    //   "taskId": 0,
    //   "timeTrackingSpent": 0,
    //   "timeTrackingRemaining": 0
    // }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.put("/Project/updateTimeTracking", data, config);
  },
  updateTask: (data, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.post("/Project/updateTask", data, config);
  },
  removeTask: (taskId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.delete(`/Project/removeTask?taskId=${taskId}`, config);
  },
};
