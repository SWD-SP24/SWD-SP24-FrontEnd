import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute({ isAllowed, redirectTo }) {
  return isAllowed ? <Outlet /> : <Navigate to={redirectTo} />;
}
