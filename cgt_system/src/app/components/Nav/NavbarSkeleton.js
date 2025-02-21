import React from "react";
import styles from "./navSkeleton.module.scss";

export default function NavbarSkeleton() {
  return (
    <nav
      className={`${styles.skeleton_box} layout-navbar container-xxl navbar-detached navbar navbar-expand-xl align-items-center bg-navbar-theme`}
      id="layout-navbar"
    ></nav>
  );
}
