import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import ComingSoon from "../pages/ComingSoon";
import useUser from "../hooks/useUser";
import UserLayout from "../layouts/UserLayout/UserLayout";
import ManageUser from "../pages/ManageUser/ManageUser";
import DetailUserProfile from "../pages/ManageUser/partials/DetailUserProfile/DetailUserProfile.js";
import AccountSettingLayout from "../layouts/AccountSettingLayout";
import Loading from "../components/Loading/Loading";
import ChangePassword from "../pages/ChangePassword";

export default function AdminRoutes() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
  }, []);

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
        <Route element={<UserLayout user={user} />}>
          <Route path="dashboard" element={<ComingSoon />} />
          <Route path="users" element={<ManageUser />} />
          <Route path="users/:id" element={<DetailUserProfile />} />
          <Route path="membership-packages" element={<ComingSoon />} />
          <Route path="blog" element={<ComingSoon />} />
          <Route path="faq" element={<ComingSoon />} />
          <Route
            path="account-setting"
            element={<AccountSettingLayout user={user} />}
          >
            <Route path="account" element={<ComingSoon />} />
            <Route path="security" element={<ChangePassword />} />
            <Route path="billing-plans" element={<ComingSoon />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
