import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editorCustom.scss";

const EditorCustom = ({
  id,
  value,
  onChange,
  label,
  className,
  name,
  readOnly,
  // onBlur,
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ indent: "-1" }, { indent: "+1" }],
      // [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      // ["clean"],
    ],
  };
  return (
    <div className="">
      <label htmlFor={id} className="" style={{ fontWeight: "700" }}>
        {label}
      </label>
      <ReactQuill
        id={id}
        themes="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className={className}
        name={name}
        // onBlur={onBlur}
        readOnly={readOnly ? true : false}
      />
    </div>
  );
};

export default EditorCustom;
