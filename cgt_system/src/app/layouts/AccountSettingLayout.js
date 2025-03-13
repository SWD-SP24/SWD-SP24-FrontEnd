import React from "react";
import { Outlet, useOutletContext } from "react-router";
import Nav from "../components/AccountSettingNavbar/Nav";
import UserProfileCard from "../pages/UserProfileCard";

export default function AccountSettingLayout() {
  const { user, setUser, callApi } = useOutletContext();
  return (
    <div className="row">
      <UserProfileCard user={user} callApiGetUser={callApi} />
      <div className="col-xl-8 col-lg-7 order-0 order-md-1">
        <Nav role={user.role} />
        <Outlet context={{ user, setUser }} />
      </div>
    </div>
  );
}
