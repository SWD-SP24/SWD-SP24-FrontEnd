import React from "react";
import { Route, Routes, useOutletContext } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import ComingSoon from "../pages/ComingSoon";
import ManageUser from "../pages/ManageUser/ManageUser";
import DetailUserProfile from "../pages/ManageUser/partials/DetailUserProfile/DetailUserProfile.js";
import ManagePackages from "../pages/ManagePackage/ManagePackage.js";
import Dashboard from "../pages/Dashboard/Dashboard.js";

export default function AdminRoutes() {
  const { user } = useOutletContext();

  console.log("User in AdminRoute: ", user);

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
        <Route path="users" element={<ManageUser />} />
        <Route path="users/:id" element={<DetailUserProfile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="membership-packages" element={<ManagePackages />} />
        <Route path="blog" element={<ComingSoon />} />
        <Route path="faq" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
