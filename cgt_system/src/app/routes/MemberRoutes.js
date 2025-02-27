import React from "react";
import { Route, Routes, useOutletContext } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import ComingSoon from "../pages/ComingSoon";
import ManageChildren from "../pages/ManageChildren/ManageChildren";
import ChildLayout from "../layouts/ChildLayout/ChildLayout";

export default function MemberRoutes() {
  const { user } = useOutletContext();
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute
            isAllowed={user.role === "member"}
            redirectTo="/not-authorized"
          />
        }
      >
        <Route path="children" element={<ManageChildren />} />
        <Route path="children/:id" element={<ChildLayout />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
