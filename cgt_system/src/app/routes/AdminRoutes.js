import React from "react";
import { Route, Routes, useOutletContext } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import ComingSoon from "../pages/ComingSoon";
import ManageUser from "../pages/ManageUser/ManageUser";
import DetailUserProfile from "../pages/ManageUser/partials/DetailUserProfile/DetailUserProfile.js";

export default function AdminRoutes() {
  const { user } = useOutletContext();

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
        <Route path="dashboard" element={<ComingSoon />} />
        <Route path="membership-packages" element={<ComingSoon />} />
        <Route path="blog" element={<ComingSoon />} />
        <Route path="faq" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
