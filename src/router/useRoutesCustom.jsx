import React from "react";
import { useRoutes } from "react-router-dom";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import HomePage from "../Pages/Home/HomePage";
import ToggleSignIn from "../Pages/ToggleSignIn/ToggleSignIn";
// import ToggleSignIn from "../Pages/SignIn/SignIn";

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <UserTemplate />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
      ],
    },
    {
      path: "/Toggle-sign-in",
      element: <ToggleSignIn />,
    },
  ]);
  return routes;
};

export default useRoutesCustom;
