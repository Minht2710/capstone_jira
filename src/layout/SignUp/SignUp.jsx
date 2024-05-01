import React from "react";
import InputCustom from "../../Components/Input/InputCustom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { quanLyTaiKhoanServ } from "../../services/quanLyTaiKhoan/quanLyTaiKhoanServ";
import * as Yup from "yup";
import { message } from "antd";
import "./signUp.scss";

const SignUp = ({backSignIn}) => {
  // const navigate = useNavigate();

  // formik, yup sign up
  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        passWord: "",
        name: "",
        phoneNumber: "",
      },
      onSubmit: async (values) => {
        try {
          const res = await quanLyTaiKhoanServ.dangKi(values);
          console.log(res);
          message.success(<p className="inline">{res.data.message}</p>);
          setTimeout(() => {
            // navigate("/Toggle-sign-in");
            backSignIn()
          }, 1000);
        } catch (error) {
          message.error(
            <p className="inline">{error.response.data.message}</p>
          );
        }
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Please enter your Email"),
        passWord: Yup.string()
          .matches(
            /[A-Z]/,
            "Password must contain at least one uppercase letter"
          )
          .matches(
            /[!@#$%^&*(),.?":{}|<>_+=~]/,
            "Password must contain at least one special character"
          )
          .min(8, "Password must be at least 8 characters long")
          .required("Please enter your password"),
      }),
    });
  return (
    <>
      <form onSubmit={handleSubmit} className="">
        {/* email  */}
        <InputCustom
          label="Email:"
          placeholder={"Press Your Email"}
          className="signUpInput"
          value={values.email}
          error={errors.email}
          onBlur={handleBlur}
          onChange={handleChange}
          name="email"
          touched={touched.email}
        />

        {/* password */}
        <InputCustom
          label="Password:"
          placeholder={"Press Your passWord"}
          className="signUpInput"
          value={values.passWord}
          error={errors.passWord}
          onBlur={handleBlur}
          onChange={handleChange}
          name="passWord"
          touched={touched.passWord}
        />

        {/* name  */}
        <InputCustom
          label="User Name:"
          placeholder={"Press Your Name"}
          className="signUpInput"
          value={values.name}
          error={errors.name}
          onBlur={handleBlur}
          onChange={handleChange}
          name="name"
          touched={touched.name}
        />

        {/* phone nUmber */}
        <InputCustom
          label="Phone Number"
          placeholder={"Press Your number"}
          className="signUpInput"
          value={values.number}
          error={errors.number}
          onBlur={handleBlur}
          onChange={handleChange}
          name="phoneNumber"
          type="number"
          touched={touched.number}
        />

        <button
          type="submit"
          className="bg-blue-600 transition-all duration-200 hover:bg-slate-500 w-full rounded-md py-2 font-bold text-white mt-10"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUp;
