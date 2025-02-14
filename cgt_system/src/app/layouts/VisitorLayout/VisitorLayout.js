import React from "react";
import Navbar from "./NavbarUser";
import { Outlet } from "react-router";
import Footer from "./FooterUser";

export default function VisitorLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
