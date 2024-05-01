import React from "react";
import { quanLyTaiKhoanServ } from "../../services/quanLyTaiKhoan/quanLyTaiKhoanServ";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveLocalStorage } from "../../utils/util";
import InputCustom from "../../Components/Input/InputCustom";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  //   fomik, yup
  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        passWord: "",
      },
      onSubmit: async (values) => {
        try {
          const res = await quanLyTaiKhoanServ.dangNhap(values);
          console.log(res);
          saveLocalStorage("user", res.data.content);
          const info = () => {
            message.info(
              <p className="thongBao">
                `Welcome back, {res.data.content.name}!`
              </p>
            );
          };
          setTimeout(() => {
            info();
            navigate("/");
          }, 1000);
          // thÔng báo đăng nhập thành công
          // Xử lý logic sau khi đăng nhập thành công (ví dụ: điều hướng người dùng)
        } catch (error) {
          console.log(error);
          // Xử lý lỗi khi đăng nhập thất bại (ví dụ: hiển thị thông báo lỗi)
        }
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Please enter your Email"),
        passWord: Yup.string()
          .required("Please enter your password"),
      }),
    });

  return (
    <form onSubmit={handleSubmit}>
      <InputCustom
        placeholder={"Your Email"}
        className="userInput"
        value={values.email}
        error={errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
        name="email"
        touched={touched.email}
      />
      <InputCustom
        placeholder={"Password"}
        className="passwordInput"
        type="password"
        value={values.passWord}
        error={errors.passWord}
        touched={touched.passWord}
        onChange={handleChange}
        onBlur={handleBlur}
        name="passWord"
      />
      {/* <div className="remember">
          <input
            type="checkbox"
            id="remeber"
            className="ml-2 inline items-center h-3 leading-1"
            onChange={handleRemeberAccount}
          />
          <label
            for="remember"
            className="ml-1 inline items-center text-xs leading-5"
          >
            Rememeber my account
          </label>
        </div> */}
      <div className="buttonSignInGroup mt-20 text-center w-full">
        <button
          type="submit"
          className="bg-blue-600 transition-all duration-200 hover:bg-slate-500 w-full rounded-md py-2 font-bold text-white"
        >
          Sign In
        </button>
        {/* <button className="buttonSignIn">Sign Up</button> */}
      </div>
    </form>
  );
};

export default SignIn;
