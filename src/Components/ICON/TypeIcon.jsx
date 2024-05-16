import React from "react";

const TypeIcon = ({ id, className }) => {
  let icon;
  if (id === 1) {
    icon = <i class="fa-sharp fa-solid fa-bug text-red-500"></i>;
  } else if (id === 2) {
    icon = <i class="fa-sharp fa-solid fa-sparkles text-blue-500"></i>;
  }
  return <span className={className}>{icon}</span>;
};

export default TypeIcon;
