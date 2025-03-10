import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

// Layouts
import AccountSettingLayout from "../layouts/AccountSettingLayout";
import MainLayout from "../layouts/MainLayout";
import VisitorLayout from "../layouts/VisitorLayout/VisitorLayout";

// Pages Publlic
import NotFound from "../pages/Error/NotFound";
import Home from "../pages/Home/Home";

// Auth Pages
import CodeForm from "../pages/CodeForm";
import EmailForm from "../pages/EmailForm/EmailForm";
import Login from "../pages/Login/Login";
import Register from "../pages/Register";
import ResetPasswordForm from "../pages/ResetPasswordForm";

import Welcome from "../pages/Welcome";

// Admin Routes
import AdminRoutes from "./AdminRoutes";

// Account Setting Pages
import ChangePassword from "../pages/ChangePassword";

// Not Authorized
import NotAuthorized from "../pages/NotAuthorized";

// Coming Soon Page
import BillingAndPlans from "../pages/BillingAndPlans";
import Chat from "../pages/Chat";
import ComingSoon from "../pages/ComingSoon";
import PricingPlan from "../pages/PricingPlan/PricingPlan";
import Profile from "../pages/Profile/Profile";
import UpgradePlanConfirm from "../pages/UpgradePlanConfirm/UpgradePlanConfirm";
import MemberRoutes from "./MemberRoutes";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Các trang public với VisitorLayout */}
        <Route element={<VisitorLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<PricingPlan />} />
        </Route>

        {/* Các trang liên quan đến Auth */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password/email" element={<EmailForm />} />
        <Route path="forgot-password/code" element={<CodeForm />} />
        <Route
          path="forgot-password/reset-password"
          element={<ResetPasswordForm />}
        />

        {/* Admin-Doctor Auth */}
        <Route path="admin-doctor/login" element={<Login />} />
        <Route
          path="admin-doctor/forgot-password/email"
          element={<EmailForm />}
        />
        <Route
          path="admin-doctor/forgot-password/code"
          element={<CodeForm />}
        />
        <Route
          path="admin-doctor/forgot-password/reset-password"
          element={<ResetPasswordForm />}
        />

        {/* Các route sử dụng MainLayout */}
        <Route element={<MainLayout />}>
          {/* Admin Routes */}
          <Route path="admin/*" element={<AdminRoutes />} />
          <Route path="consultations" element={<Chat />} />
          <Route path="/dashboard" element={<ComingSoon />} />

          {/* Member Routes */}
          <Route path="member/*" element={<MemberRoutes />} />
          {/* Account Setting với layout riêng */}
          <Route path="account-setting" element={<AccountSettingLayout />}>
            <Route path="account" element={<Profile />} />

            <Route path="security" element={<ChangePassword />} />

            <Route path="billing-and-plans" element={<BillingAndPlans />} />
          </Route>
        </Route>

        {/* Các trang khác */}
        <Route path="welcome" element={<Welcome />} />
        <Route path="not-authorized" element={<NotAuthorized />} />
        <Route path="upgrade-plan/confirm" element={<UpgradePlanConfirm />} />

        {/* Nếu không tìm thấy route nào */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
