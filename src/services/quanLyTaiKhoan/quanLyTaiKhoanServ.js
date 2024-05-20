import { http } from "../config";

export const quanLyTaiKhoanServ = {
  dangNhap: (data) => {
    return http.post("/Users/signin", data);
  },
  dangKi: (data) => {
    return http.post("/Users/signup", data);
  },
  memberOfProject: (projectId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.get(`/Users/getUserByProjectId?idProject=${projectId}`, config);
  },
  getUser: (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.get(`Users/getUser`, config);
  },
  getUserById: (userId, accessToken) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    return http.get(`Users/getUser?keyword=${userId}`, config);
  },
  updateUser: (user) => {
    return http.put(`Users/editUser`, user);
  },
  deleteUser: (userId, accessToken) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    return http.delete(`Users/deleteUser?id=${userId}`, config);
  },

  addMemberToProject: (values, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.post("/Project/assignUserProject", values, config);
  },
  removeMemberFromProject: (values, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.post("/Project/removeUserFromProject", values, config);
  },

  addMemberTask: (data, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.post("/Project/assignUserTask", data, config);
  },
};
