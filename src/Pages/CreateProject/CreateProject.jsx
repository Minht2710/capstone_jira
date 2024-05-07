import React, { useState, useEffect } from "react";
import { quanlyProject } from "../../services/quanLyProject/quanLyProject";
import { Button, ConfigProvider, Result, Select, message } from "antd";
import EditorCustom from "../../Components/EditorCustom/EditorCustom";
import "./createProject.scss";
import { SmileOutlined } from "@ant-design/icons";
// import Quill from "quill";

const CreateProject = () => {
  //danh sách category
  const [category, setCategory] = useState([]); // giá trị category
  const [projectName, setProjectName] = useState(""); // gia trị project name
  const [selectedValue, setSelectedValue] = useState(""); //gia trị select option
  const [content, setContent] = useState(""); //react-quil
  const [result, setResult] = useState(false);
  const [newProject, setNewProject] = useState([]); // thÔng tin project vừa tạo
  // console.log(category);
  // console.log(selectedValue);
  // data category
  useEffect(() => {
    quanlyProject
      .getProjectCategory()
      .then((res) => {
        setCategory(res.data.content);
      })
      .catch((err) => {});
  }, []);

  // nhận giá trị project name
  const projectNameValue = (e) => {
    setProjectName(e.target.value);
  };

  // nhận giá trị để tạo project
  // console.log(values);

  // quil
  const handleEditorChange = (newContent) => {
    // console.log(newContent);
    setContent(newContent);
  };
  // create table
  const handleCreateProject = () => {
    const values = {
      projectName: projectName,
      description: content,
      categoryId: selectedValue,
      alias: "string", // Bạn có thể điền alias theo yêu cầu của dự án
    };
    // console.log(values);
    quanlyProject
      .createNewProject(values)
      .then((res) => {
        console.log("Tạo dự án thành công:", res.data.content);
        setNewProject(res.data.content);
        setResult(true);
        // Xử lý sau khi tạo dự án thành côn
      })
      .catch((err) => {
        console.log("Lỗi khi tạo dự án:", err);
      });
  };

  // result control
  const handleResultClose = () => {
    setResult(false);
  };
  return (
    <>
      <div className="relative w-full h-full">
        {result ? (
          <Result
            className="resultSuccess"
            status="success"
            title="Project created successfully"
            subTitle={
              <span>
                Project {newProject.projectName} has been successfully created.
                Would you like to add members?
              </span>
            }
            extra={[
              <Button
                onClick={() => {
                  handleResultClose();
                }}
                type="primary"
                key="console"
              >
                Create Project
              </Button>,
              <Button key="buy">Add member to project </Button>,
            ]}
          />
        ) : (
          <div className="container mx-auto">
            <div className="titlePage">
              <h2
                className="capitalize text-2xl"
                style={{ color: "#253858", fontWeight: "600" }}
              >
                Create project
              </h2>
            </div>
            <div className="formInputCreate">
              <div className="flex flex-col">
                <label
                  htmlFor="projectName"
                  className="labelProjectName font-bold mt-5 mb-2"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  onChange={projectNameValue}
                  className="inputProjectName"
                />
              </div>

              {/* editorHTML form */}
              <div className="my-10">
                <EditorCustom
                  value={content}
                  onChange={handleEditorChange}
                  label="Description"
                  className={"createPJForm"}
                />
              </div>

              {/* select  */}
              <div>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        optionActiveBg: "rgb(0, 255, 255)",
                        multipleItemBorderColor: "rgb(0, 255, 255)",
                      },
                    },
                    token: {
                      colorPrimaryHoverL: "red",
                    },
                  }}
                >
                  <label htmlFor="category" className="label font-bold mb-5">
                    Category
                  </label>
                  <Select
                    id="category"
                    className="selectCategory"
                    style={{
                      width: "100%",
                    }}
                    placeholder={"Category"}
                    size="large"
                    value={selectedValue}
                    onChange={setSelectedValue}
                    options={category.map((item) => ({
                      label: item.projectCategoryName,
                      value: item.id,
                    }))}
                  />
                </ConfigProvider>
              </div>
              <div className="mt-10">
                <button className="btnCreatefnt bg-red-500 text-white font-bold">
                  Cancel
                </button>
                <button
                  onClick={() => handleCreateProject()}
                  className="btnCreatefnt bg-green-500 hover:bg-blue-600 transition-all duration-500"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default CreateProject;
