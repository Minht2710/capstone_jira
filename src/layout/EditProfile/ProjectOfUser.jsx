import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectSlice, {
  getAllProjectThunk,
  getDeleteProjectThunk,
  getProjectDetailThunk,
  handleOpenProjectDetail,
} from "../../redux/slice/projectSlice";
import { getLocalStorage } from "../../utils/util";
import { Card, Popover, message } from "antd";
import "./projectOfUser.scss";
import ProjectDetail from "../projectDetail/ProjectDetail";

const ProjectOfUser = () => {
  const user = getLocalStorage("user");
  // console.log(user.accessToken);
  const dispatch = useDispatch();

  const getAllProject = useSelector((state) => state.projectSlice.allProject);

  const handleDeleteProject = (projectId) => {
    dispatch(
      getDeleteProjectThunk({ data: projectId, token: user.accessToken })
    )
      .then((result) => {
        setTimeout(message.success("Delete complete"));
        dispatch(getAllProjectThunk());
      })
      .catch((err) => {});
  };

  useEffect(() => {
    dispatch(getAllProjectThunk());
  }, [dispatch]);

  // Lọc dữ liệu nếu getAllProject có giá trị
  const projectOfUser = getAllProject
    ? getAllProject.filter((project) => {
        return project.creator && project.creator.id
          ? project.creator.id === user.id
          : [];
      })
    : [];

  const handleProjectDetail = (projectId) => {
    dispatch(handleOpenProjectDetail());
    dispatch(
      getProjectDetailThunk({ projectid: projectId, token: user.accessToken })
    );
  };
  return (
    <div>
      {/* title */}
      <div className="mt-10">
        <h3 className="font-bold text-lg">Your Project</h3>
      </div>
      {/* item */}
      <div className="projectListUser flex flex-wrap justify-evenly overflow-x-auto">
        {projectOfUser.map((project) => {
          const content = (
            <div className="popoverMore">
              <button
                className="mr-2"
                onClick={() => handleDeleteProject(project.id)}
              >
                <i class="fa-sharp fa-solid fa-trash text-xl text-red-500 hover:text-red-700 transition-all duration-500"></i>
              </button>
              <button
                className="text-sm"
                onClick={() => handleProjectDetail(project.id)}
              >
                <i class="fa-solid fa-circle-info text-xl text-blue-500 hover:text-blue-700 transition-all duration-500"></i>
              </button>
            </div>
          );
          return (
            <Card
              title={project.projectName}
              className="cardProjectUser m-2"
              style={{ width: 300 }}
              key={project.id}
              extra={
                <Popover
                  className=""
                  content={content}
                  placement="bottomRight"
                  trigger="click"
                >
                  <button>
                    <i class="fa-solid fa-ellipsis"></i>
                  </button>
                </Popover>
              }
            >
              <div>
                <span>Project Id: </span>
                <p className="inline">{project.id}</p>
              </div>
              <div>
                <span>Category: </span>
                <p className="inline">{project.categoryName}</p>
              </div>
            </Card>
          );
        })}
      </div>
      <ProjectDetail />
    </div>
  );
};

export default ProjectOfUser;
