import React from "react";
import { Select } from "antd";

const SelectCustom = ({
  label,
  value,
  onChange,
  onBlur,
  touched,
  options,
  placeholder,
}) => {
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className="flex flex-col mb-5">
      <label htmlFor="customSelect" className="font-bold mb-2">
        {label}
      </label>
      <Select
        id="customSelect"
        className="customSelect"
        showSearch
        placeholder={placeholder || "Select an option"}
        optionFilterProp="children"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        filterOption={filterOption}
        options={options.map((option) => ({
          value: option.value,
          label: option.label,
        }))}
      />
    </div>
  );
};

export default SelectCustom;
