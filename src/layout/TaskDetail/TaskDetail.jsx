import { Avatar, Input, Modal, Select, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getCommentThunk,
  getPriorityThunk,
  getStatusThunk,
  getTaskTypeThunk,
  handleChangeColumn,
  handleChangePriorityValue,
  handleHideModal,
  postCommentThunk,
  updateCommentThunk,
  updatePriorityThunk,
} from "../../redux/slice/taskSlice";
import { useDispatch } from "react-redux";
import TypeIcon from "../../Components/ICON/TypeIcon";
import PriorityIcon from "../../Components/ICON/PriorityIcon";
import { getLocalStorage } from "../../utils/util";
import { updateStatusThunk } from "../../redux/slice/projectSlice";
import EditorCustom from "../../Components/EditorCustom/EditorCustom";
import InputCustom from "../../Components/Input/InputCustom";
import "./taskDetail.scss";

const TaskDetail = ({ projectId }) => {
  const userAvatar = getLocalStorage("user");
  const userToken = getLocalStorage("user").accessToken;
  const dispatch = useDispatch();

  // useState
  const [readOnly, setReadOnly] = useState(false);
  const [comment, setComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContentCmt, setEditContentCmt] = useState("");

  // data
  const taskDetail = useSelector((state) => state.taskSlice.taskDetail);
  const isModalOpen = useSelector((state) => state.taskSlice.showModal);
  const priorityList = useSelector((state) => state.taskSlice.priorityList);
  const statusList = useSelector((state) => state.taskSlice.statusList);
  const columns = useSelector((state) => state.taskSlice.column);
  const taskType = useSelector((state) => state.taskSlice.taskTypeList);
  const commentList = useSelector((state) => state.taskSlice.commentList);
  // console.log(commentList);

  useEffect(() => {
    dispatch(getCommentThunk(taskDetail.taskId));
    dispatch(getTaskTypeThunk());
    dispatch(getPriorityThunk());
    dispatch(getStatusThunk());
    dispatch(getTaskTypeThunk());
  }, [dispatch]);

  // handle
  const handlePriorityChange = (priorityId) => {
    dispatch(handleChangePriorityValue(priorityId));
    const data = {
      taskId: taskDetail.taskId,
      priorityId: priorityId,
    };

    dispatch(updatePriorityThunk({ value: data, token: userToken }));
  };

  const handleStatus = (newStatusId) => {
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
    console.log(e);
  };
  const handleRead = () => {
    setReadOnly(false);
  };
  const handleEdit = () => {
    setReadOnly(true);
  };
  const handleUpdateDescription = () => {};

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
    const value = encodeURIComponent(editContentCmt);
    dispatch(
      updateCommentThunk({
        id: commentItem.id,
        contentComment: value,
        token: userToken,
      })
    )
      .then((result) => {
        dispatch(getCommentThunk(taskDetail.taskId));
      })
      .catch((err) => {
        console.log("looix update roi", err);
      });
    console.log(commentItem);
  };
  console.log(comment);
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

  const values = {
    listUserAsign: taskDetail.assigness,
    taskId: taskDetail.taskId,
    taskName: taskDetail.taskName,
    description: taskDetail.description,
    statusId: taskDetail.statusId,
    originalEstimate: taskDetail.originalEstimate,
    timeTrackingSpent: taskDetail.timeTrackingSpent,
    timeTrackingRemaining: taskDetail.timeTrackingRemaining,
    projectId: projectId,
    typeId: taskDetail.typeId,
    priorityId: taskDetail.priorityId,
  };

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
        onCancel={() => dispatch(handleHideModal())}
        extra={""}
        footer={""}
      >
        <div className="flex">
          {/* PRIORITY */}
          <div className="w-1/2">
            {/*  */}
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
                    value={taskDetail.description}
                    onChange={handleChangeDescripttion}
                  />
                  <div>
                    <button onClick={handleRead}>Cancel</button>
                    <button onClick={handleRead}>Update</button>
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
                        <button className="text-red-700 mx-2">Delete</button>
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
          <div className="w-1/2">
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
        </div>
      </Modal>
    </div>
  );
};

export default TaskDetail;
