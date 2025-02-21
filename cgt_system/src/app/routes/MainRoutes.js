import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home/Home";
import NotFound from "../pages/Error/NotFound";
import PricingPage from "../pages/Pricing/PricingPage";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";
import VisitorLayout from "../layouts/VisitorLayout/VisitorLayout";
import UserLayout from "../layouts/UserLayout";
import EmailForm from "../pages/EmailForm/EmailForm";
import CodeForm from "../pages/CodeForm";
import ResetPasswordForm from "../pages/ResetPasswordForm";
import ManageUser from "../pages/ManageUser/ManageUser";
import AdminRoutes from "./AdminRoutes";
import NotAuthorized from "../pages/NotAuthorized";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<VisitorLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>

        {/* Auth */}
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

        {/* Parent */}
        <Route path="/member" element={<UserLayout />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="not-authorized" element={<NotAuthorized />} />

        {/* Admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
