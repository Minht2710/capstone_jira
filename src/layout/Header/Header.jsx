import React, { Children, useEffect } from "react";
import jiralogo from "./../../asset/img/jiralogo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Popover, Space } from "antd/es";
import "./header.scss";
import { getLocalStorage } from "../../utils/util";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenCreateTask } from "../../redux/slice/taskSlice";
import CreateTask from "../Task/CreateTask";
import { getAllProjectThunk } from "../../redux/slice/projectSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = getLocalStorage("user");
  const onOpen = () => {
    dispatch(handleOpenCreateTask());
  };
  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  // project
  const projectDd = [
    {
      key: "1",
      label: <NavLink to={"/"}>View All Projects</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to={"/"}>Create New Project</NavLink>,
    },
  ];

  // user
  const usersDd = [
    {
      key: "1",
      label: <NavLink to={"/"}>View All Projects</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to={"/"}>Create New Project</NavLink>,
    },
  ];

  // setting
  const settingDd = [
    {
      key: "1",
      label: <p className="uppercase">Atlassian admin</p>,
      type: "group",
      children: [
        {
          key: "1-1",
          label: <NavLink to="/user-managerment" >User Managerment</NavLink>,
        },
      ],
    },
    {
      key: "2",
      label: <p className="uppercase">Jira Setting</p>,
      type: "group",
      children: [
        {
          key: "2-1",
          label: <NavLink>Setting</NavLink>,
        },
      ],
    },
  ];

  // Profile
  const profileDd = [
    {
      key: "1",
      label: <p className="uppercase">trang header</p>,
      type: "group",
      children: [
        {
          key: "1-1",
          label: (
            <button
              onClick={() => {
                navigate(`/profile/${user.id}`);
              }}
            >
              Profile
            </button>
          ),
        },
        {
          key: "2-2",
          label: (
            <button
              className="font-bold hover:text-red-500 transition-all duration-100"
              onClick={() => logOut()}
            >
              Log Out
            </button>
          ),
        },
      ],
    },
  ];
  // console.log(user)
  useEffect(() => {
    dispatch(getAllProjectThunk());
  }, [dispatch]);
  return (
    <>
      <header>
        <div
          className="headerNavbar
      px-3 flex justify-between items-center"
        >
          {/* left */}
          <div className="headerLeft flex items-center">
            <div className="logoJira">
              <img src={jiralogo} alt="" className=" h-6" />
            </div>
            <nav className="mx-5">
              <ul className="flex flex-row">
                {/* navbar  */}
                <li>
                  <Dropdown
                    menu={{
                      items: projectDd,
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        ProJect
                        <i class="fa-sharp fa-solid fa-chevron-down inline text-sm"></i>
                      </Space>
                    </a>
                  </Dropdown>
                </li>

                <li>
                  <Dropdown
                    menu={{
                      items: usersDd,
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        Users
                        <i class="fa-sharp fa-solid fa-chevron-down inline text-sm"></i>
                        {/* <DownOutlined /> */}
                      </Space>
                    </a>
                  </Dropdown>
                </li>
                <li>
                  <button type="button" onClick={onOpen}>
                    Create Task
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* right */}
          <div className="headerRight flex items-center">
            {/* setting  */}
            <div className="mx-2">
              <Dropdown
                menu={{
                  items: settingDd,
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Popover placement="bottom" title={<p>setting</p>}>
                    <Space>
                      <i class="fa-duotone fa-gear"></i>
                    </Space>
                  </Popover>
                </a>
              </Dropdown>
            </div>

            {/* profile  */}
            <div className="space-x-2">
              <Dropdown
                menu={{
                  items: profileDd,
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Popover placement="bottomLeft" title={<p>Your Profile</p>}>
                    <Space>
                      <Avatar src={!user ? "User" : user.avatar} />
                    </Space>
                  </Popover>
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
      <div>
        <CreateTask />
      </div>
    </>
  );
};

export default Header;
