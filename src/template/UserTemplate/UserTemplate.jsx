import React, { useState } from "react";
import Header from "../../layout/Header/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../../utils/util";
import { Button, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import "./userTemplate.scss";

import SiderMenu from "../../layout/Header/SiderMenu";
import useResponsive from "../../hooks/useResponsive";
import LoadingSlice from "../../redux/slice/loadingSlice";
import Loading from "../../Components/loadding/Loading";
// import ToggleSignIn from "../../Pages/ToggleSignIn/ToggleSignIn";

// export const Notifycontext = React.createContext(null);
const UserTemplate = () => {
  const { isMobile } = useResponsive();
  const [collapsed, setCollapsed] = useState(true);
  const { isLoading } = useSelector((state) => state.loadingSlice);
  // const user = getLocalStorage("user");
  return (
    <div className="relative">
      {isLoading ? <Loading /> : null}
      {isMobile ? (
        <Layout>
          <Header />
          <Content>
            <div className="mx-2">
              <Outlet />
            </div>
          </Content>
        </Layout>
      ) : (
        <Layout>
          {/* <Header></Header> */}
          <Header />
          <Layout>
            <Sider
              breakpoint="lg"
              lg
              theme="light"
              trigger={null}
              collapsible
              collapsed={collapsed}
              collapsedWidth={25}
              width={250}
              className="sider overflow-hidden"
              style={{ borderRight: "2px solid black" }}
            >
              <SiderMenu />
            </Sider>
            <Content style={{ height: "calc( 100vh - 56px )" }}>
              <button
                className="buttonSider relative -translate-x-1/2 top-24 text-red-500"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? (
                  <i class="fa-sharp fa-solid fa-circle-chevron-right"></i>
                ) : (
                  <i class="fa-sharp fa-solid fa-circle-chevron-left"></i>
                )}
              </button>
              <div className="mx-5">
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      )}
    </div>
  );
};

export default UserTemplate;
