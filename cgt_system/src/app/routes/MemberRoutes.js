import React from "react";
import { Route, Routes, useOutletContext } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import ComingSoon from "../pages/ComingSoon";
import ManageChildren from "../pages/ManageChildren/ManageChildren";
import ChildLayout from "../layouts/ChildLayout/ChildLayout";
import Indicators from "../pages/Indicators/Indicators";
import Overview from "../pages/Overview/Overview";
import Checkout from "../pages/Checkout";
import Teeth from "../pages/Teeth/Teeth";
import Chat from "../pages/Chat";
import Vaccinations from "../pages/Vaccinations/Vaccinations";
import VaccineInfo from "../pages/VaccineInfo/VaccineInfo";
import ChildHealthBook from "../pages/ChildHealthBook/ChildHealthBook";

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
          <Route path="children/:childId/overview" element={<Overview />} />
          <Route path="children/:childId/indicators" element={<Indicators />} />
          <Route path="children/:childId/teeth" element={<Teeth />} />
          <Route
            path="children/:childId/vaccinations"
            element={<Vaccinations />}
          />
          <Route
            path="children/:childId/vaccine/:vaccineId"
            element={<VaccineInfo />}
          />
        </Route>
        <Route path="upgrade-plan/checkout" element={<Checkout />} />
        <Route path="*" element={<ComingSoon />} />
        <Route path="consultations" element={<Chat />} />
        <Route
          path="consultations/child-details"
          element={<ChildHealthBook />}
        />
      </Route>
    </Routes>
  );
}
