import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home/Home";
import NotFound from "../pages/Error/NotFound";
import UserLayouts from "../layouts/UserLayouts";
import Pricing from "../pages/Pricing/PricingPage";
import PricingPage from "../pages/Pricing/PricingPage";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
