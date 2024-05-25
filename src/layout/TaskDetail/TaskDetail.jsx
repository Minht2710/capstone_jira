import {
  Avatar,
  Input,
  Modal,
  Popconfirm,
  Select,
  message,
  Collapse,
  Slider,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteCommentThunk,
  getCommentThunk,
  getPriorityThunk,
  getStatusThunk,
  getTaskTypeThunk,
  handleChangeColumn,
  handleChangePriorityValue,
  handleHideModal,
  postCommentThunk,
  removeTaskThunk,
  updatePriorityThunk,
  updateTaskThunk,
} from "../../redux/slice/taskSlice";
import { useDispatch } from "react-redux";
import TypeIcon from "../../Components/ICON/TypeIcon";
import PriorityIcon from "../../Components/ICON/PriorityIcon";
import { getLocalStorage } from "../../utils/util";
import {
  getProjectDetailThunk,
  updateStatusThunk,
} from "../../redux/slice/projectSlice";
import EditorCustom from "../../Components/EditorCustom/EditorCustom";
import "./taskDetail.scss";
import axios from "axios";
import InputCustom from "../../Components/Input/InputCustom";

const TaskDetail = ({ projectDetail }) => {
  const userAvatar = getLocalStorage("user");
  const userToken = getLocalStorage("user").accessToken;
  const dispatch = useDispatch();

  // data
  const taskDetail = useSelector((state) => state.taskSlice.taskDetail);
  const isModalOpen = useSelector((state) => state.taskSlice.showModal);
  const priorityList = useSelector((state) => state.taskSlice.priorityList);
  const statusList = useSelector((state) => state.taskSlice.statusList);
  const columns = useSelector((state) => state.taskSlice.column);
  const taskType = useSelector((state) => state.taskSlice.taskTypeList);
  const commentList = useSelector((state) => state.taskSlice.commentList);
  const priorityValue = useSelector((state) => state.taskSlice.priorityValue);

  // console.log("taskDetail: ", taskDetail);

  useEffect(() => {
    dispatch(getCommentThunk(taskDetail.taskId));
    dispatch(getTaskTypeThunk());
    dispatch(getPriorityThunk());
    dispatch(getStatusThunk());
    dispatch(getTaskTypeThunk());
    dispatch(handleChangePriorityValue(taskDetail.priorityTask.priorityId));
    setDescriptionContent(taskDetail.description);
  }, [dispatch]);

  // useState
  const [collapse, setCollapse] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [descriptionContent, setDescriptionContent] = useState("");
  const [comment, setComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContentCmt, setEditContentCmt] = useState(null);
  const [lstAssigness, setLstAssigness] = useState([]);
  const [estimateTime, setEstimateTime] = useState(taskDetail.originalEstimate);
  const [spentTime, setSpentTime] = useState(taskDetail?.timeTrackingSpent);
  const [typeTask, setTypeTask] = useState(taskDetail.taskTypeDetail.id);
  const [taskStatusId, setTaskStatusId] = useState(taskDetail.statusId);

  // handle
  const handlePriorityChange = (priorityId) => {
    dispatch(handleChangePriorityValue(priorityId));
    // console.log(priorityId);
  };

  const handleStatus = (newStatusId) => {
    setTaskStatusId(newStatusId);
    const updatedColumns = columns.map((column) => {
      if (column.statusId === taskDetail.statusId) {
        // Loại bỏ task khỏi danh sách cũ của trạng thái cũ
        const updatedTasks = column.lstTaskDeTail.filter(
          (item) => item.taskId !== taskDetail.taskId
        );

        return {
          ...column,
          lstTaskDeTail: updatedTasks,
        };
      } else if (column.statusId === newStatusId) {
        // Thêm task vào danh sách mới của trạng thái mới
        return {
          ...column,
          lstTaskDeTail: [
            ...column.lstTaskDeTail,
            { ...taskDetail, statusId: newStatusId },
          ],
        };
      } else {
        return column;
      }
    });

    // Cập nhật lại danh sách columns sau khi thay đổi trạng thái
    dispatch(handleChangeColumn(updatedColumns));

    const value = {
      taskId: taskDetail.taskId,
      statusId: newStatusId,
    };

    dispatch(updateStatusThunk({ data: value, token: userToken }));
  };

  // description
  const handleChangeDescripttion = (e) => {
    setDescriptionContent(e);
  };
  // console.log("description content", descriptionContent);

  const handleRead = () => {
    setReadOnly(false);
  };
  const handleEdit = () => {
    setReadOnly(true);
  };
  const handleUpdateDescription = (infoDescription) => {
    console.log("description info", infoDescription.taskId);
    const valueUpdate = {
      taskId: infoDescription.taskId,
      description: descriptionContent,
    };
    axios({
      url: "https://jiranew.cybersoft.edu.vn/api/Project/updateDescription",
      method: "PUT",
      data: valueUpdate,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        message.success("Update complete", 1.5);
      })
      .catch((err) => {
        console.log(err);
        message.error("Update failed", 1.5);
      });
  };

  // comment

  const handleEditComment = (commentId) => {
    setEditCommentId(commentId);
  };
  const handleReadComment = () => {
    setEditCommentId(null);
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };
  const handleUpdateComment = (commentItem) => {
    // console.log(commentItem.id);

    const value = encodeURIComponent(editContentCmt);
    axios({
      url: `https://jiranew.cybersoft.edu.vn/api/Comment/updateComment?id=${commentItem.id}&contentComment=${value}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((result) => {
        handleReadComment();
        dispatch(getCommentThunk(taskDetail.taskId));
      })
      .catch((err) => {
        setTimeout(message.error("lỗi comment"), 1000);
        console.log("bug comment", err);
      });
  };
  // console.log(comment);
  const handlePostComment = () => {
    const values = {
      taskId: taskDetail.taskId,
      contentComment: comment,
    };
    dispatch(postCommentThunk({ data: values, token: userToken }))
      .then((res) => {
        dispatch(getCommentThunk(taskDetail.taskId));
        setComment("");
      })
      .catch((err) => {});
  };

  const confirm = (commentId) => {
    // console.log(commentId);
    dispatch(deleteCommentThunk({ idComment: commentId, token: userToken }))
      .then((result) => {
        dispatch(getCommentThunk(taskDetail.taskId));
      })
      .catch((err) => {});
  };
  const cancel = () => {};

  //assigness
  const handleToggleCollapse = () => {
    setCollapse(!collapse);
  };
  // console.log(projectDetail);
  const timeTrackingRemaining = parseInt(estimateTime - spentTime);
  // ---------------------------------------------------------------------------------------------
  // update task
  const valuesTask = {
    listUserAsign: lstAssigness,
    taskId: taskDetail.taskId,
    taskName: taskDetail.taskName,
    description: descriptionContent,
    statusId: taskStatusId,
    originalEstimate: estimateTime,
    timeTrackingSpent: spentTime,
    timeTrackingRemaining: timeTrackingRemaining,
    projectId: taskDetail.projectId,
    typeId: typeTask,
    priorityId: String(priorityValue),
  };
  // console.log(valuesTask);
  const handleChangeAssigness = (member) => {
    setLstAssigness(member);
  };

  useEffect(() => {
    setLstAssigness(taskDetail.assigness.map((assignee) => assignee.id));
  }, [taskDetail]);

  const handleChangeEstimate = (e) => {
    // console.log("estimate", e.target.value);
    setEstimateTime(e.target.value);
  };
  const handleChangeSpentTime = (e) => {
    // console.log("spent time", e.target.value);
    setSpentTime(e.target.value);
  };
  const handleSliderOnChange = (value) => {
    setSpentTime(value);
  };

  const handleChangeType = (value) => {
    // console.log(value);
    setTypeTask(value);
  };
  const onCancel = () => {
    dispatch(updateTaskThunk({ data: valuesTask, token: userToken }))
      .then((result) => {
        dispatch(handleHideModal());
        dispatch(
          getProjectDetailThunk({
            projectid: projectDetail.id,
            token: userToken,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteTask = () => {
    dispatch(removeTaskThunk({ taskId: taskDetail.taskId, token: userToken }))
      .then((result) => {
        dispatch(handleHideModal());
        dispatch(
          getProjectDetailThunk({
            projectid: projectDetail.id,
            token: userToken,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(taskDetail);

  return (
    <div>
      <Modal
        title={
          <div className="flex items-end">
            <h4 className="text-3xl mr-2">{taskDetail.taskName}</h4>

            <small className="uppercase">
              <Select
                style={{ width: 125, border: "none", outline: "none" }}
                removeIcon="false"
                defaultValue={taskDetail.taskTypeDetail.id}
                onChange={handleChangeType}
                options={taskType.map((taskTypeItem) => ({
                  value: taskTypeItem.id,
                  label: (
                    <p>
                      <TypeIcon id={taskTypeItem.id} className={"mr-2"} />
                      <small className="text-sm font-semibold capitalize">
                        {taskTypeItem.taskType}
                      </small>
                    </p>
                  ),
                }))}
              />
            </small>
          </div>
        }
        width={1000}
        className="modalContent"
        open={isModalOpen}
        onCancel={onCancel}
        // extra={""}
        footer={""}
      >
        <div className="taskContent">
          <div className="taskItemContent">
            {/* PRIORITY */}
            <div>
              <Select
                style={{
                  width: "100%",
                }}
                onChange={(value) => handlePriorityChange(value)}
                defaultValue={taskDetail.priorityTask.priorityId}
                options={priorityList.map((priorityItem) => ({
                  value: priorityItem.priorityId,
                  label: (
                    <p className="uppercase">
                      <PriorityIcon priorityId={priorityItem.priorityId} />
                      {priorityItem.priority}
                    </p>
                  ),
                }))}
              />
            </div>

            {/* description */}
            <div className="my-5">
              {readOnly ? (
                <div>
                  <EditorCustom
                    value={descriptionContent}
                    onChange={handleChangeDescripttion}
                  />
                  <div className="text-end font-semibold my-2">
                    <button
                      className="mx-2 text-orange-600"
                      onClick={handleRead}
                    >
                      Cancel
                    </button>
                    <button
                      className="mx-2 text-blue-700"
                      onClick={() => handleUpdateDescription(taskDetail)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="font-bold">Description</span>
                  <div className="" onClick={handleEdit}>
                    <div
                      className="descriptionContent"
                      dangerouslySetInnerHTML={{
                        __html: taskDetail.description,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* comment */}
            <div>
              <span className="font-bold">Comment:</span>
              <div>
                <div className="flex">
                  <Avatar
                    src={userAvatar.avatar}
                    className="translate-y-2 mr-2"
                    size={"large"}
                  />
                  <Input.TextArea
                    placeholder="Your comment ... "
                    className="mt-2"
                    value={comment}
                    onChange={handleChangeComment}
                  />
                </div>
                <div className="text-end">
                  <button
                    className="px-5 py-2 mt-2 mr-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700 transition-all duration-500"
                    onClick={handlePostComment}
                  >
                    <i class="fa-solid fa-paper-plane-top"></i>
                  </button>
                </div>
              </div>

              {/* list comment  */}
              <div>
                {commentList.map((commentItem) => (
                  <div className="commentItem my-10" key={commentItem.id}>
                    <div className="flex  min-h-20 w-full">
                      <div className="mr-2">
                        <Avatar src={commentItem.user.avatar} size={"large"} />
                      </div>
                      {editCommentId === commentItem.id ? (
                        <Input.TextArea
                          defaultValue={commentItem.contentComment}
                          onChange={(e) => setEditContentCmt(e.target.value)}
                        />
                      ) : (
                        <div className="commentContent">
                          <p>{commentItem.contentComment}</p>
                        </div>
                      )}
                    </div>
                    <div className="text-right font-semibold">
                      {/* button left */}
                      {editCommentId === commentItem.id ? (
                        <button
                          className="text-red-700 mx-2"
                          onClick={handleReadComment}
                        >
                          Cancel
                        </button>
                      ) : (
                        <Popconfirm
                          title="Delete the comment"
                          description="Are your to Delete this comment?"
                          onConfirm={() => confirm(commentItem.id)}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <button className="text-red-700 mx-2">Delete</button>
                        </Popconfirm>
                      )}

                      {/* button right */}
                      {editCommentId === commentItem.id ? (
                        <button
                          className="text-blue-700 mx-2"
                          onClick={() => handleUpdateComment(commentItem)}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          className="text-blue-700 mx-2 "
                          onClick={() => handleEditComment(commentItem.id)}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* update STATUS*/}
          <div className="taskItemContent">
            {/* status */}
            <div>
              <Select
                onChange={handleStatus}
                style={{ width: "100%" }}
                defaultValue={taskDetail.statusId}
                options={statusList.map((statusItem) => ({
                  value: statusItem.statusId,
                  label: statusItem.statusName,
                }))}
              />
            </div>

            {/* ASSIGNER */}
            <div>
              <div className="mt-5">
                <button
                  onClick={handleToggleCollapse}
                  className="font-bold capitalize"
                >
                  assigner
                </button>
              </div>
              <div className="w-full">
                <Select
                  mode="multiple"
                  onChange={handleChangeAssigness}
                  style={{ width: "100%" }}
                  defaultValue={taskDetail.assigness.map((member) => member.id)}
                  options={projectDetail.members?.map((member) => ({
                    value: member.userId,
                    label: member.name,
                  }))}
                />
              </div>
            </div>

            {/* time */}
            <div>
              <div className="mt-5">
                <span className="font-bold">Time </span>
                <Slider
                  defaultValue={spentTime}
                  value={spentTime}
                  max={estimateTime}
                  onChange={handleSliderOnChange}
                />
              </div>
              <div>
                <InputCustom
                  min={0}
                  value={estimateTime}
                  onChange={handleChangeEstimate}
                  label={"Time Original Estimate:"}
                  type="number"
                />
              </div>
              <div>
                <InputCustom
                  min={0}
                  max={estimateTime}
                  value={spentTime}
                  onChange={handleChangeSpentTime}
                  label={"Time Tracking Spent :"}
                  type="number"
                />
              </div>
              <div className="btnRemoveTask">
                {/* button delete task  */}
                <button className="btnDeleteTask" onClick={handleDeleteTask}>
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskDetail;
