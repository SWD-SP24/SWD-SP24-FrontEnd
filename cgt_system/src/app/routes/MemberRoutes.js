import React from "react";
import { Route, Routes, useOutletContext } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import ComingSoon from "../pages/ComingSoon";
import ManageChildren from "../pages/ManageChildren/ManageChildren";

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
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
