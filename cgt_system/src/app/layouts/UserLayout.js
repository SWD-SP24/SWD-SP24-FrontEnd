import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import "../assets/fonts/boxicons.css";
import "../styles/demo.css";
import "../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css";
import "bootstrap";
import Navbar from "../components/Navbar/Navbar.js";
import API_URLS from "../config/apiUrls";
import useApi from "../hooks/useApi";
import Sidebar from "../components/Sidebar/Sidebar.js";
export default function UserLayout() {
  const { isLoading, response, error, callApi } = useApi({
    url: `${API_URLS.USER.CURRENT_USER}`,
    method: "GET",
    body: null,
  });

  useEffect(() => {
    console.log("API Call");
    callApi();
  }, []);

  useEffect(() => {
    if (response) {
      console.log("API Response:", response);
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      console.error("API Error:", error);
    }
  }, [error]);

  const LogOut = () => {
    Cookies.remove("auth_token");
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
              <>
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
              </>
            )}
          </div>
        </div>
        <div class="layout-overlay layout-menu-toggle"></div>
      </div>
    </>
  );
}
