import React from "react";
import { Route, Routes, useOutletContext } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import ComingSoon from "../pages/ComingSoon";
import Cookies from "js-cookie";
import ManageChildren from "../pages/ManageChildren/ManageChildren";
import ChildLayout from "../layouts/ChildLayout/ChildLayout";
import Indicators from "../pages/Indicators/Indicators";
import Overview from "../pages/Overview/Overview";
import Checkout from "../pages/Checkout";
import Teeth from "../pages/Teeth/Teeth";
import Chat from "../pages/Chat";
import Vaccinations from "../pages/Vaccinations/Vaccinations";
import VaccineInfo from "../pages/VaccineInfo/VaccineInfo";

export default function MemberRoutes() {
  const { user } = useOutletContext();
  const permissions = JSON.parse(Cookies.get("permissions") || "[]");

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
        <Route
          element={
            <ProtectedRoute
              isAllowed={user?.emailActivation === "activated"}
              redirectTo={"/not-authorized"}
            />
          }
        >
          <Route path="upgrade-plan/checkout" element={<Checkout />} />
        </Route>
        <Route path="*" element={<ComingSoon />} />
        <Route
          element={
            <ProtectedRoute
              isAllowed={permissions.some(
                (p) =>
                  p.permissionName === "DOCTOR_CHAT" ||
                  p.permissionName === "DOCTOR_CHAT_VIP"
              )}
              redirectTo={"/not-authorized"}
            />
          }
        >
          <Route path="consultations" element={<Chat />} />
        </Route>
      </Route>
    </Routes>
  );
}
