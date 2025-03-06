import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import "../../styles/demo.css";
import AppBrandLogo from "../AppBrandLogo/AppBrandLogo";
import { sidebarItems } from "../../constants/sidebarItems";

export default function Sidebar({ role }) {
  const location = useLocation();
  const menuItems = sidebarItems[role] || [];

  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");

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

  const handleSubMenuClick = (subMenu, menu) => {
    setActiveSubMenu(subMenu);
    setActiveMenu(menu);
  };

  return (
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
        <Link to={"/"} className="app-brand-link">
          <AppBrandLogo />
        </Link>
        <Link className="layout-menu-toggle menu-link text-large ms-auto d-block">
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </Link>
      </div>
      <div className="menu-inner-shadow"></div>
      <ul className="menu-inner py-1">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`menu-item ${activeMenu === item.title ? "open" : ""} ${
              activeSubMenu === item.title ||
              item.submenu?.some((subItem) => activeSubMenu === subItem.title)
                ? "active"
                : ""
            }`}
          >
            {item.submenu ? (
              <>
                <Link
                  to={item.path}
                  className="menu-link menu-toggle"
                  onClick={() => handleMenuClick(item.title)}
                >
                  <i className={`menu-icon tf-icons ${item.icon}`}></i>
                  <div data-i18n={item.title}>{item.title}</div>
                </Link>
                <ul className="menu-sub">
                  {item.submenu.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className={`menu-item ${
                        activeSubMenu === subItem.title ? "active" : ""
                      }`}
                    >
                      <Link
                        to={subItem.path}
                        className="menu-link"
                        onClick={() =>
                          handleSubMenuClick(subItem.title, item.title)
                        }
                      >
                        <div data-i18n={subItem.title}>{subItem.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link
                to={item.path}
                className="menu-link"
                onClick={() => handleSubMenuClick(item.title)}
              >
                <i className={`menu-icon tf-icons bx ${item.icon}`}></i>
                <div data-i18n={item.title}>{item.title}</div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
