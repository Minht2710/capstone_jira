import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ItemTask from "./ItemTask";
import { useDispatch } from "react-redux";
import {
  updateStatusThunk,
  getProjectDetailThunk,
} from "../../redux/slice/projectSlice";
import { useParams } from "react-router-dom";
import { getLocalStorage } from "../../utils/util";
import "./columnDnD.scss";

const ColumnDnD = ({ lstTask }) => {
  const user = getLocalStorage("user");
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [columns, setColumns] = useState(lstTask);

  useEffect(() => {
    dispatch(getProjectDetailThunk({ projectid: projectId, token: user.accessToken }));
  }, [dispatch, projectId, user.accessToken]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find(
        (col) => col.statusId === source.droppableId
      );
      const destColumn = columns.find(
        (col) => col.statusId === destination.droppableId
      );

      if (!sourceColumn || !destColumn) {
        console.error("Không tìm thấy cột nguồn hoặc cột đích");
        return;
      }

      const sourceItems = [...sourceColumn.lstTaskDeTail];
      const destItems = [...destColumn.lstTaskDeTail];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns(
        columns.map((column) => {
          if (column.statusId === source.droppableId) {
            return { ...column, lstTaskDeTail: sourceItems };
          } else if (column.statusId === destination.droppableId) {
            return { ...column, lstTaskDeTail: destItems };
          } else {
            return column;
          }
        })
      );

      const values = {
        taskId: removed.taskId,
        statusId: destColumn.statusId,
      };
      dispatch(updateStatusThunk({ data: values, token: user.accessToken }))
        .then((res) => {
          dispatch(getProjectDetailThunk({
            projectid: projectId,
            token: user.accessToken,
          }));
        })
        .catch((err) => {
          console.log("Lỗi:", err);
        });
    } else {
      const column = columns.find((col) => col.statusId === source.droppableId);
      if (!column) {
        console.error("Không tìm thấy cột nguồn");
        return;
      }

      const copiedItems = [...column.lstTaskDeTail];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns(
        columns.map((col) =>
          col.statusId === source.droppableId
            ? { ...col, lstTaskDeTail: copiedItems }
            : col
        )
      );
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-wrap mt-5 justify-center">
          {columns?.map((status) => (
            <div key={status.statusId}>
              <div className="titleTask">
                <h4 className="titleStatus">{status.statusName}</h4>
              </div>
              <Droppable key={status.statusId} droppableId={String(status.statusId)}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="statusBg p-4 m-2 rounded-2xl "
                  >
                    <div className="itemLstTask">
                      {status.lstTaskDeTail.map((task, index) => (
                        <Draggable
                          key={task?.taskId}
                          draggableId={String(task.taskId)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ItemTask
                                task={task}
                                projectId={projectId}
                                tokenAccess={user.accessToken}
                                columns={columns}
                                setColumns={setColumns}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ColumnDnD;
