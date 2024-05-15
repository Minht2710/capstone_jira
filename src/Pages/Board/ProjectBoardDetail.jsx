import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectDetailThunk } from "../../redux/slice/projectSlice";
import { getLocalStorage } from "../../utils/util";
import ColumnDnD from "../../layout/DnDBoard/ColumnDnD";

const ProjectBoardDetail = () => {
  const { projectId } = useParams();
  const user = getLocalStorage("user");
  const dispatch = useDispatch();

  const projectDetail = useSelector(
    (state) => state.projectSlice.projectDetail
  );

  useEffect(() => {
    dispatch(
      getProjectDetailThunk({ projectid: projectId, token: user.accessToken })
    );
  }, [dispatch, projectId, user.accessToken]);
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
      <div>
        <ColumnDnD lstTask={projectDetail.lstTask} />
      </div>
    </div>
  );
};

export default ProjectBoardDetail;
