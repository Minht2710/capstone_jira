import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryThunk,
  getAllProjectThunk,
  getProjectDetailThunk,
  handleCloseProjectDetail,
  updateProjectThunk,
} from "../../redux/slice/projectSlice";
import { Modal, Select, Tooltip } from "antd";
import InputCustom from "../../Components/Input/InputCustom";
import EditorCustom from "../../Components/EditorCustom/EditorCustom";
import { useFormik } from "formik";
import { getLocalStorage } from "../../utils/util";
import { useNavigate } from "react-router-dom";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getLocalStorage("user");

  const [openDetail, setOpenDetail] = useState(false);
  const projectDetail = useSelector(
    (state) => state.projectSlice.projectDetail
  );
  const category = useSelector((state) => state.projectSlice.category);
  const showModal = useSelector(
    (state) => state.projectSlice.openProjectDetail
  );
  // toggle detail
  const toggleDetail = () => {
    setOpenDetail(!openDetail);
  };
  const handleCloseDrawer = () => {
    dispatch(handleCloseProjectDetail());
  };
  useEffect(() => {
    dispatch(getCategoryThunk());
  }, [dispatch]);

  // formik setup
  const {
    handleBlur,
    handleSubmit,
    handleChange,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      id: projectDetail?.id,
      projectName: projectDetail?.projectName,
      creator: projectDetail?.creator?.id,
      description: projectDetail?.description,
      categoryId: projectDetail?.projectCategory?.id.toString(),
    },
    onSubmit: (values) => {
      dispatch(
        updateProjectThunk({
          projectId: projectDetail?.id,
          data: values,
          token: user.accessToken,
        })
      )
        .then((result) => {
          handleCloseDrawer();
          dispatch(getAllProjectThunk());
        })
        .catch((err) => {});
    },
  });

  useEffect(() => {
    if (projectDetail) {
      setFieldValue("creator", projectDetail.creator.id);
      setFieldValue("projectName", projectDetail.projectName);
      setFieldValue("categoryId", projectDetail.projectCategory?.id.toString());
      setFieldValue("description", projectDetail.description);
      setFieldValue("id", projectDetail.id);
    }
  }, [projectDetail, setFieldValue]);
  return (
    <div>
      <Modal
        title={
          <span className="text-2xl text-blue-500 uppercase font-bold">
            {projectDetail?.projectName || ""}
          </span>
        }
        open={showModal}
        onCancel={handleCloseDrawer}
        className="projectDetail"
        footer={
          openDetail ? (
            <div>
              <button>Cancel</button>
              <button>Oke</button>
            </div>
          ) : (
            []
          )
        }
      >
        {/* <Tooltip title="Edit" placement="top">
          <button onClick={() => toggleDetail()} className="text-2xl">
            <i className="fa-sharp fa-solid fa-pen-to-square"></i>
          </button>
        </Tooltip> */}
        <form onSubmit={handleSubmit}>
          <InputCustom
            label="Project Name"
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.projectName}
            value={values.projectName}
            name="projectName"
          />
          <InputCustom
            readOnly={true}
            label="Project Id"
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.id}
            value={values.id}
            name="id"
          />
          <div className="flex justify-around">
            <div>
              <span className="font-bold">Creator Name:</span>
              <p className="inline ml-2">
                {projectDetail?.creator?.name || ""}
              </p>
            </div>
            <div>
              <span className="font-bold">Creator ID:</span>
              <p className="inline ml-2">{projectDetail?.creator?.id || ""}</p>
            </div>
          </div>
          <Select
            id="categoryId"
            className="selectCategory"
            style={{ width: "100%" }}
            placeholder="Category"
            size="large"
            value={values.categoryId}
            onChange={(value) => setFieldValue("categoryId", value)}
            name="categoryId"
          >
            {category.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.projectCategoryName}
              </Select.Option>
            ))}
          </Select>

          <EditorCustom
            value={values.description}
            onChange={handleChange}
            modules={module}
            name="description"
          />
          <div className="mt-2 text-right">
            <button
              className="mr-2 border-solid border-2 border-blue-500 py-2 px-5 rounded-md transition-all duration-500 text-blue-500 hover:bg-blue-700 hover:text-white font-semibold"
              onClick={() =>
                navigate(`/ProjectBoardDetail/${projectDetail.id}`)
              }
            >
              Task Manager
            </button>
            <button
              type="submit"
              className="border-solid border-2 border-blue-500 bg-blue-500 py-2 px-5 rounded-md font-bold text-white hover:bg-blue-800 transition-all duration-500"
            >
              Edit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectDetail;
