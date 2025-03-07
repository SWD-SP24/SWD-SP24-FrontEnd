import React from "react";
import { Route, Routes, useOutletContext } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import ComingSoon from "../pages/ComingSoon";
import ManageChildren from "../pages/ManageChildren/ManageChildren";
import ChildLayout from "../layouts/ChildLayout/ChildLayout";
import Indicators from "../pages/Indicators/Indicators";
import Overview from "../pages/Overview/Overview";
import Checkout from "../pages/Checkout";
import Chat from "../pages/Chat";

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
        <Route element={<ChildLayout />}>
          <Route path="children/:id" element={<Overview />} />
          <Route path="children/:id/indicators" element={<Indicators />} />
          <Route path="children/:id/teeth" element={<ComingSoon />} />
          <Route path="children/:id/vaccinations" element={<ComingSoon />} />
        </Route>
        <Route path="upgrade-plan/checkout" element={<Checkout />} />
        <Route path="consultations" element={<Chat />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
