import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./siderMenu.scss";
import { Avatar, Divider, Tooltip } from "antd";
import { getLocalStorage } from "../../utils/util";
import { useDispatch } from "react-redux";
import { handleOpenCreateTask } from "../../redux/slice/taskSlice";

const SiderMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = getLocalStorage("user");
  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/Toggle-sign-in");
  };
  const onOpen = () => {
    dispatch(handleOpenCreateTask());
  };
  return (
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
  );
};

export default SiderMenu;
