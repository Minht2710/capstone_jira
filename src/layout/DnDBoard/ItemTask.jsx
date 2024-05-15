import { Avatar, Select, Tooltip } from "antd";
import React, { useState } from "react";
import "./itemTask.scss";
import {
  updateStatusThunk,
  getProjectDetailThunk,
} from "../../redux/slice/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import PriorityIcon from "../../Components/priorityIcon/PriorityIcon";

const ItemTask = ({ task, projectId, tokenAccess, columns, setColumns }) => {
  console.log(task);

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const statusList = useSelector((state) => state.taskSlice.statusList);
  const priorityList = useSelector((state) => state.taskSlice.priorityList);
  const [priorityValue, setPriorityValue] = useState(
    task.priorityTask.priorityId
  );
  // const []

  console.log(priorityList);

  const handleShowModal = () => {
    setIsModalOpen(true);
  };
  const handleHideModal = () => {
    setIsModalOpen(false);
  };
  const handleStatus = (newStatusId) => {
    const updatedColumns = columns.map((column) => {
      if (column.statusId === task.statusId) {
        return {
          ...column,
          lstTaskDeTail: column.lstTaskDeTail.filter(
            (item) => item.taskId !== task.taskId
          ),
        };
      } else if (column.statusId === newStatusId) {
        return {
          ...column,
          lstTaskDeTail: [
            ...column.lstTaskDeTail,
            { ...task, statusId: newStatusId },
          ],
        };
      } else {
        return column;
      }
    });

    setColumns(updatedColumns);

    const value = {
      taskId: task.taskId,
      statusId: newStatusId,
    };
    dispatch(updateStatusThunk({ data: value, token: tokenAccess }))
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePriorityChange = (value) => {
    setPriorityValue(value);
  };
  console.log(priorityValue);

  return (
    <>
      <div
        className="itemTask p-2 mt-3 rounded-md"
        onClick={() => handleShowModal()}
      >
        <div className="">
          <h3 className="">{task.taskName}</h3>
        </div>
        <div className="flex justify-between mt-4 items-center">
          <Avatar.Group maxCount={2}>
            {task.assigness.map((member) => (
              <Tooltip placement="top" title={member.name} key={member.id}>
                <Avatar src={member.avatar} />
              </Tooltip>
            ))}
          </Avatar.Group>
          {/* priority */}
          <div className="flex text-xs">
            <p>
              {(task.taskTypeDetail.id === 1 && (
                <i class="fa-sharp fa-solid fa-bug text-red-500"></i>
              )) ||
                (task.taskTypeDetail.id === 2 && (
                  <i class="fa-sharp fa-solid fa-sparkles text-blue-500"></i>
                ))}
            </p>
            <p>
              <PriorityIcon priorityId={priorityValue} />
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="custom-modal">
          <div
            className={`custom-modal-content ${
              isModalOpen ? "fade-in" : "fade-out"
            }`}
          >
            <div className="flex justify-between mb-5 px-1">
              <div className="flex items-end">
                <h4 className="uppercase font-bold mr-2 text-2xl">
                  {task.taskName}
                </h4>
                <small className="capitalize font-bold text-xs">
                  {(task.taskTypeDetail.id === 1 && (
                    <i class="fa-sharp fa-solid fa-bug text-red-500"></i>
                  )) ||
                    (task.taskTypeDetail.id === 2 && (
                      <i class="fa-sharp fa-solid fa-sparkles text-blue-500"></i>
                    ))}
                  {task.taskTypeDetail.taskType}
                </small>
              </div>
              <div>
                <span></span>
                <span
                  className="custom-modal-close"
                  onClick={() => handleHideModal()}
                >
                  <i class="fa-sharp fa-regular fa-xmark"></i>
                </span>
              </div>
            </div>

            {/*  */}
            <div className="flex">
              {/* left */}
              <div className="w-1/2 px-2 flex">
                {/* priority */}
                <div className="selectorStatusTask px-2 w-1/2">
                  <Select
                    className="selectPriorityId"
                    onChange={handlePriorityChange}
                    defaultValue={task.priorityTask.priority}
                    style={{ width: "100%", height: "40px" }}
                    options={priorityList.map((priority) => ({
                      value: priority.priorityId,
                      label: (
                        <p>
                          <PriorityIcon priorityId={priority.priorityId} />
                          {priority.description}
                        </p>
                      ),
                    }))}
                  />
                </div>

                {/* bug or newtask */}
                <div className="selectorStatusTask px-2 w-1/2">
                  <Select
                    className="selectStatusId"
                    defaultValue={task.priorityTask.priority}
                    style={{ width: "100%", height: "40px" }}
                    options={priorityList.map((priority) => ({
                      value: priority.priorityId,
                      label: <p>{priority.description}</p>,
                    }))}
                  />
                </div>
              </div>
              {/* right */}
              <div className="w-1/2 px-2">
                <div className="selectorStatusTaskpx-2">
                  <Select
                    className="selectStatusId"
                    defaultValue={task.statusId}
                    style={{ width: "100%", height: "40px" }}
                    onChange={handleStatus}
                    options={statusList.map((status) => ({
                      value: status.statusId,
                      label: status.statusName,
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemTask;
