import React from "react";
import { Outlet, useOutletContext } from "react-router";
import Nav from "../components/AccountSettingNavbar/Nav";

export default function AccountSettingLayout() {
  const { user } = useOutletContext();
  return (
    <div className="row fv-plugins-icon-container">
      <div className="col-md-12">
        <Nav role={user.role} />
        <Outlet context={{ user }} />
      </div>
    </div>
  );
}
