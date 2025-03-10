import React, { useState } from "react";
import styles from "./navbar.module.scss";
import { navbarItems } from "../../constants/navbarItems";
import { useNavigate } from "react-router";
import useUser from "../../hooks/useUser";
import default_avatar from "../../assets/img/avatars/default-avatar.jpg";
import Notifications from "../Notifications/Notifications";

export default function Navbar({ user }) {
  const menuItems = navbarItems[user.role] || [];
  const [isShowDropdownUser, setIsShowDropdownUser] = useState(false);
  const { clearUser } = useUser();
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    setIsShowDropdownUser((prev) => !prev);
    navigate(path);
  };
  const [currentTheme, setCurrentTheme] = useState(
    document.documentElement.getAttribute("data-bs-theme")
  );

  const handleSetTheme = (theme) => {
    setCurrentTheme(theme);
    const isDark =
      document.documentElement.getAttribute("data-bs-theme") === theme;
    if (!isDark) {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };
  return (
    <nav
      className={`${styles.layout_navbar} layout-navbar container-xxl navbar-detached navbar navbar-expand-xl align-items-center bg-navbar-theme`}
      id="layout-navbar"
    >
      <div
        className="navbar-nav-right d-flex align-items-center justify-content-end"
        id="navbar-collapse"
      >
        <div className="navbar-nav align-items-center">
          <div className="nav-item navbar-search-wrapper mb-0">
            <div className="nav-item nav-link search-toggler px-0">
              <span
                className="d-inline-block text-body-secondary fw-normal"
                id="autocomplete"
              >
                <div
                  className="aa-Autocomplete"
                  role="combobox"
                  aria-expanded="false"
                  aria-haspopup="listbox"
                  aria-labelledby="autocomplete-0-label"
                >
                  <button
                    className="aa-DetachedSearchButton"
                    title="Search"
                    id="autocomplete-0-label"
                  >
                    <div className="aa-DetachedSearchButtonIcon">
                      <svg
                        className="aa-SubmitIcon"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
                      </svg>
                    </div>
                    <div className="aa-DetachedSearchButtonPlaceholder">
                      Search [CTRL + K]
                    </div>
                    <div className="aa-DetachedSearchButtonQuery"></div>
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>
        <ul className="navbar-nav flex-row align-items-center ms-md-auto">
          <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              id="nav-theme"
              href="javascript:void(0);"
              data-bs-toggle="dropdown"
            >
              <i className="icon-base bx bx-sun icon-lg theme-icon-active"></i>
              <span className="d-none ms-2" id="nav-theme-text">
                Toggle theme
              </span>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="nav-theme-text"
            >
              <li>
                <button
                  type="button"
                  className={`dropdown-item align-items-center ${
                    currentTheme === "light" ? "active" : ""
                  }`}
                  onClick={() => handleSetTheme("light")}
                >
                  <span>
                    <i
                      className="icon-base bx bx-sun icon-md me-3"
                      data-icon="sun"
                    ></i>
                    Light
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`dropdown-item align-items-center ${
                    currentTheme === "dark" ? "active" : ""
                  }`}
                  onClick={() => handleSetTheme("dark")}
                >
                  <span>
                    <i
                      className="icon-base bx bx-moon icon-md me-3"
                      data-icon="moon"
                    ></i>
                    Dark
                  </span>
                </button>
              </li>
            </ul>
          </li>

          {/* Notifications */}
          <Notifications />

          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <button
              className="nav-link dropdown-toggle hide-arrow p-0 show"
              data-bs-toggle="dropdown"
              onClick={() => setIsShowDropdownUser((prev) => !prev)}
            >
              <div className="avatar avatar-online">
                <img
                  src={user.avatar ? user.avatar : default_avatar}
                  alt="Avatar"
                  className="rounded-circle"
                />
              </div>
            </button>
            <ul
              className={`${
                styles.dropdown_menu
              } dropdown-menu dropdown-menu-end ${
                isShowDropdownUser && "show"
              }`}
            >
              <li>
                <a
                  className="dropdown-item"
                  href="pages-account-settings-account.html"
                >
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img
                          src={user.avatar ? user.avatar : default_avatar}
                          alt="Avatar"
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{user.fullName}</h6>
                      <small className="text-body-secondary">
                        {user.role === "admin"
                          ? "Admin"
                          : user.role === "member"
                          ? "Member"
                          : "Doctor"}
                      </small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider my-1"></div>
              </li>
              {menuItems.map((item, index) => {
                if (item.label === "Billing Plan") {
                  return (
                    <li key={index}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleMenuClick(item.path)}
                      >
                        <span className="d-flex align-items-center align-middle">
                          <i
                            className={`flex-shrink-0 icon-base ${item.icon} icon-md me-3`}
                          ></i>
                          <span className="flex-grow-1 align-middle">
                            {item.label}
                          </span>
                          <span className="flex-shrink-0 badge rounded-pill bg-danger">
                            4
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={index}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleMenuClick(item.path)}
                    >
                      <i className={`icon-base ${item.icon} icon-md me-3`}></i>
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
              <li>
                <div className="dropdown-divider my-1"></div>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => clearUser()}>
                  <i className="icon-base bx bx-power-off icon-md me-3"></i>
                  <span>Log Out</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
