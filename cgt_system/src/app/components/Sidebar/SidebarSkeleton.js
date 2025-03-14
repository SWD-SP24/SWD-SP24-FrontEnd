import React from "react";
import styles from "./sidebarSkeleton.module.scss";
import AppBrandLogo from "../AppBrandLogo/AppBrandLogo";
import { Link } from "react-router";

export default function SidebarSkeleton() {
  return (
    <aside className="layout-menu menu-vertical menu bg-menu-theme">
      <div className="app-brand demo">
        <Link to={"/"} className="app-brand-link">
          <AppBrandLogo />
        </Link>
        <Link className="layout-menu-toggle menu-link text-large ms-auto d-block">
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </Link>
      </div>
      <div className="menu-inner-shadow"></div>
      <ul className="menu-inner py-1">
        {Array.from({ length: 8 }).map((_, index) => (
          <li key={index} className="menu-item">
            <div
              className={`${styles.skeleton_box} menu-link flex items-center gap-2 p-3`}
            ></div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
