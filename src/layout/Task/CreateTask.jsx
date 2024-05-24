import { Button, Drawer, Select, Slider, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreateTaskThunk,
  getPriorityThunk,
  getStatusThunk,
  getTaskTypeThunk,
  handleCloseCreateTask,
  // handleOpenCreateTask,
} from "../../redux/slice/taskSlice";
import { getUserThunk } from "../../redux/slice/userSlice";
import { getLocalStorage } from "../../utils/util";
import { useFormik } from "formik";
import InputCustom from "../../Components/Input/InputCustom";
import EditorCustom from "../../Components/EditorCustom/EditorCustom";
import * as Yup from "yup";
import "./createTask.scss";
import { getProjectDetailThunk } from "../../redux/slice/projectSlice";

const CreateTask = () => {
  const user = getLocalStorage("user");
  // console.log(user.accessToken);

  const [assignMember, setAsssignMember] = useState([]);
  // console.log(assignMember);
  const dispatch = useDispatch();
  const openTask = useSelector((state) => state.taskSlice.openCreateTask);
  const projectList = useSelector((state) => state.projectSlice.allProject);
  const statusList = useSelector((state) => state.taskSlice.statusList);
  const priorityList = useSelector((state) => state.taskSlice.priorityList);
  const taskTypeList = useSelector((state) => state.taskSlice.taskTypeList);
  // const creatask =

  const projectFilterByUser = projectList.filter(
    (project) => project?.creator?.id === user.id
  );
  // console.log(projectFilterByUser.members);

  const onClose = () => {
    dispatch(handleCloseCreateTask());
  };

  useEffect(() => {
    dispatch(getUserThunk(user.accessToken));
    dispatch(getStatusThunk());
    dispatch(getPriorityThunk());
    dispatch(getTaskTypeThunk());
  }, [dispatch]);

  // const onChange = (e) => {};
  const onSearch = (value) => {};
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // fomik and Yub
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    id,
    className,
    values,
    errors,
    name,
    setFieldValue,
  } = useFormik({
    initialValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: "",
      originalEstimate: null,
      timeTrackingSpent: null,
      timeTrackingRemaining: null,
      projectId: null,
      typeId: null,
      priorityId: null,
    },
    validationSchema: Yup.object({
      originalEstimate: Yup.number()
        .min(0, "Original Estimate must be greater than or equal to 0")
        .required("Original Estimate is required"),
      timeTrackingSpent: Yup.number()
        .min(0, "Time Spent must be greater than or equal to 0")
        .max(
          Yup.ref("originalEstimate"),
          "Time Spent cannot exceed Original Estimate"
        ),
    }),
    onSubmit: (values) => {
      dispatch(getCreateTaskThunk({ values: values, token: user.accessToken }))
        .then((result) => {
          dispatch(handleCloseCreateTask());
          dispatch(
            getProjectDetailThunk({
              projectid: values.projectId,
              token: user.accessToken,
            })
          );
        })
        .catch((err) => {});
    },
  });

  return (
    <div>
      <Drawer
        title="Create Task"
        width={500}
        onClose={onClose}
        open={openTask}
        className="createTask"
      >
        <form onSubmit={handleSubmit}>
          {/* project name */}
          <div className="flex flex-col mb-5">
            <label htmlFor="projectSelect" className="font-bold mb-2">
              Project Name
            </label>
            <Select
              id="projectSelect"
              className="projectSelect"
              showSearch
              placeholder="Select your project"
              optionFilterProp="children"
              value={values.projectId}
              onChange={(value) => {
                const selectedProject = projectFilterByUser.find(
                  (project) => project.id === value
                );
                if (selectedProject) {
                  setAsssignMember(selectedProject.members);
                  setFieldValue("projectId", value);
                }
              }}
              onSearch={onSearch}
              filterOption={filterOption}
              options={projectFilterByUser.map((project) => ({
                value: project.id,
                label: project.projectName,
              }))}
            />
          </div>

          {/* task Name */}
          <div>
            <InputCustom
              label={<span className="font-bold">Task Name</span>}
              value={values.taskName}
              onChange={(e) => handleChange(e)}
              onBlur={handleBlur}
              touched={touched.taskName}
              id={"taskName"}
              name={"taskName"}
            />
          </div>

          {/* group */}
          <div className="flex justify-between">
            {/* status list  */}
            <div className="statusList flex flex-col mb-5 w-4/12">
              <label htmlFor="projectSelect" className="font-bold mb-2">
                Status
              </label>
              <Select
                // placeholder
                id="projectSelect"
                className="projectSelect"
                showSearch
                optionFilterProp="children"
                value={values.statusId}
                onChange={(value) => {
                  if (value !== values.statusId) {
                    setFieldValue("statusId", value);
                  }
                }}
                onSearch={onSearch}
                filterOption={filterOption}
                options={statusList.map((statusItem) => ({
                  value: statusItem.statusId,
                  label: statusItem.statusName,
                }))}
              />
            </div>

            {/* Priority */}
            <div className="priorityList flex flex-col mb-5 w-3/12">
              <label htmlFor="projectSelect" className="font-bold mb-2">
                Priority
              </label>
              <Select
                // placeholder
                id="projectSelect"
                className="projectSelect"
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                value={values.priorityId}
                onChange={(value) => {
                  if (value !== values.priorityId) {
                    console.log(value);
                    setFieldValue("priorityId", value);
                  }
                }}
                onSearch={onSearch}
                filterOption={filterOption}
                options={priorityList.map((priorityItem) => ({
                  value: priorityItem.priorityId,
                  label: (
                    <p>
                      {(priorityItem.priorityId === 1 && (
                        <i class="fa-regular fa-angles-up text-red-500"></i>
                      )) ||
                        (priorityItem.priorityId === 2 && (
                          <i class=" fa-sharp fa-regular fa-equals text-orange-500"></i>
                        )) ||
                        (priorityItem.priorityId === 3 && (
                          <i class="fa-regular fa-angle-down text-green-500"></i>
                        )) ||
                        (priorityItem.priorityId === 4 && (
                          <i class="fa-regular fa-angles-down text-blue-500"></i>
                        ))}{" "}
                      {priorityItem.priority}
                    </p>
                  ),
                }))}
              />
            </div>

            {/* taskType  */}
            <div className="taskTypeList flex flex-col mb-5 w-3/12">
              <label htmlFor="projectSelect" className="font-bold mb-2">
                Type
              </label>
              <Select
                id="projectSelect"
                className="projectSelect"
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                value={values.typeId}
                onChange={(value) => {
                  if (value !== values.typeId) {
                    console.log(value);
                    setFieldValue("typeId", value);
                  }
                }}
                name={"projectSelect"}
                onSearch={onSearch}
                filterOption={filterOption}
                options={taskTypeList.map((taskType) => ({
                  value: taskType.id,
                  label: (
                    <p className="capitalize font-bold">
                      {(taskType.id === 1 && (
                        <i class="fa-sharp fa-solid fa-bug mr-2 text-red-500"></i>
                      )) ||
                        (taskType.id === 2 && (
                          <i class="fa-sharp fa-solid fa-diagram-subtask mr-2 text-green-500"></i>
                        ))}
                      {taskType.taskType}
                    </p>
                  ),
                }))}
              />
            </div>
          </div>

          {/* assign member*/}
          <div className="flex flex-col mb-5">
            <label htmlFor="assignMember" className="font-bold">
              Assign Member
            </label>
            <Select
              // placeholder
              mode="multiple"
              id="assignMember"
              className="assignMember"
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              value={values.listUserAsign}
              onChange={(value) => {
                if (value !== values.listUserAsign) {
                  setFieldValue("listUserAsign", value);
                }
              }}
              onSearch={onSearch}
              filterOption={filterOption}
              options={assignMember?.map((member) => ({
                value: member.userId,
                label: member.name,
              }))}
            />
          </div>

          {/* original Estimate */}
          <div className="flex justify-between">
            {/* time spent  */}
            <div className="flex flex-col mb-5 w-5/12">
              <InputCustom
                label={
                  <span className="font-bold capitalize">
                    original Estimate
                  </span>
                }
                value={values.originalEstimate}
                onChange={(e) => {
                  handleChange(e);
                }}
                error={errors.originalEstimate}
                onBlur={handleBlur}
                touched={touched.originalEstimate}
                type={"number"}
                id={"originalEstimate"}
                name={"originalEstimate"}
                min={"0"}
              />
            </div>

            {/* time Tracking Spent */}
            <div className="flex flex-col mb-5 w-5/12">
              <InputCustom
                label={<span className="font-bold capitalize">Time Spent</span>}
                value={values.timeTrackingSpent}
                onChange={(e) => {
                  handleChange(e);
                }}
                error={errors.timeTrackingSpent}
                onBlur={handleBlur}
                touched={touched.timeTrackingSpent}
                type={"number"}
                id={"timeTrackingSpent"}
                name={"timeTrackingSpent"}
                max={values.originalEstimate}
                min={"0"}
              />
            </div>
          </div>

          {/* slider */}
          <div>
            <Slider
              value={values.timeTrackingSpent}
              onChange={(value) => setFieldValue("timeTrackingSpent", value)}
              max={values.originalEstimate}
            />
            <div className="flex justify-between">
              <small className="font-bold capitalize">
                {values.timeTrackingSpent} Time Spent
              </small>
              <small className="font-bold capitalize">
                {
                  (values.timeTrackingRemaining =
                    values.originalEstimate - values.timeTrackingSpent)
                }
                Time Remaining
              </small>
            </div>
          </div>

          {/* description */}
          <div>
            <EditorCustom
              value={values.description}
              id={"description"}
              name="description"
              label={"Description"}
              onChange={(e) => {
                if (e !== values.description) {
                  setFieldValue("description", e);
                }
              }}
              touched={touched.description}
              // onBlur={handleBlur}
            />
          </div>

          <div className="w-full text-center mt-5">
            <button
              className="w-full py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-950 transition-all duration-500 font-semibold"
              type="submit"
            >
              Create task
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default CreateTask;
