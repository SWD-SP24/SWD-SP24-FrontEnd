import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { accountSettingNavbarItems } from "../../constants/accountSettingNavbarItems";

export default function Nav({ role }) {
  const location = useLocation();

  const menuItems = accountSettingNavbarItems[role] || [];

  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    menuItems.forEach((item) => {
      if (location.pathname.endsWith(item.path)) {
        setActiveMenu(item.label);
      }
    });
  }, [location.pathname]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="nav-align-top">
      <ul className="nav nav-pills flex-column flex-md-row mb-6 gap-md-0 gap-2">
        {menuItems.map((menuItem, index) => (
          <li key={index} className="nav-item">
            <Link
              to={menuItem.path}
              className={`nav-link ${
                activeMenu === menuItem.label ? "active" : ""
              }`}
              onClick={() => handleMenuClick(menuItem.label)}
            >
              {menuItem.icon && (
                <i className={`icon-base ${menuItem.icon} icon-sm me-1_5`}></i>
              )}
              {menuItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
