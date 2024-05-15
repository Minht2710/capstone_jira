import React from "react";

const PriorityIcon = ({ priorityId }) => {
  let icon;
  if (priorityId === 1) {
    icon = <i className="fa-regular fa-angles-up text-red-500"></i>;
  } else if (priorityId === 2) {
    icon = <i className="fa-sharp fa-regular fa-equals text-orange-500"></i>;
  } else if (priorityId === 3) {
    icon = <i className="fa-regular fa-angle-down text-green-500"></i>;
  } else if (priorityId === 4) {
    icon = <i className="fa-regular fa-angles-down text-blue-500"></i>;
  }

  return <span className="mr-2">{icon}</span>;
};
export default PriorityIcon;
