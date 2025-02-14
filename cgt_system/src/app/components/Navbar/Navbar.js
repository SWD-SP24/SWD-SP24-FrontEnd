import { useState } from "react";
import Avatar from "../Avatar/Avatar";

const Navbar = ({ response }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme">
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a className="nav-item nav-link px-0 me-xl-4" href="#">
          <i className="bx bx-menu bx-sm"></i>
        </a>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        {/* Search */}
        <div className="navbar-nav align-items-center">
          <div className="nav-item d-flex align-items-center">
            <i className="bx bx-search fs-4 lh-0"></i>
            <input
              type="text"
              className="form-control border-0 shadow-none"
              placeholder="Search..."
            />
          </div>
        </div>

        <ul className="navbar-nav flex-row align-items-center ms-auto">
          {/* User */}
          <li className="nav-item navbar-dropdown dropdown-user dropdown position-relative">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              href="#"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="avatar avatar-online">
                <Avatar
                  src={response?.data?.avatar || ""}
                  alt="navAvatar"
                  className="w-40 h-40 rounded-circle"
                />
              </div>
            </a>
            <ul
              className={`dropdown-menu dropdown-menu-start ${
                dropdownOpen ? "show" : ""
              }`}
              style={{ right: 0, left: "auto" }} // Ensures dropdown stays within bounds
            >
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <Avatar
                          src={response?.data?.avatar || ""}
                          alt="navAvatar"
                          className="w-40 h-40 rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block">John Doe</span>
                      <small className="text-muted">Admin</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <i className="bx bx-user me-2"></i>
                  <span className="align-middle">My Profile</span>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <a className="dropdown-item" href="auth-login-basic.html">
                  <i className="bx bx-power-off me-2"></i>
                  <span className="align-middle">Log Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
