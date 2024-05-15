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
    return http.get(`/Users/getUser`, config);
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
};
