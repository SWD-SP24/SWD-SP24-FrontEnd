import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet } from "react-router";
import useUser from "../hooks/useUser";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Nav/Navbar";
import Loading from "../components/Loading/Loading";
import useApi from "../hooks/useApi";
import API_URLS from "../config/apiUrls";

export default function MainLayout() {
  const { user, setUser } = useUser();

  const { response, callApi } = useApi({
    url: `${API_URLS.USER.CURRENT_USER}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response?.status === "successful") {
      const user = response.data;
      Cookies.set("user", JSON.stringify(user));
      setUser(user);
    }
  }, [response]);

  if (user === null) {
    return <Loading />;
  }

  return (
    <div>
      <div className="pattern-bg"></div>

      <div className="layout-wrapper layout-content-navbar bg-body  ">
        <div className="layout-container">
          <Sidebar role={user.role} />
          <div className="menu-mobile-toggler d-xl-none rounded-1">
            <a
              href="javascript:void(0);"
              className="layout-menu-toggle menu-link text-large text-bg-secondary p-2 rounded-1"
            >
              <i className="bx bx-menu icon-base"></i>
              <i className="bx bx-chevron-right icon-base"></i>
            </a>
          </div>
          <div
            className="layout-page"
            style={{
              paddingLeft: "260px",
              paddingTop: "76px",
            }}
          >
            <Navbar user={user} />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <Outlet context={{ user, setUser, callApi }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
