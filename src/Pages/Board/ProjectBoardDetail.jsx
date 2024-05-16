import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectDetailThunk } from "../../redux/slice/projectSlice";
import { getLocalStorage } from "../../utils/util";
import ColumnDnD from "../../layout/DnDBoard/ColumnDnD";
import TaskDetail from "../../layout/TaskDetail/TaskDetail";

const ProjectBoardDetail = () => {
  const { projectId } = useParams();
  const user = getLocalStorage("user");
  const dispatch = useDispatch();

  const projectDetail = useSelector(
    (state) => state.projectSlice.projectDetail
  );
  const taskDetail = useSelector((state) => state.taskSlice.taskDetail);

  useEffect(() => {
    dispatch(
      getProjectDetailThunk({ projectid: projectId, token: user.accessToken })
    );
  }, [dispatch]);
  if (!projectDetail || !projectDetail.lstTask) {
    return <div>Loading...</div>; // Hiển thị khi dữ liệu chưa được tải
  }

  return (
    <div className="container mx-auto">
      <div className="titleProjectBoard">
        <h1 className="font-semibold">
          Project:
          <span className="font-bold uppercase text-2xl ml-2 text-blue-500">
            {projectDetail.projectName}
          </span>
        </h1>
      </div>
      {/* board */}
      <div>
        <ColumnDnD lstTask={projectDetail.lstTask} />
      </div>
      {/* modal  */}
      {taskDetail ? <TaskDetail projectId={projectId} /> : null}
    </div>
  );
};

export default ProjectBoardDetail;
