import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home/Home";
import NotFound from "../pages/Error/NotFound";
import UserLayouts from "../layouts/UserLayouts";
import PricingPage from "../pages/Pricing/PricingPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";
import EmailForm from "../pages/EmailForm/EmailForm";
import CodeForm from "../pages/CodeForm";
import ResetPasswordForm from "../pages/ResetPasswordForm";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="forgot-password/email" element={<EmailForm />} />
        <Route path="forgot-password/code" element={<CodeForm />} />
        <Route
          path="forgot-password/reset-password"
          element={<ResetPasswordForm />}
        />
      </Routes>
    </BrowserRouter>
  );
}
