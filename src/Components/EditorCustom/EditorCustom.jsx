import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // hoặc 'quill/dist/quill.bubble.css'

const EditorCustom = ({ value, onChange, label, className }) => {
  const toolbarOption = [
    ["bold", "italic", "underline", "strike"],
    [{ header: 1 }, { header: 2 }],
    // ["link", "image", "video", "formula"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];
  const module = {
    toolbar: toolbarOption,
  };
  return (
    <div className="">
      <label htmlFor="editorForm" className="font-bold">
        {label}
      </label>
      <ReactQuill
        id="editorForm"
        themes="snow"
        value={value}
        onChange={onChange}
        modules={module}
        className={className}
      />
    </div>
  );
};

export default EditorCustom;
