import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router";
import "../../styles/demo.css";
import AppBrandLogo from "../AppBrandLogo/AppBrandLogo";
import { sidebarItems } from "../../constants/sidebarItems";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import UpgradePlanModal from "../../pages/UpgradePlanModal/UpgradePlanModal";
import useUser from "../../hooks/useUser";
import { useLogout } from "../../hooks/useLogout";

export default function Sidebar({ role }) {
  const { setUser } = useUser();
  const { logout } = useLogout();
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = sidebarItems[role] || [];

  const [permissions, setPermissions] = useState([]);
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const { response, callApi } = useApi({
    url: API_URLS.USER.MEMBERSHIP_PACKAGE.CURRENT,
    method: "GET",
  });

  useEffect(() => {
    if (role === "member") {
      callApi();
    }
  }, []);

  useEffect(() => {
    if (response) {
      const permissions = response?.membershipPackage?.permissions || [];
      setPermissions(permissions);
      Cookies.set("permissions", JSON.stringify(permissions));
    }
  }, [response]);

  useEffect(() => {
    let found = false;

    menuItems.forEach((item) => {
      if (item.path === location.pathname) {
        setActiveSubMenu(item.title);
        found = true;
      }
      item.submenu?.forEach((subItem) => {
        if (subItem.path === location.pathname) {
          setActiveSubMenu(subItem.title);
          found = true;
        }
      });
    });

    if (!found) {
      setActiveMenu("");
      setActiveSubMenu("");
    }
  }, [location.pathname]);

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleSubMenuClick = (subMenu, menu, redirectTo) => {
    setActiveSubMenu(subMenu);
    setActiveMenu(menu);

    if (redirectTo) navigate(redirectTo);
  };

  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu-fixed layout-menu menu-vertical menu bg-menu-theme"
        style={{
          position: "fixed",
          insetBlock: "0",
          touchAction: "none",
          userSelect: "none",
          WebkitUserDrag: "none",
          WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
        }}
      >
        <div className="app-brand demo">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setUser(null);
              logout();
            }}
            className="app-brand-link"
          >
            <AppBrandLogo />
          </div>
        </div>
        <div className="menu-inner-shadow"></div>
        <ul className="menu-inner py-1">
          {menuItems.map((item, index) => {
            const hasPermission =
              !item.permission ||
              permissions.some((p) => p.permissionName === item.permission);

            return (
              <li
                key={index}
                className={`menu-item ${
                  activeMenu === item.title ? "open" : ""
                } ${
                  activeSubMenu === item.title ||
                  (item.submenu &&
                    item.submenu.some(
                      (subItem) =>
                        activeSubMenu === subItem.title &&
                        (!subItem.permission ||
                          permissions.some(
                            (p) => p.permissionName === subItem.permission
                          ))
                    ))
                    ? "active"
                    : ""
                }`}
              >
                {item.submenu ? (
                  <>
                    <div
                      className={`menu-link menu-toggle ${
                        hasPermission ? "" : "locked"
                      }`}
                      onClick={() =>
                        hasPermission && handleMenuClick(item.title)
                      }
                    >
                      <i className={`menu-icon tf-icons ${item.icon}`}></i>
                      <div data-i18n={item.title}>{item.title}</div>
                      {!hasPermission && (
                        <i className="bx bx-lock-alt text-warning ml-2"></i>
                      )}
                    </div>
                    <ul className="menu-sub">
                      {item.submenu.map((subItem, subIndex) => {
                        const subHasPermission =
                          !subItem.permission ||
                          permissions.some(
                            (p) => p.permissionName === subItem.permission
                          );

                        return (
                          <li
                            key={subIndex}
                            className={`menu-item ${
                              activeSubMenu === subItem.title ? "active" : ""
                            }`}
                          >
                            <div
                              className={`menu-link ${
                                subHasPermission ? "" : "locked"
                              }`}
                              onClick={() =>
                                subHasPermission &&
                                handleSubMenuClick(
                                  subItem.title,
                                  item.title,
                                  subItem.path
                                )
                              }
                            >
                              <div data-i18n={subItem.title}>
                                {subItem.title}
                              </div>
                              {!subHasPermission && (
                                <i className="bx bx-lock-alt text-warning ml-2"></i>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <div
                    data-bs-target={hasPermission ? "" : "#upgradePlanModal"}
                    data-bs-toggle={hasPermission ? "" : "modal"}
                    className={`menu-link ${hasPermission ? "" : "locked"}`}
                    onClick={() =>
                      hasPermission &&
                      handleSubMenuClick(item.title, "", item.path)
                    }
                  >
                    <i className={`menu-icon tf-icons bx ${item.icon}`}></i>
                    <div data-i18n={item.title}>{item.title}</div>
                    {!hasPermission && (
                      <div class="badge rounded-pill bg-label-primary text-uppercase fs-tiny ms-auto">
                        <i
                          className="bx bx-lock"
                          style={{ fontSize: "18px" }}
                        ></i>
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </aside>
      <UpgradePlanModal />
    </>
  );
}
