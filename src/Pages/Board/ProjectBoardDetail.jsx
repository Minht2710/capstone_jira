import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectDetailThunk } from "../../redux/slice/projectSlice";
import { getLocalStorage } from "../../utils/util";
import ColumnDnD from "../../layout/DnDBoard/ColumnDnD";
import TaskDetail from "../../layout/TaskDetail/TaskDetail";
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from "../../redux/slice/loadingSlice";

const ProjectBoardDetail = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const user = getLocalStorage("user");

  const projectDetail = useSelector(
    (state) => state.projectSlice.projectDetail
  );
  const taskDetail = useSelector((state) => state.taskSlice.taskDetail);

  useEffect(() => {
    dispatch(handleTurnOnLoading());
    dispatch(
      getProjectDetailThunk({ projectid: projectId, token: user.accessToken })
    );
    dispatch(handleTurnOffLoading());
  }, [dispatch, projectId]);
  // if (!projectDetail || !projectDetail.lstTask) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container mx-auto">
      <div className="titleProjectBoard">
        <h1 className="font-semibold">
          Project:
          <span className="font-bold uppercase text-2xl ml-2 text-blue-500">
            {projectDetail?.projectName}
          </span>
        </h1>
      </div>
      {/* board */}
      <div>
        <ColumnDnD lstTask={projectDetail?.lstTask} />
      </div>
      {/* modal  */}
      {taskDetail ? <TaskDetail projectDetail={projectDetail} /> : null}
    </div>
  );
};

export default ProjectBoardDetail;
