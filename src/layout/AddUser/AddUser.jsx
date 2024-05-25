import React, { useContext } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
// import { NotifyContext } from '../../template/Template';
import InputCustom from '../../Components/Input/InputCustom';
import { quanLyTaiKhoanServ } from '../../services/quanLyTaiKhoan/quanLyTaiKhoanServ';
import { message } from 'antd';


const AddUser = ({setIsReload}) => {
    //   let notify=useContext(NotifyContext)
    
    

    let { handleChange, handleSubmit, values, errors, handleBlur, touched } = useFormik({
        initialValues: {
            email: ""
            , passWord: ""
            , name: ""
            , phoneNumber: ""
        },
        onSubmit: async (values) => {
            //   quanLyNguoiDungServ
            //   .dangky(values)
            //   .then((res) => {
            //     // notify("Đăng ký thành công, khách hàng sẽ được chuyển hướng về trang đăng nhập")
            //     setTimeout(() => {navigate("/login")  },2000)
            //   })
            //   .catch((error) => {
            //     // notify(error.response.data.message);
            //   })

            quanLyTaiKhoanServ.dangKi(values)
                .then((res) => {
                    console.log(res.data.message);
                    message.success(res.data.message)
                })
                .catch((err) => {
                    console.log(err);
                });




        },
        validationSchema: yup.object({
            name: yup.string().required("Vui lòng không bỏ trống")
            , passWord: yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, "Mật khẩu có ít nhất 6 ký tự và Bao gồm: chữ hoa, chữ thường, số").required("Vui lòng không bỏ trống")
            , email: yup.string().email("Vui lòng kiểm tra định dạng email").required("Vui lòng không bỏ trống")
            , phoneNumber: yup.string().matches(/^(0[2|3|4|5|6|7|8|9]{1})([0-9]{8,9})$/, "Vui lòng nhập đúng số điện thoại").required("Vui lòng không bỏ trống")
        })


    })

    return (
        <section className="bg-gray-50 w-full py-5 rounded ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">

                <div className="w-full bg-white rounded-lg shadow  md:mt-0 xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Create User
                        </h1>
                        <form className="space-y-4 md:space-y-6 text-black" action="#" onSubmit={handleSubmit}>
                            <div >
                                <InputCustom
                                    placeholder="Vui lòng nhập email"
                                    id="email"
                                    label="Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.email}
                                    touched={touched.email}
                                    name="email"
                                    value={values.email}
                                />
                            </div>

                            <div >
                                <InputCustom
                                    placeholder="Vui lòng nhập mật khẩu"
                                    id="passWord"
                                    label="Mật Khẩu"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.passWord}
                                    touched={touched.passWord}
                                    name="passWord"
                                    value={values.passWord}
                                // type='password'
                                />
                            </div>



                            <div >
                                <InputCustom
                                    placeholder="Vui lòng nhập Tên"
                                    id="name"
                                    label="Họ Tên"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.name}
                                    touched={touched.name}
                                    name="name"
                                    value={values.name}
                                />
                            </div>

                            <div >
                                <InputCustom
                                    placeholder="Vui lòng nhập số điện thoại"
                                    id="phoneNumber"
                                    label="Số điện thoại"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.phoneNumber}
                                    touched={touched.phoneNumber}
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                />
                            </div>


                            {/* button */}
                            <div>
                                <button type="submit" className="w-full text-white bg-black border-black  hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create</button>
                            </div>
                            {/* <div>
                                <button 
                                onClick={handelNhap}>nhap</button>
                            </div> */}


                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddUser