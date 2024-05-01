import React, { useEffect, useState } from "react";
import "./homePage.scss";
import { quanlyProject } from "../../services/quanLyProject/quanLyProject";
import { Avatar, Pagination, Tooltip } from "antd";
// import Member from "../../Components/Member/Member";

const HomePage = () => {
  const column = [
    "stt",
    "Project",
    "id",
    "Category Name",
    "Creator",
    "Members",
    "Action",
  ];

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State để lưu trữ trang hiện tại
  const [itemsPerPage, setItemPerPage] = useState(20);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  // lấy data từ API
  // const handleItemPerPage = (event) => {
  //   const countItemPerPage = parseInt(event.target.value);
  //   setItemPerPage(countItemPerPage);
  // };
  // console.log(countItemPerPage)
  // console.log(itemsPerPage)

  // search project function
  const handeSearchData = (event) => {
    setSearchKeyWord(event.target.value);
  };
  console.log(data.members);
  // useEffect(() => {
  //   handleItemPerPage();
  // },[]);

  useEffect(() => {
    quanlyProject
      .getAllProject()
      .then((res) => {
        setData(res.data.content);
        // console.log(res.data.content);
      })
      .catch((err) => {});
  }, []);

  // const filteredData = data.filter((project) => {
  //   project.projectName.toLowerCase().includes(searchKeyWord.toLowerCase());
  // });

  const filteredData = data.filter(
    (project) =>
      project.projectName.toLowerCase().includes(searchKeyWord.toLowerCase()) ||
      project.creator.name
        .toLowerCase()
        .includes(searchKeyWord.toLowerCase()) ||
      project.id.toString().toLowerCase().includes(searchKeyWord.toLowerCase())
  );

  // data
  const getDataForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData
      ? filteredData.slice(startIndex, endIndex)
      : data.slice(startIndex, endIndex);
  };
  // console.log(filteredData);
  return (
    <div className="homePage ">
      <div className="container mx-auto">
        <div className="homeContent bg-slate-600">
          {/* search ợpect */}
          <div>
            <input
              type="Search"
              value={searchKeyWord}
              onChange={handeSearchData}
            />
          </div>
          {/* table  */}
          <table className="w-full">
            {/* header table */}
            <thead>
              <tr>
                {column.map((title) => (
                  <th key={title}>{title}</th>
                ))}
              </tr>
            </thead>
            {/* body table */}
            <tbody>
              {getDataForCurrentPage().map((data, index) => (
                <tr key={data.id}>
                  <th>{index + 1}</th>
                  <th>{data.projectName}</th>
                  <th>{data.id}</th>
                  <th>{data.categoryName}</th>
                  <th>{data.creator.name}</th>
                  <th>
                    {/* <Member projectId={data.idProject} /> */}
                    <Avatar.Group
                      maxCount={2}
                      maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                      }}
                    >

                      {/* thành viên project */}
                      {data.members.map((member) => (
                        <Avatar src={member.avatar} shape="circle" gap={2} alt={member.name} draggable={true}/>
                      ))}
                    </Avatar.Group>
                  </th>
                  <th>
                    <button>xóa</button>
                    <button>sửa</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          {/*
            //sl data 
          <select
            name="oke"
            id="oke"
            onChange={handleItemPerPage}
            value={itemsPerPage}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          // pagination tự làm
          <div>
            {Array.from(
              { length: Math.ceil(data.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className="bg-white rounded-lg mx-2 w-10 h-10 text-center mt-10"
                >
                  {index + 1}
                </button>
              )
            )}
          </div> */}
          <div className="w-full text-center">
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={filteredData.length}
              onChange={(page, pageSize) => setCurrentPage(page)}
              showSizeChanger
              onShowSizeChange={(current, size) => setItemPerPage(size)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
