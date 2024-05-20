import React, { useEffect, useState } from "react";
import { quanlyProject } from "../../services/quanLyProject/quanLyProject";
import { NavLink, useNavigate } from "react-router-dom";
import "./tableData.scss";
import { Avatar, Card, Modal, Pagination, message } from "antd";
import useResponsive from "../../hooks/useResponsive";
import { getLocalStorage } from "../../utils/util";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjectThunk,
  getProjectDetailThunk,
  handleCloseProjectDetail,
  handleOpenProjectDetail,
} from "../../redux/slice/projectSlice";
import ProjectDetail from "../projectDetail/ProjectDetail";
import {
  handleCloseCreateTask,
  handleOpenCreateTask,
} from "../../redux/slice/taskSlice";

const TableProject = () => {
  const dispatch = useDispatch();
  const user = getLocalStorage("user");
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  const projects = useSelector((state) => state.projectSlice.allProject);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // column
  const columnTable = [
    { title: "id", columnSize: "5%" },
    { title: "Project", columnSize: "35%" },
    { title: "Category Name", columnSize: "20%" },
    { title: "Creator", columnSize: "15%" },
    { title: "Members", columnSize: "15%" },
    { title: "Action", columnSize: "10%" },
  ];

  // delete project
  const handleDeleteProject = (projectId) => {
    quanlyProject
      .getDeleteProject(projectId, user.accessToken)
      .then((res) => {
        message.success("xóa thành công");
        console.log(res);
        dispatch(getAllProjectThunk());
      })
      .catch((err) => {
        console.log(err.response);
        message.error(
          "You can't delete this project because you are not Creator"
        );
      });
  };

  // searchKeyword
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredData = projects.filter(
    (project) =>
      project.projectName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      project.creator.name
        .toLowerCase()
        .includes(searchKeyword.toLowerCase()) ||
      project.id.toString().toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const getDataForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData
      ? filteredData.slice(startIndex, endIndex)
      : projects.slice(startIndex, endIndex);
  };

  // console.log(getDataForCurrentPage);
  useEffect(() => {
    // getAllProject();
    dispatch(getAllProjectThunk());
  }, [dispatch]);

  const handleShowDrawer = (projectId) => {
    dispatch(handleOpenProjectDetail());
    dispatch(
      getProjectDetailThunk({ projectid: projectId, token: user.accessToken })
    );
  };

  return (
    <div>
      <div>
        <h1 className="uppercase font-bold text-xl mb-5">Project</h1>
        {/* search and create project */}

        <div className="flex justify-between">
          {/* searchButton  */}
          <div className="inputSearch">
            <label htmlFor="searchInput" className="searchInput">
              <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
              <input
                className="formSearch"
                type="search"
                id="searchInput"
                value={searchKeyword}
                onChange={handleSearchChange}
              />
            </label>
          </div>
          <div>
            <button
              className="createProject"
              onClick={() => {
                navigate("/create-project");
              }}
            >
              Create Project +
            </button>
          </div>
        </div>
      </div>
      {/* table  */}
      {isMobile ? (
        <div className="mobileProject flex flex-wrap">
          {getDataForCurrentPage().map((item) => (
            <Card
              className="cardProject"
              title={<h5 className="uppercase">{item.projectName}</h5>}
              extra={
                <button
                  onClick={() => {
                    navigate("/create-project");
                  }}
                  className="uppercase font-semibold"
                >
                  edit
                </button>
              }
            >
              {/* category */}
              <div>
                <span className="nameCard">Category:</span>
                <span className="contentCard font-bold">
                  {item.categoryName}
                </span>
              </div>
              {/* creator */}
              <div>
                <span className="nameCard mr-2">creator:</span>
                <span className="contentCard font-bold">
                  {item.creator.name}
                </span>
              </div>
              {/* id */}
              <div>
                <span className="nameCard mr-2">id Project:</span>
                <span className="contentCard font-bold">{item.id}</span>
              </div>
              {/* member of project */}
              <div>
                <span className="nameCard mr-2">members:</span>

                <Avatar.Group
                  className="custom-avatar-group-mobie"
                  maxCount={2}
                  maxStyle={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                  }}
                >
                  {/* thành viên project */}
                  {item.members.map((member) => (
                    <Avatar
                      src={member.avatar}
                      shape="circle"
                      gap={2}
                      alt={member.name}
                      draggable={true}
                    />
                  ))}
                </Avatar.Group>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="tableData w-full mt-5">
          <table className="w-full">
            <thead className="columnName w-full">
              <tr className="headTable w-full ">
                {columnTable.map((column, index) => (
                  <th
                    key={index}
                    className="uppercase"
                    style={{ width: column.columnSize }}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getDataForCurrentPage().map((project, index) => (
                <tr
                  className="rowOfTable"
                  key={project.id}
                  // style={{
                  //   backgroundColor:
                  //     index % 2 === 0 ? "white" : "rgb(190, 218, 255)",
                  // }}
                >
                  <th>{project.id}</th>
                  <th>
                    <button
                      onClick={() =>
                        navigate(`/ProjectBoardDetail/${project.id}`)
                      }
                    >
                      {project.projectName}
                    </button>
                  </th>
                  <th>{project.categoryName}</th>
                  <th>{project.creator.name}</th>
                  <th>
                    {/* <Member projectId={data.idProject} /> */}
                    <Avatar.Group
                      className="custom-avatar-group"
                      maxCount={2}
                      maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                      }}
                    >
                      {/* thành viên project */}
                      {project.members.map((member) => (
                        <Avatar
                          src={member.avatar}
                          shape="circle"
                          gap={2}
                          alt={member.name}
                          draggable={true}
                        />
                      ))}
                    </Avatar.Group>
                  </th>
                  <th>
                    <button
                      className="btnGroup btnDeleteProject text-red-500 hover:text-red-700 transition-all duration-500 hover:scale-125"
                      onClick={() => {
                        handleDeleteProject(project.id);
                      }}
                    >
                      <i class="fa-sharp fa-solid fa-trash"></i>
                    </button>
                    <button
                      className="btnGroup btnEditProject text-green-500 hover:text-green-700 transition-all duration-500 hover:scale-125"
                      onClick={() => handleShowDrawer(project.id)}
                    >
                      <i class="fa-sharp fa-solid fa-pen-to-square"></i>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="w-full text-center mt-2">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={filteredData.length}
          onChange={(page, pageSize) => setCurrentPage(page)}
          showSizeChanger
          onShowSizeChange={(current, size) => setItemsPerPage(size)}
        />
      </div>
      <ProjectDetail />
      {/* <CreateTask /> */}
    </div>
  );
};

export default TableProject;
