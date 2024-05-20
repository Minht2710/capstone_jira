import { Slider } from "antd";
import React, { useState, useEffect } from "react";
import InputCustom from "../../Components/Input/InputCustom";
import { useSelector, useDispatch } from "react-redux";
import {
  handleTimeSpent,
  handleChangeOriginal,
} from "../../redux/slice/taskSlice";

const TimeEstimate = ({ taskDetail }) => {
  const dispatch = useDispatch();

  // Khởi tạo state với các giá trị từ taskDetail
  const [timeSpent, setTimeSpent] = useState(taskDetail.timeTrackingSpent);
  const [originalEstimate, setOriginalEstimate] = useState(
    taskDetail.originalEstimate
  );

  const timeSpentFromStore = useSelector((state) => state.taskSlice.timeSpent);

  useEffect(() => {
    setTimeSpent(timeSpentFromStore);
  }, [timeSpentFromStore]);

  const handleChangeTime = (value) => {
    setTimeSpent(value);
    dispatch(handleTimeSpent(value));
  };

  const handleChangeOriginalEstimate = (e) => {
    const value = e.target.value;
    setOriginalEstimate(value);
    dispatch(handleChangeOriginal(value));
  };

  const handleSpentTime = (e) => {
    const value = e.target.value;
    setTimeSpent(value);
    dispatch(handleTimeSpent(value));
  };

  return (
    <div className="mt-5">
      <div>
        <span className="font-bold">Ước tính</span>
        <Slider
          // Đặt giá trị mặc định từ taskDetail.timeTrackingSpent
          defaultValue={taskDetail.timeTrackingSpent}
          // Sử dụng state để kiểm soát giá trị
          value={timeSpent}
          min={0}
          max={originalEstimate}
          onChange={handleChangeTime}
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="w-1/2">
          <InputCustom
            className=""
            label={"Original Estimate"}
            type={"number"}
            value={originalEstimate}
            onChange={handleChangeOriginalEstimate}
          />
        </div>
        <div className="w-1/2">
          <InputCustom
            min={0}
            max={originalEstimate}
            className=""
            label={"Time Tracking Spent"}
            type={"number"}
            value={timeSpent}
            onChange={handleSpentTime}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeEstimate;
