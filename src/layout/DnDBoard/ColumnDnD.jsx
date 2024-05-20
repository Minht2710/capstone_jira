import React, { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ItemTask from "./ItemTask";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStatusThunk,
  getProjectDetailThunk,
} from "../../redux/slice/projectSlice";
import { useParams } from "react-router-dom";
import { getLocalStorage } from "../../utils/util";
import "./columnDnD.scss";
import { handleChangeColumn } from "../../redux/slice/taskSlice";

const ColumnDnD = ({ lstTask }) => {
  const user = getLocalStorage("user");
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.taskSlice.column);

  useEffect(() => {
    dispatch(handleChangeColumn(lstTask));
  }, [dispatch, lstTask]);

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
        console.error("Source or destination column not found");
        return;
      }

      const sourceItems = [...sourceColumn.lstTaskDeTail];
      const destItems = [...destColumn.lstTaskDeTail];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const updatedColumns = columns.map((column) => {
        if (column.statusId === source.droppableId) {
          return { ...column, lstTaskDeTail: sourceItems };
        } else if (column.statusId === destination.droppableId) {
          return { ...column, lstTaskDeTail: destItems };
        } else {
          return column;
        }
      });

      dispatch(handleChangeColumn(updatedColumns));

      const values = {
        taskId: removed.taskId,
        statusId: destColumn.statusId,
      };

      dispatch(updateStatusThunk({ data: values, token: user.accessToken }))
        .then(() => {
          dispatch(
            getProjectDetailThunk({
              projectid: projectId,
              token: user.accessToken,
            })
          );
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    } else {
      const column = columns.find((col) => col.statusId === source.droppableId);
      if (!column) {
        console.error("Source column not found");
        return;
      }

      const copiedItems = [...column.lstTaskDeTail];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      const updatedColumns = columns.map((col) =>
        col.statusId === source.droppableId
          ? { ...col, lstTaskDeTail: copiedItems }
          : col
      );

      dispatch(handleChangeColumn(updatedColumns));
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-wrap mt-5 justify-center">
          {columns?.map((status) => (
            <div key={status.statusId} className="columnDnD">
              <div className="titleTask">
                <h4 className="titleStatus">{status.statusName}</h4>
              </div>
              <Droppable
                key={status.statusId}
                droppableId={String(status.statusId)}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="statusBg"
                  >
                    <div className="itemLstTask">
                      {status.lstTaskDeTail.map((task, index) => (
                        <Draggable
                          key={task.taskId}
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
