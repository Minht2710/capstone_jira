import React, { useEffect, useState } from "react";
import "./addMemberProject.scss";
import InputCustom from "../../Components/Input/InputCustom";
import { getLocalStorage } from "../../utils/util";
import { quanLyTaiKhoanServ } from "../../services/quanLyTaiKhoan/quanLyTaiKhoanServ";
import { Avatar } from "antd";

const AddMemberProject = ({ newProject, onCloseAddMember }) => {
  console.log(newProject);
  const user = getLocalStorage("user");
  // console.log(user.accessToken);
  const [users, setUsers] = useState([]);
  const [searchMember, setSearchMember] = useState("");
  const [addMember, setAddMember] = useState([]);
  console.log(addMember);

  useEffect(() => {
    quanLyTaiKhoanServ
      .getUser(user.accessToken)
      .then((res) => {
        setUsers(res.data.content);
        // console.log(res);
      })
      .catch((err) => {});
  }, []);

  // filter search user
  const handleChange = (e) => {
    setSearchMember(e.target.value);
  };

  const filterAddMember = users.filter((userFind) =>
    userFind.name.toLowerCase().includes(searchMember.toLowerCase())
  );
  const dataAddMember = () => (filterAddMember ? filterAddMember : users);

  const handleAddMember = (userId) => {
    const memberToAdd = users.find((user) => user.userId === userId);
    setAddMember((prevMembers) => [...prevMembers, memberToAdd]);
    const updatedUsers = users.filter((user) => user.userId !== userId);
    setUsers(updatedUsers);
    const data = {
      projectId: newProject.id,
      userId: parseInt(memberToAdd.userId),
    };
    // console.log(memberToAdd.userId, user.accessToken);
    quanLyTaiKhoanServ
      .addMemberToProject(data, user.accessToken)
      .then((res) => {
        console.log("thành công", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveMember = (userId) => {
    // Tìm thành viên cần loại bỏ từ danh sách addMember
    const memberToRemove = addMember.find((user) => user.userId === userId);

    // Cập nhật danh sách addMember bằng cách loại bỏ thành viên tương ứng
    setAddMember((prevMembers) =>
      prevMembers.filter((member) => member.userId !== userId)
    );

    // Đưa thành viên đã loại bỏ trở lại vào danh sách users
    setUsers((prevUsers) => [...prevUsers, memberToRemove]);
  };

  // handleAddmemberToProject bị lỗi 400
  // onClick ở dòng 178
  // -----------------------
  // const handleAddMemberToProject = () => {
  //   const data = {
  //     projectId: newProject.id,
  //     userId: addMember.map((item) => item.userId),
  //   };
  //   quanLyTaiKhoanServ
  //     .addMemberToProject(data, user.accessToken)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log("lỗi", err));
  // };
  return (
    <div className=" layout-AddMember absolute w-full left-0">
      <div className="container">
        <div className="contentAddMember py-10 px-20 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* title */}
          <h3 className="font-bold uppercase text-lg">
            Add member{" "}
            <span className="text-blue-500 text-2xl">
              {newProject.projectName}
            </span>
          </h3>
          {/* search  */}
          <div>
            <InputCustom
              label="Search"
              className="searchMember"
              type="search"
              onChange={handleChange}
            />
          </div>

          {/* list Member  */}
          <div className="">
            <div className="flex flex-row justify-between mb-5">
              {/* list all Member */}
              <div className="listUser">
                <h5 className="capitalize font-bold">list All user</h5>
                <div className="borderList">
                  <div className="listAddUser">
                    {dataAddMember().map((member) => (
                      <div className="itemUser flex justify-between items-center mb-5">
                        <div className="flex items-center">
                          <Avatar src={member.avatar} size={"large"} />
                          <div className="ml-2">
                            {/* user name  */}
                            <h5 className="font-bold">{member.name} </h5>
                            <small>{member.userId}</small>
                          </div>
                        </div>
                        <div>
                          <button
                            className="text-blue-500 text-2xl"
                            onClick={() => {
                              handleAddMember(member.userId);
                            }}
                          >
                            <i class="fa-sharp fa-solid fa-user-plus"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* list choise member */}
              <div className="listUser">
                <h5 className="capitalize font-bold">list All user</h5>
                <div className="borderList">
                  <div className="listAddUser">
                    {addMember.map((member) => (
                      <div className="itemUser flex justify-between items-center mb-5">
                        <div className="flex items-center">
                          <Avatar src={member.avatar} size={"large"} />
                          <div className="ml-2">
                            {/* user name  */}
                            <h5 className="font-bold">{member.name} </h5>
                            <small>{member.userId}</small>
                          </div>
                        </div>
                        <div>
                          <button
                            className="text-red-500 text-2xl"
                            onClick={() => {
                              handleRemoveMember(member.userId);
                            }}
                          >
                            <i class="fa-sharp fa-solid fa-user-minus"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* button group */}
            <div className="text-end">
              <button
                className="py-2 px-5 rounded-xl text-white font-bold bg-blue-500 hover:bg-blue-700 transition-all duration-500"
                onClick
              >
                Create New Project
              </button>
              <button
                className="ml-5 py-2 px-10 rounded-xl text-white font-bold bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-500"
                //đây là phần bị lỗi 400
                // onClick={() => handleAddMemberToProject()}
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberProject;
