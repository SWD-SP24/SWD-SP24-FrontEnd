import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet } from "react-router";
import useUser from "../hooks/useUser";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Nav/Navbar";
import Loading from "../components/Loading/Loading";

export default function MainLayout() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
  }, []);

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
                <Outlet context={{ user, setUser }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
