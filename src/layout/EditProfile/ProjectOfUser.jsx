import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectSlice, {
  getAllProjectThunk,
  getDeleteProjectThunk,
  getProjectDetailThunk,
} from "../../redux/slice/projectSlice";
import { getLocalStorage } from "../../utils/util";
import { Card, Popover, message } from "antd";
import "./projectOfUser.scss";
import { quanlyProject } from "../../services/quanLyProject/quanLyProject";

const ProjectOfUser = () => {
  const user = getLocalStorage("user");
  // console.log(user.accessToken);
  const dispatch = useDispatch();

  const getAllProject = useSelector((state) => state.projectSlice.allProject);
  const getProjectDetail = useSelector(
    (state) => state.projectSlice.projectDetail
  );
  console.log(getAllProject);
  // const getDeleteProject = useSelector((state)=> state.projectSlice.allProject)

  // code delete bị sai
  const handleDeleteProject = (projectId) => {
    dispatch(
      getDeleteProjectThunk({ data: projectId, token: user.accessToken })
    );
  };

  useEffect(() => {
    dispatch(getAllProjectThunk());
  }, [dispatch]);

  // Lọc dữ liệu nếu getAllProject có giá trị
  const projectOfUser = getAllProject
    ? getAllProject.filter((project) => {
        // Kiểm tra xem project.creator có tồn tại và có thuộc tính id
        // Chỉ lấy các dự án có id của người tạo bằng id của người dùng
        return project.creator && project.creator.id
          ? project.creator.id === user.id
          : [];
      })
    : [];

  // console.log(projectOfUser.id);
  // project detail
  const handleProjectDetail = (projectId) => {
    console.log(projectId);
    dispatch(
      getProjectDetailThunk({ projectid: projectId, token: user.accessToken })
    );
    // dispatch(getProjectDetailThunk({ projectId, token: user.accessToken }));
  };
  console.log(getProjectDetail);
  return (
    <div>
      <div>
        <h3 className="font-bold text-lg">Your Project</h3>
      </div>
      <div className="flex flex-wrap justify-between">
        {projectOfUser.map((project) => {
          // console.log(project.id);
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
              title={project.projectName}
              className="cardProjectUser m-2"
              style={{ width: 300 }}
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
    </div>
  );
};

export default ProjectOfUser;
