import React from "react";
import Header from "../../layout/Header/Header";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import Loading from "../../Components/loadding/Loading";
import { getLocalStorage } from "../../utils/util";
// import ToggleSignIn from "../../Pages/ToggleSignIn/ToggleSignIn";

// export const Notifycontext = React.createContext(null);
const UserTemplate = () => {
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const user = getLocalStorage("user");
  return (
    //    <Header/>
    <>
      <Header />
      {/* {isLoading ? <Loading /> : null} */}
      {user ? <Outlet /> : <Navigate to={"/Toggle-sign-in"} replace />}
    </>
    
  );
};

export default UserTemplate;
