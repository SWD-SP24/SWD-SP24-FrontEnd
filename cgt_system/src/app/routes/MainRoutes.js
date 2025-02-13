import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home/Home";
import NotFound from "../pages/Error/NotFound";
import UserLayouts from "../layouts/UserLayouts";
import PricingPage from "../pages/Pricing/PricingPage";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>
        <Route path="/user-profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}
