import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import styles from "./manageUser.module.scss";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import debounce from "../../util/debounce";
import ActionDropdown from "./partials/ActionDropdown.js";
const cx = classNames.bind(styles);
export default function ManageUser() {
  const { response, error, callApi } = useApi({
    url: API_URLS.USER.GET_USERS_LIST,
    method: "GET",
  });

  const [filterRole, setFilterRole] = useState("");
  const [filterMembership, setFilterMembership] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSearch, setFilterSearch] = useState("");

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response) {
      console.log("API Response:", response);
    }
  }, [response]); // Chạy khi response thay đổi

  useEffect(() => {
    if (error) {
      console.error("API Error:", error);
    }
  }, [error]); // Chạy khi error thay đổi

  const handleFilterRole = (e) => {
    e.preventDefault();
    setFilterRole(e.target.value);
  };

  const handleFilterStatus = (e) => {
    e.preventDefault();
    setFilterStatus(e.target.value);
  };

  const handleFilterMembership = (e) => {
    e.preventDefault();
    setFilterMembership(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilterSearch(e.target.value);
  };
  return (
    <div class="content-wrapper">
      {/* <!-- Content --> */}

      <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">
          <span class="text-muted fw-light">Manage /</span> Users
        </h4>

        <div class="card">
          <div className={cx("table-banner")}>
            <div className={cx("table-banner-title")}>Search filters</div>
            <div className={cx("table-banner-filters")}>
              <select
                className={cx("form-select", "table-banner-search")}
                onChange={handleFilterRole}
              >
                <option value="" selected>
                  Select Role
                </option>
                <option value="member">Member</option>
                <option value="doctor">Doctor</option>
              </select>
              <select
                className={cx("form-select", "table-banner-search")}
                onChange={handleFilterMembership}
              >
                <option value="" selected>
                  Select Membership
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <select
                className={cx("form-select", "table-banner-search")}
                onChange={handleFilterStatus}
              >
                <option value="" selected>
                  Select Status
                </option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <hr className="m-0" />
          <div className={cx("p-6", "table-header")}>
            <div className={cx("table-header-right-banner")}>
              <button
                className={cx(
                  "btn",
                  "btn-md btn-outline-secondary",
                  "border",
                  "border-2",
                  "d-flex",
                  "align-items-center",
                  "px-3",
                  "py-2"
                )}
              >
                <i
                  class="bx bx-export"
                  style={{ fontSize: "1.2rem", marginRight: "6px" }}
                ></i>
                <span>EXPORT</span>
              </button>
            </div>
            <div className={cx("table-header-left-banner")}>
              <input
                className={cx("form-control", "search-bar")}
                type="search"
                placeholder="Search by name, email"
                id="html5-search-input"
                onChange={debounce(handleSearch, 300)}
              />
              <button
                type="button"
                className={cx("btn", "btn-primary", "add-user-button")}
              >
                Add User
              </button>
            </div>
          </div>
          <div class="table-responsive text-nowrap">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      id="selectAll"
                      class="form-check-input"
                      style={{ transform: "scale(1.1547)" }}
                    />
                  </th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Membership</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody class="table-border-bottom-0">
                {/* <!-- First Row --> */}
                {response ? (
                  response &&
                  response.data
                    .filter((user) => {
                      if (filterRole != "" && !user.role.includes(filterRole)) {
                        return false;
                      }
                      if (
                        filterMembership != "" &&
                        !(user.membershipPackageId == filterMembership)
                      ) {
                        return false;
                      }
                      if (
                        filterStatus != "" &&
                        !(user.status === filterStatus)
                      ) {
                        return false;
                      }
                      if (
                        filterSearch != "" &&
                        !user.fullName
                          .toLowerCase()
                          .includes(filterSearch.toLowerCase())
                      ) {
                        if (!user.email.includes(filterSearch)) {
                          return false;
                        }
                      }
                      return true;
                    })
                    .map((user) => {
                      return (
                        <tr key={user.id}>
                          <td>
                            <input
                              type="checkbox"
                              class="selectRow form-check-input"
                            />
                          </td>
                          <td className={cx("user-content")}>
                            <img
                              src={user.avatar}
                              className={cx("user-content-avatar")}
                            />
                            <div className={cx("user-content-name")}>
                              <div className={cx("user-content-name-title")}>
                                {user.fullName}
                              </div>
                              <div className={cx("user-content-subtitle")}>
                                @{user.fullName}
                              </div>
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td style={{ textAlign: "center" }}>
                            {user.membershipPackageId}
                          </td>
                          <td>{user.role}</td>
                          <td>
                            <span class="badge bg-label-success me-1">
                              {user.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            {/* <div class="dropdown">
                              <button
                                type="button"
                                class="btn p-0 dropdown-toggle hide-arrow"
                                data-bs-toggle="dropdown"
                              >
                                <i class="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div class="dropdown-menu">
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  <i class="bx bx-edit-alt me-1"></i> Edit
                                </a>
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  <i class="bx bx-trash me-1"></i> Delete
                                </a>
                              </div>
                            </div> */}
                            <ActionDropdown />
                          </td>
                        </tr>
                      );
                    })
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

                {/* <!-- Second Row --> */}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--/ Hoverable Table rows --> */}
      </div>
      {/* <!-- / Content --> */}

      <div class="content-backdrop fade"></div>
    </div>
  );
}
