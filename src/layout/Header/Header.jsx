import React, { Children, useEffect, useState } from "react";
import jiralogo from "./../../asset/img/jiralogo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.scss";
import { getLocalStorage } from "../../utils/util";
import { useDispatch, useSelector } from "react-redux";
import CreateTask from "../Task/CreateTask";
import { getAllProjectThunk } from "../../redux/slice/projectSlice";
import useResponsive from "../../hooks/useResponsive";
import { Avatar, Divider, Drawer, Tooltip } from "antd";
import { handleOpenCreateTask } from "../../redux/slice/taskSlice";

const Header = () => {
  const user = getLocalStorage("user");
  const { isMobile } = useResponsive();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showMenuMobile = () => {
    setOpen(true);
  };
  const hidenMenumobile = () => {
    setOpen(false);
  };
  const onOpen = () => {
    dispatch(handleOpenCreateTask());
  };
  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/Toggle-sign-in");
  };
  // console.log(user)
  useEffect(() => {
    dispatch(getAllProjectThunk());
  }, [dispatch]);
  return (
    <header className="relative">
      <div
        className="headerNavbar
      px-3 flex justify-between items-center"
      >
        {/* left */}
        <div className="headerLeft">
          <div className="logoJira">
            {isMobile ? (
              <button onClick={showMenuMobile}>
                <img src={jiralogo} alt="" className="h-8 my-3" />
              </button>
            ) : (
              <NavLink to={"/"}>
                <img src={jiralogo} alt="" className="h-8 my-3" />
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <Drawer title="Basic Drawer" open={open} onClose={hidenMenumobile}>
        <div className="siderBar">
          <div className="flex flex-col">
            <NavLink to={"/"} className="linkSider text-xl">
              <i class="fa-solid fa-list-radio inline"></i>
              <p>Project List </p>
            </NavLink>
            <NavLink to={"/create-project"} className="linkSider text-xl">
              <i class="fa-sharp fa-light fa-layer-plus"></i>
              <p>Create Project </p>
            </NavLink>
            <NavLink to={"/user-managerment"} className="linkSider text-xl">
              <i class="fa-duotone fa-users"></i>
              <p>User Manager </p>
            </NavLink>
            <NavLink onClick={onOpen} className="linkSider text-xl">
              <i class="fa-sharp fa-solid fa-grid-2-plus"></i>
              <p>Create Task </p>
            </NavLink>
          </div>
          <div>
            <Divider />

            <Tooltip title={user.name}>
              <div></div>
              <NavLink to={`/profile/${user.id}`}>
                <div className="userInfo flex">
                  <div className="w-3/12">
                    <Avatar src={user.avatar} size={"large"} />
                  </div>
                  <div className="flex flex-col w-9/12">
                    {/* username */}
                    <span className="capitalize whitespace-nowrap text-ellipsis font-semibold text-xl w-24">
                      {user.name}
                    </span>
                    <small>{user.id}</small>
                  </div>
                </div>
              </NavLink>
            </Tooltip>
            <button
              onClick={logOut}
              className="logOut mt-2 w-full rounded-xl hover:bg-red-500 transition-all duration-500 p-2 hover:text-white"
            >
              <i class="fa-sharp fa-solid fa-arrow-right-from-bracket mr-2"></i>
              Log Out
            </button>
          </div>
        </div>
      </Drawer>
      <CreateTask />
    </header>
  );
};

export default Header;
