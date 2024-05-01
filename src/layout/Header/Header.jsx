import React, { Children } from "react";
import jiralogo from "./../../asset/img/jiralogo.svg";
import { NavLink } from "react-router-dom";
import { Avatar, Dropdown, Popover, Space } from "antd/es";
import "./header.scss";
import { getLocalStorage } from "../../utils/util";
const Header = () => {
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
          label: <NavLink>User Managerment</NavLink>,
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
          label: <NavLink>User Managerment</NavLink>,
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
          label: <NavLink>Profile</NavLink>,
        },
      ],
    },
  ];
  const user = getLocalStorage("user");

  return (
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
                <NavLink>Create Task</NavLink>
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
                    <Avatar>{!user ? "User" : user.avatar}</Avatar>
                  </Space>
                </Popover>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
