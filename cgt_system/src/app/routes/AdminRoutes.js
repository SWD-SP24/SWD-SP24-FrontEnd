import React from "react";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import ComingSoon from "../pages/ComingSoon";
import useUser from "../hooks/useUser";
import Loading from "../components/Loading/Loading";
import Profile from "../pages/Profile/Profile";
import UserLayout from "../layouts/UserLayout/UserLayout";
import ManageUser from "../pages/ManageUser/ManageUser";
import DetailUserProfile from "../pages/ManageUser/partials/DetailUserProfile/DetailUserProfile.js";

export default function AdminRoutes() {
  const user = useUser();

  if (user === null) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute
            isAllowed={user.role === "admin"}
            redirectTo={"/not-authorized"}
          />
        }
      >
        <Route element={<UserLayout />}>
          <Route path="dashboard" element={<ComingSoon />} />
          <Route path="users" element={<ManageUser />} />
          <Route path="users/:id" element={<DetailUserProfile />} />
          <Route path="membership-packages" element={<ComingSoon />} />
          <Route path="blog" element={<ComingSoon />} />
          <Route path="faq" element={<ComingSoon />} />
          <Route path="account-setting/account" element={<Profile />} />
          <Route path="account-setting/security" element={<ComingSoon />} />
          <Route
            path="account-setting/billing-plans"
            element={<ComingSoon />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
