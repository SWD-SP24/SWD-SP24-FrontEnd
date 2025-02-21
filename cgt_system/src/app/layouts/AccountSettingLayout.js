import React from "react";
import { Outlet } from "react-router";
import Nav from "../components/AccountSettingNavbar/Nav";

export default function AccountSettingLayout({ user }) {
  return (
    <div className="row fv-plugins-icon-container">
      <div className="col-md-12">
        <Nav role={user.role} />
        <Outlet context={{ user }} />
      </div>
    </div>
  );
}
