import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryThunk,
  getProjectDetailThunk,
  handleCloseProjectDetail,
} from "../../redux/slice/projectSlice";
import { Modal, Select, Tooltip } from "antd";
import InputCustom from "../../Components/Input/InputCustom";
import EditorCustom from "../../Components/EditorCustom/EditorCustom";
import { useFormik } from "formik";

const ProjectDetail = () => {
  const dispatch = useDispatch();
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
      id: "",
      projectName: "",
      creator: "",
      description: "",
      categoryId: "",
    },
    onSubmit: (values) => {},
  });

  useEffect(() => {
    if (projectDetail) {
      setFieldValue("creator", projectDetail.creator);
      setFieldValue("projectName", projectDetail.projectName);
      setFieldValue("categoryId", projectDetail.projectCategory?.id);
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
        <Tooltip title="Edit" placement="top">
          <button onClick={() => toggleDetail()} className="text-2xl">
            <i className="fa-sharp fa-solid fa-pen-to-square"></i>
          </button>
        </Tooltip>
        {openDetail ? (
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
                <p className="inline ml-2">
                  {projectDetail?.creator?.id || ""}
                </p>
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
            <div>
              <button type="submit" className="bg-blue-400">
                Edit
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="flex justify-between">
              <span>Project Name:</span>
              <p className="inline font-bold">
                {projectDetail?.projectName || ""}
              </p>
            </div>
            <div className="flex justify-between">
              <span>Project ID:</span>
              <p className="inline font-bold">{projectDetail?.id || ""}</p>
            </div>
            <div>
              <span>List Task</span>
              {projectDetail?.lstTask?.map((item) => (
                <p key={item.id}>{item.lstTaskDeTail.taskname}</p>
              ))}
            </div>
            <div className="overflow-auto">
              <label htmlFor="dcript">Description</label>
              <div id="dcript">{projectDetail?.description || ""}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProjectDetail;
