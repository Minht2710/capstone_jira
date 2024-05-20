import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import HomePage from "../Pages/Home/HomePage";
import ToggleSignIn from "../Pages/ToggleSignIn/ToggleSignIn";
import CreateProject from "../Pages/CreateProject/CreateProject";
import ProfileUser from "../Pages/ProfileUser/ProfileUser";
// import Board from "../Pages/Board/Board";
import ProjectBoardDetail from "../Pages/Board/ProjectBoardDetail";
import UserManagerment from "../Pages/UserManagerment/UserManagerment";
import { getLocalStorage } from "../utils/util";

const useRoutesCustom = () => {
  const user = getLocalStorage("user");
  const routes = useRoutes([
    {
      path: "/",
      element: user ? <UserTemplate /> : <Navigate to="/toggle-sign-in" />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/create-project", element: <CreateProject /> },
        { path: "/profile", element: <ProfileUser /> },
        { path: "/profile/:userId", element: <ProfileUser /> },
        { path: "/ProjectBoardDetail", element: <ProjectBoardDetail /> },
        {
          path: "/ProjectBoardDetail/:projectId",
          element: <ProjectBoardDetail />,
        },
        { path: "/user-managerment", element: <UserManagerment /> },
      ],
    },
    { path: "/toggle-sign-in", element: <ToggleSignIn /> },
  ]);
  return routes;
};

export default useRoutesCustom;
