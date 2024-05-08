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
  addMemberToProject: (data, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return http.post(`/Project/assignUserProject`, data, config);
  },
};
