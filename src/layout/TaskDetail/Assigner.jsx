import { Collapse, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addMemberTaskThunk } from "../../redux/slice/userSlice";
import { getLocalStorage } from "../../utils/util";
import { useDispatch } from "react-redux";
import { getTaskDetailThunk } from "../../redux/slice/taskSlice";

const Assigner = () => {
  const userToken = getLocalStorage("user").accessToken;
  const dispatch = useDispatch();

  const taskDetail = useSelector((state) => state.taskSlice.taskDetail);
  const projectDetail = useSelector(
    (state) => state.projectSlice.projectDetail
  );

  const [collapse, setCollapse] = useState(false);
  const [memberTask, setMemberTask] = useState(taskDetail.assigness);
  const [memberProject, setMemberProject] = useState(projectDetail.members);

  const handleToggleCollapse = () => {
    setCollapse(!collapse);
  };
  // console.log("project detail assigner", projectDetail);

  // add assigner
  const addAssigner = (userId) => {
    // console.log(userId);
    const values = {
      taskId: taskDetail.taskId,
      userId: userId,
    };
  };

  // remove assigner
  const removeAssigner = (userId) => {
    // console.log("remove assigner", userId);
  };
  useEffect(() => {
    dispatch(getTaskDetailThunk({ data: taskDetail.taskId, token: userToken }));
  }, [dispatch]);
  return (
    <div className="mt-5">
      <button onClick={handleToggleCollapse} className="font-bold capitalize">
        assigner
      </button>

      <div className="mt-2">
        <Collapse
          defaultActiveKey={["1"]}
          // onChange={onChange}
          items={[
            {
              label: "Assigner",
              children: (
                <div>
                  <div className="flex flex-wrap">
                    {memberTask.map((member) => (
                      <div className="flex justify-center items-center bg-slate-300 mr-2 mb-2 px-2 py-1 rounded-lg">
                        <p className="mr-2">{member.name}</p>
                        <button className="px-1 rounded-full hover:bg-red-500 hover:text-white transition-all duration-500">
                          <i class="fa-sharp fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* item Selected*/}
                  <div className="">
                    {/* select option*/}
                    <span>Member</span>

                    {memberProject.map((member) => {
                      const memberInTask = memberTask.find(
                        (task) => task.id === member.userId
                      );

                      return (
                        <div
                          key={member.userId}
                          className="flex justify-between items-center"
                        >
                          <span className="font-semibold">{member.name}</span>
                          {!memberInTask ? (
                            <button onClick={() => addAssigner(member.userId)}>
                              <i className="fa-sharp fa-solid fa-user-plus"></i>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                removeAssigner(memberInTask.userId)
                              }
                            >
                              <i className="fa-sharp fa-solid fa-user-check text-green-500"></i>
                            </button>
                          )}
                        </div>
                      );
                    })}

                    <div></div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Assigner;
