import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router";
import Navbar from "../../components/Nav/Navbar";

export default function UserLayout({ user }) {
  return (
    <div className="layout-wrapper layout-content-navbar bg-body">
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
          }}
        >
          <Navbar user={user} />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <Outlet context={{ user }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
