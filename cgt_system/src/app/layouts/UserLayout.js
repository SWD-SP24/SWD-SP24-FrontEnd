import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import "../assets/fonts/boxicons.css";
import "../styles/demo.css";
import "../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css";
import "bootstrap";
import Navbar from "../components/Navbar/Navbar.js";
import API_URLS from "../config/apiUrls";
import showToast from "../util/showToast";
import useApi from "../hooks/useApi";
import Sidebar from "../components/Sidebar/Sidebar.js";
export default function UserLayout() {
  const { isLoading, response, error, callApi } = useApi({
    url: `${API_URLS.USER.CURRENT_USER}`,
    method: "GET",
    body: null,
  });

  const [role, setRole] = useState("");

  const getSavedState = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [activeMenu, setActiveMenu] = useState(
    getSavedState("activeMenu", null)
  );
  const [activeSubMenu, setActiveSubMenu] = useState(
    getSavedState("activeSubMenu", null)
  );

  useEffect(() => {
    console.log("API Call");
    callApi();
  }, []);

  useEffect(() => {
    if (response) {
      setRole(response.data.role);
      console.log("API Response:", response);
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      console.error("API Error:", error);
    }
  }, [error]);

  useEffect(() => {
    localStorage.setItem("activeMenus", JSON.stringify(activeMenu));
    localStorage.setItem("activeSubMenu", JSON.stringify(activeSubMenu));
  }, [activeMenu, activeSubMenu]);

  const navigate = useNavigate();
  const LogOut = () => {
    Cookies.remove("auth_token");
    navigate("/login");
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleSubMenuClick = (subMenu, menu) => {
    setActiveSubMenu(subMenu);
    setActiveMenu(menu);
  };

  return (
    <>
      <div class="layout-wrapper layout-content-navbar bg-body">
        <div class="layout-container">
          <Sidebar />
          <div class="layout-page">
            <Navbar response={response} handleLogOut={LogOut} />
            {response ? (
              <Outlet context={{ response, callApi }} />
            ) : (
              <div
                className="container-xxl flex-grow-1 container-p-y d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
              >
                <span
                  className="spinner-border spinner-border-lg text-primary"
                  role="status"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderWidth: "0.5rem",
                  }}
                ></span>
              </div>
            )}
          </div>
        </div>
        <div class="layout-overlay layout-menu-toggle"></div>
      </div>
    </>
  );
}
