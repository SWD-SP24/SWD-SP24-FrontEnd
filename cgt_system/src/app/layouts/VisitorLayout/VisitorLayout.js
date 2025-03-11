import React from "react";
import Navbar from "./NavbarUser";
import { Outlet } from "react-router";
import Footer from "./FooterUser";

export default function VisitorLayout() {
  return (
    <div className="visitor-layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
