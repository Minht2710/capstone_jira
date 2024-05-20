import { Avatar, Tooltip } from "antd";
import React, { useEffect } from "react";
import "./itemTask.scss";

import { useDispatch, useSelector } from "react-redux";
import PriorityIcon from "../../Components/ICON/PriorityIcon";
import { getPriorityThunk, handleShowModal } from "../../redux/slice/taskSlice";

const ItemTask = ({ task }) => {
  const dispatch = useDispatch();
  const priorityValue = useSelector((state) => state.taskSlice.priorityValue);
  useEffect(() => {
    dispatch(getPriorityThunk());
  }, [dispatch]);
  return (
    <>
      <div
        className="itemTask p-2 mt-3 rounded-md"
        onClick={() => dispatch(handleShowModal(task))}
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
          <div className="flex items-center text-xs">
            <p className="mr-1">
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
    </>
  );
};

export default ItemTask;
