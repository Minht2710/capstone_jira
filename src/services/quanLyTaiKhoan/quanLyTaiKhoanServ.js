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
        // "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return http.get(`/Users/getUserByProjectId?idProject=${projectId}`, config);
  },
};
