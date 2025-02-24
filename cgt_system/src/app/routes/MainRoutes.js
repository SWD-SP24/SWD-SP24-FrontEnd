import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

// Layouts
import VisitorLayout from "../layouts/VisitorLayout/VisitorLayout";
import MainLayout from "../layouts/MainLayout";
import AccountSettingLayout from "../layouts/AccountSettingLayout";

// Pages Publlic
import Home from "../pages/Home/Home";
import PricingPage from "../pages/Pricing/PricingPage";
import NotFound from "../pages/Error/NotFound";

// Auth Pages
import Login from "../pages/Login/Login";
import Register from "../pages/Register";
import EmailForm from "../pages/EmailForm/EmailForm";
import CodeForm from "../pages/CodeForm";
import ResetPasswordForm from "../pages/ResetPasswordForm";

import Welcome from "../pages/Welcome";

// Admin Routes
import AdminRoutes from "./AdminRoutes";

// Account Setting Pages
import ChangePassword from "../pages/ChangePassword";

// Not Authorized
import NotAuthorized from "../pages/NotAuthorized";

// Coming Soon Page
import ComingSoon from "../pages/ComingSoon";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Các trang public với VisitorLayout */}
        <Route element={<VisitorLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<PricingPage />} />
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

          <Route path="/dashboard" element={<ComingSoon />} />

          {/* Account Setting với layout riêng */}
          <Route path="account-setting" element={<AccountSettingLayout />}>
            {/* Thay trang này bằng trang edit profile */}
            <Route path="account" element={<ComingSoon />} />

            <Route path="security" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* Các trang khác */}
        <Route path="welcome" element={<Welcome />} />
        <Route path="not-authorized" element={<NotAuthorized />} />

        {/* Nếu không tìm thấy route nào */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
