import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router";

export default function UserLayout() {
  return (
    <div className="layout-wrapper layout-content-navbar bg-body">
      <div className="layout-container">
        <Sidebar />
        <div className="layout-page">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
