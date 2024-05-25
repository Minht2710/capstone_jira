import React from 'react'
import { useEffect } from 'react'
import { getUserThunk } from '../../redux/slice/userSlice'
import { getLocalStorage } from '../../utils/util'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card, Drawer, Modal, Pagination, Table, message } from 'antd';
import * as yup from 'yup'
import { useState } from 'react';
import { useFormik } from 'formik';
import InputCustom from '../../Components/Input/InputCustom';
import { quanLyTaiKhoanServ } from '../../services/quanLyTaiKhoan/quanLyTaiKhoanServ';
import AddUser from '../../layout/AddUser/AddUser';
import "./userManagerment.scss"
import useResponsive from '../../hooks/useResponsive';




const UserManagerment = () => {
    let disPatch = useDispatch()
    let { accessToken } = getLocalStorage("user")
    let [isReload, setIsReload] = useState(false)
    const { isMobile } = useResponsive();
    useEffect((params) => {
        disPatch(getUserThunk(accessToken))
    }, [isReload]
    )
    let [data, setData] = useState()
    let dataTam = useSelector((state) => state.userSlice.listUser)
    useEffect(() => {
        setData(dataTam)
    }, [dataTam]
    )


    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (text, record, index) => index + 1,
            showSorterTooltip: {
                target: 'full-header',
            },

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: {
                compare: (a, b) => a.email.localeCompare(b.email),
                multiple: 3,
            }

        },
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
                multiple: 2,
            }

        },

        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',

            sorter: {
                sorter: (a, b) => a.phoneNumber - b.phoneNumber,
                multiple: 1,
            }

        },

        {
            title: 'Action',
            key: 'action',
            // không có dataIndex nên record mặc định có thể lấy dữ liệu từ cột khác mà không cần thêm tham số text
            render: (record) => (
                <div>
                    <button
                        onClick={() => {
                            handelEditUser(record.userId);
                        }}
                        className='bg-blue-600 hover:bg-blue-800 border rounded ml-4 py-1 px-2 text-white '
                    >Sửa</button>
                    <button
                        onClick={() => handelDeleteUser(record.userId)}
                        className='bg-red-500 hover:bg-red-800 border rounded ml-4 py-1 px-2 text-white '
                    >Xóa</button>
                </div>
            )
        },

    ];

    let onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };

    // edit user
    let [userDetail, setUserDetail] = useState()
    let handelEditUser = async (userId) => {
        quanLyTaiKhoanServ.getUserById(userId, accessToken)
            .then((res) => {
                // console.log(res.data.content[0]);
                setUserDetail(res.data.content[0])

            })
            .catch((err) => {
                // console.log(err);
            });



        showDrawer()
    }
    useEffect(() => {
        userDetail && setFieldValue("id", userDetail.userId);
        userDetail && setFieldValue("email", userDetail.email);
        userDetail && setFieldValue("name", userDetail.name);
        userDetail && setFieldValue("phoneNumber", userDetail.phoneNumber);



    }, [userDetail]);

    // Drawer ant
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onCloseDrawer = () => {
        setOpen(false);
    };


    let { handleChange, handleSubmit, values, errors, handleBlur, touched, setFieldValue } = useFormik({
        initialValues: {
            id: "",
            email: "",
            name: "",
            phoneNumber: "",

        },
        onSubmit: async (values) => {
            quanLyTaiKhoanServ.updateUser(values)
                .then((res) => {
                    // console.log(res.data.content);
                    message.success(res.data.content)
                    setIsReload(values)
                })
                .catch((err) => {
                    // console.log(err);
                    // message.error(err.response.data.content)
                });



        },
        validationSchema: yup.object({
            id: yup.string().required("Vui lòng không bỏ trống")
            , email: yup.string().email("Vui lòng kiểm tra định dạng email").required("Vui lòng không bỏ trống")
            , name: yup.string().required("Vui lòng không bỏ trống")
            , phoneNumber: yup.string().matches(/^(0[2|3|4|5|6|7|8|9]{1})([0-9]{8,9})$/, "Vui lòng nhập đúng số điện thoại").required("Vui lòng không bỏ trống")

        })
    })

    let handelDeleteUser = (userId) => {
        quanLyTaiKhoanServ.deleteUser(userId, accessToken)
            .then((res) => {
                // console.log(res.data.content);
                message.success(res.data.content)
                setIsReload(userId)
            })
            .catch((err) => {
                // console.log(err.response.data);
                message.error(err.response.data.content)
            });

    }

    // searchKeyword
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleSearchChange = (e) => {
        quanLyTaiKhoanServ.getUserById(e.target.value, accessToken)
            .then((res) => {
                // console.log(res.data.content);
                setData(res.data.content)


            })
            .catch((err) => {
                console.log(err);
            });

        setSearchKeyword(e.target.value);
    };
    // const handleSearchChange = (e) => {
    //     setSearchKeyword(e.target.value);

    // };

    const [visible, setVisible] = useState(false);

    const handleOpen = () => {
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
    };
    // chỉnh page trang
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    const filteredData = data?.filter(
        (user) =>
            user.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            user.phoneNumber.toString().toLowerCase().includes(searchKeyword.toLowerCase()) ||
            user.userId.toString().toLowerCase().includes(searchKeyword.toLowerCase())
    );
    const getDataForCurrentPage = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData
            ? filteredData.slice(startIndex, endIndex)
            : data?.slice(startIndex, endIndex);
    };


    return (
        <div>
            {isMobile ? (
                <div className="mobileUser flex flex-wrap ">
                    <div className='flex ml-9 py-2  items-center w-full '>
                        {/* add user */}
                        <button className='bg-blue-600 hover:bg-blue-800 border rounded ml-4  py-2 px-2 text-white '
                            onClick={handleOpen}>
                            Add User
                        </button>
                        {/* search */}

                        <div className="inputSearch ml-12">
                            <label htmlFor="searchInput" className="searchInput">
                                <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
                                <input
                                    className="formSearch"
                                    type="search"
                                    id="searchInput"
                                    value={searchKeyword}
                                    onChange={handleSearchChange}
                                />
                            </label>
                        </div>
                    </div>
                    <br />

                    {/* map user */}
                    {getDataForCurrentPage()?.map((item) => (
                        <Card
                            className="cardUser"
                            title={<h5 className="uppercase font-bold">{item.name}</h5>}
                            extra={
                                <button
                                    onClick={() => {
                                        handelEditUser(item.userId);
                                    }}
                                    className="uppercase font-bold"
                                >
                                    edit
                                </button>
                            }
                        >
                            {/* Avata */}
                            <div>
                                <span className="nameCard mr-2">Avata:</span>
                                <Avatar
                                    src={item.avatar}
                                    shape="circle"
                                    gap={2}
                                    alt={item.name}
                                    draggable={true}
                                />

                            </div>

                            {/* id */}
                            <div>
                                <span className="nameCard mr-2">id User:</span>
                                <span className="contentCard ">{item.userId}</span>
                            </div>

                            {/* phone */}
                            <div>
                                <span className="nameCard mr-2">Phone:</span>
                                <span className="contentCard ">
                                    {item.phoneNumber}
                                </span>
                            </div>
                            {/* email */}
                            <div>
                                <span className="nameCard mr-2">Email:</span>
                                <span className="contentCard ">
                                    {item.email}
                                </span>
                            </div>


                        </Card>
                    ))}
                    <div className="w-full text-center mt-2">
                        <Pagination
                            current={currentPage}
                            pageSize={itemsPerPage}
                            total={filteredData?.length}
                            onChange={(page, pageSize) => setCurrentPage(page)}
                            showSizeChanger
                            onShowSizeChange={(current, size) => setItemsPerPage(size)}
                        />
                    </div>
                    {/* popup AddUser */}
                    <Modal
                        visible={visible}
                        centered
                        onCancel={handleClose}
                        footer={null}

                    >
                        <AddUser />

                    </Modal>
                    {/* edit user */}
                    <div className='popup_drawer'>
                        <Drawer
                            title="Edit User"
                            placement="right"
                            width={500}
                            onClose={onCloseDrawer}
                            open={open}
                        >
                            <form className="space-y-4 md:space-y-6 text-black" action="#" onSubmit={handleSubmit}>
                                <InputCustom touched={touched.id} onBlur={handleBlur} value={values.id}
                                    className='mt-0 mb-2 ' name={"id"} label={"User ID"} placeholder={"Type User ID"} />
                                {errors.id && touched.id ? (<p className='text-sm text-red-500' >{errors.id} </p>) : null}

                                <InputCustom touched={touched.email} onBlur={handleBlur} value={values.email} onChange={
                                    (e) => {
                                        handleChange(e);
                                    }}
                                    className='mt-0 mb-2 bg-white ' name={"email"} label={"Email"} placeholder={"Type Email"} />
                                {errors.email && touched.email ? (<p className='text-sm text-red-500' >{errors.email} </p>) : null}

                                <InputCustom touched={touched.name} onBlur={handleBlur} value={values.name} onChange={
                                    (e) => {
                                        handleChange(e);
                                    }}
                                    className='mt-0 mb-2 bg-white ' name={"name"} label={"Name"} placeholder={"Type Name"} />
                                {errors.name && touched.name ? (<p className='text-sm text-red-500' >{errors.name} </p>) : null}

                                <InputCustom touched={touched.phoneNumber} onBlur={handleBlur} value={values.phoneNumber} onChange={
                                    (e) => {
                                        handleChange(e);
                                    }}
                                    className='mt-0 mb-2 bg-white ' name={"phoneNumber"} label={"Phone Number"} placeholder={"Type Phone Number"} />
                                {errors.phoneNumber && touched.phoneNumber ? (<p className='text-sm text-red-500' >{errors.phoneNumber} </p>) : null}


                                {/* foot popup */}
                                <div className='flex align-items-center justify-between mt-5 '>
                                    <div className='space-x-1'>
                                        <button type='submit' className=' py-2 px-5 rounded bg-blue-600 text-white hover:bg-blue-700' >Update User</button>
                                    </div>
                                </div>

                            </form>



                        </Drawer>
                    </div>
                </div>
            ) : (//---------------------desktop--------------------
                <div>

                    <div className='flex ml-9 py-2  items-center'>
                        {/* add user */}
                        <button className='bg-blue-600 hover:bg-blue-800 border rounded ml-4  py-2 px-2 text-white '
                            onClick={handleOpen}>
                            Add User
                        </button>
                        {/* search */}

                        <div className="inputSearch ml-12">
                            <label htmlFor="searchInput" className="searchInput">
                                <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
                                <input
                                    className="formSearch"
                                    type="search"
                                    id="searchInput"
                                    value={searchKeyword}
                                    onChange={handleSearchChange}
                                />
                            </label>
                        </div>
                    </div>
                    <br />
                    {/* popup AddUser */}
                    <Modal
                        visible={visible}
                        centered
                        onCancel={handleClose}
                        footer={null}

                    >
                        <AddUser />

                    </Modal>

                    <Table
                        columns={columns}
                        dataSource={data}
                        onChange={onChange}
                        showSorterTooltip={{
                            target: 'sorter-icon',
                        }}
                        className='mx-12'
                    />

                    {/* edit user */}
                    <div className='popup_drawer'>
                        <Drawer
                            title="Edit User"
                            placement="right"
                            width={500}
                            onClose={onCloseDrawer}
                            open={open}
                        >
                            <form className="space-y-4 md:space-y-6 text-black" action="#" onSubmit={handleSubmit}>
                                <InputCustom touched={touched.id} onBlur={handleBlur} value={values.id}
                                    className='mt-0 mb-2 ' name={"id"} label={"User ID"} placeholder={"Type User ID"} />
                                {errors.id && touched.id ? (<p className='text-sm text-red-500' >{errors.id} </p>) : null}

                                <InputCustom touched={touched.email} onBlur={handleBlur} value={values.email} onChange={
                                    (e) => {
                                        handleChange(e);
                                    }}
                                    className='mt-0 mb-2 bg-white ' name={"email"} label={"Email"} placeholder={"Type Email"} />
                                {errors.email && touched.email ? (<p className='text-sm text-red-500' >{errors.email} </p>) : null}

                                <InputCustom touched={touched.name} onBlur={handleBlur} value={values.name} onChange={
                                    (e) => {
                                        handleChange(e);
                                    }}
                                    className='mt-0 mb-2 bg-white ' name={"name"} label={"Name"} placeholder={"Type Name"} />
                                {errors.name && touched.name ? (<p className='text-sm text-red-500' >{errors.name} </p>) : null}

                                <InputCustom touched={touched.phoneNumber} onBlur={handleBlur} value={values.phoneNumber} onChange={
                                    (e) => {
                                        handleChange(e);
                                    }}
                                    className='mt-0 mb-2 bg-white ' name={"phoneNumber"} label={"Phone Number"} placeholder={"Type Phone Number"} />
                                {errors.phoneNumber && touched.phoneNumber ? (<p className='text-sm text-red-500' >{errors.phoneNumber} </p>) : null}


                                {/* foot popup */}
                                <div className='flex align-items-center justify-between mt-5 '>
                                    <div className='space-x-1'>
                                        <button type='submit' className=' py-2 px-5 rounded bg-blue-600 text-white hover:bg-blue-700' >Update User</button>
                                    </div>
                                </div>

                            </form>



                        </Drawer>
                    </div>

                </div>
            )}
        </div>

    )
}

export default UserManagerment
