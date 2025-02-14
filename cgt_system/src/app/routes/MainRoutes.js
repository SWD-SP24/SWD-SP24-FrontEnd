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

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<VisitorLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/user-profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}
