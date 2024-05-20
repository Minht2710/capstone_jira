import { useFormik } from "formik";
import React, { useEffect } from "react";
import { getLocalStorage } from "../../utils/util";
import InputCustom from "../../Components/Input/InputCustom";
import axios from "axios";
import ProjectOfUser from "../../layout/EditProfile/ProjectOfUser";
import "./profileUser.scss";

const ProfileUser = () => {
  const user = getLocalStorage("user");
  // console.log(user);
  const { handleChange, handleBlur, touched, values, handleSubmit } = useFormik(
    {
      initialValues: {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
      },
      onSubmit: (values) => {
        axios({
          url: "https://jiranew.cybersoft.edu.vn/api/Users/editUser",
          method: "PUT",
          data: values,
          headers: {
            // Authorization: `Bearer ${user.accessToken}`,
            TokenCybersoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMCIsIkhldEhhblN0cmluZyI6IjAxLzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNTE0ODgwMDAwMCIsIm5iZiI6MTY5ODY4NTIwMCwiZXhwIjoxNzI1Mjk2NDAwfQ.CPY1b9IiMcklQZ9hjqIzrdiOlQ5YnV4VpzGu_yZr7G0",
          },
        })
          .then((res) => {
            console.log(res);
            const updatedUsers = {
              avatar: user.avatar,
              accessToken: user.accessToken,
              id: user.id,
              name: values.name,
              phoneNumber: values.phoneNumber,
              email: values.email,
            };
            localStorage.setItem("user", JSON.stringify(updatedUsers));
          })
          .catch((err) => {
            console.log(err);
          });
      },
    }
  );
  useEffect(() => {}, [user]);
  return (
    <div
      className="container mx-auto
    "
    >
      <div className="profileUser flex w-full items-center">
        <div className="avatarUser w-3/12">
          <img
            src={user.avatar}
            alt={user.avatar}
            className="w-full rounded-full"
          />
        </div>
        <div className="infoUser w-9/12">
          <form className="w-full pl-10" onSubmit={handleSubmit}>
            <InputCustom
              className="inputInfoUser inputUserName"
              label={"User Name:"}
              value={values.name}
              onChange={handleChange}
              touched={touched.name}
              onBlur={handleBlur}
              name="name"
            />

            {/* id */}
            <InputCustom
              className="inputInfoUser"
              label={"User ID:"}
              value={values.id}
              onChange={handleChange}
              touched={touched.id}
              onBlur={handleBlur}
              name="id"
              readOnly={true}
            />
            {/* phone number */}
            <InputCustom
              className="inputInfoUser"
              label={"Phone Number:"}
              value={values.phoneNumber}
              onChange={handleChange}
              touched={touched.phoneNumber}
              onBlur={handleBlur}
              name="phoneNumber"
            />
            <InputCustom
              className="inputInfoUser"
              s
              label={"Email:"}
              value={values.email}
              onChange={handleChange}
              touched={touched.email}
              onBlur={handleBlur}
              name="email"
            />
            <div className="text-right mt-3">
              <button
                className="bg-blue-500 py-2 px-5 rounded-md font-bold text-white hover:bg-blue-800 transition-all duration-500"
                type="submit"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <ProjectOfUser />
      </div>
    </div>
  );
};

export default ProfileUser;
