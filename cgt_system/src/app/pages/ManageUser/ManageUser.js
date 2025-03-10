import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import API_URLS from "../../config/apiUrls";
import useApi from "../../hooks/useApi";
import debounce from "../../util/debounce";
import styles from "./manageUser.module.scss";
import ActionDropdown from "./partials/ActionDropdown.js";
import AddUserButton from "./partials/AddUserButton.js";
import Skeleton from "react-loading-skeleton";
import Avatar from "../../components/Avatar/Avatar.js";
const cx = classNames.bind(styles);
export default function ManageUser() {
  const { response, error, callApi } = useApi({
    url: `${API_URLS.USER.GET_USERS_LIST}?pageNumber=1&pageSize=8`,
    method: "GET",
  });

  const [filterRole, setFilterRole] = useState("");
  const [filterMembership, setFilterMembership] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response) {
      console.log("Get Users List Response:", response);
    }
  }, [response]); // Chạy khi response thay đổi

  useEffect(() => {
    if (error) {
      console.error("Get Users List Error:", error);
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

  const handleActivePage = (index) => {
    setActivePage(index);
    const customUrl = `${API_URLS.USER.GET_USERS_LIST}?pageNumber=${index}&pageSize=8`;
    callApi(null, customUrl);
  };

  const handleMinMaxPage = (direction) => {
    if (direction === "min") {
      setActivePage(1);
      const customUrl = `${API_URLS.USER.GET_USERS_LIST}?pageNumber=1&pageSize=8`;
      callApi(null, customUrl);
    }
    if (direction === "max") {
      setActivePage(response.pagination.lastVisiblePage);
      const customUrl = `${API_URLS.USER.GET_USERS_LIST}?pageNumber=${response.pagination.lastVisiblePage}&pageSize=8`;
      callApi(null, customUrl);
    }
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
              <AddUserButton refetch={callApi} />
            </div>
          </div>
          <div class="table-responsive text-nowrap">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Membership</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {/* <!-- First Row --> */}
              <tbody className="table-border-bottom-0">
                {response
                  ? response.data
                      .filter((user) => {
                        if (
                          filterRole !== "" &&
                          !user.role.includes(filterRole)
                        )
                          return false;
                        if (
                          filterMembership !== "" &&
                          !(user.membershipPackageId == filterMembership)
                        )
                          return false;
                        if (
                          filterStatus !== "" &&
                          !(user.status === filterStatus)
                        )
                          return false;
                        if (
                          filterSearch !== "" &&
                          !user.fullName
                            .toLowerCase()
                            .includes(filterSearch.toLowerCase())
                        ) {
                          if (!user.email.includes(filterSearch)) return false;
                        }
                        return true;
                      })
                      .map((user) => (
                        <tr key={user.id}>
                          <td className={cx("user-content")}>
                            <Avatar
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
                            <span className="badge bg-label-success me-1">
                              {user.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <ActionDropdown id={user.userId} />
                          </td>
                        </tr>
                      ))
                  : // Show skeleton loader if data is not yet loaded
                    [...Array(8)].map((_, index) => (
                      <tr key={index}>
                        <td>
                          <Skeleton width={16} height={16} />
                        </td>
                        <td className={cx("user-content")}>
                          <Skeleton circle width={32} height={32} />
                          <div style={{ marginLeft: "10px" }}>
                            <Skeleton width={100} height={12} />
                            <Skeleton
                              width={80}
                              height={10}
                              style={{ marginTop: "4px" }}
                            />
                          </div>
                        </td>
                        <td>
                          <Skeleton width={160} height={12} />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Skeleton width={30} height={12} />
                        </td>
                        <td>
                          <Skeleton width={60} height={12} />
                        </td>
                        <td>
                          <Skeleton width={50} height={20} />
                        </td>
                        <td>
                          <Skeleton width={30} height={16} />
                        </td>
                      </tr>
                    ))}
              </tbody>

              {/* <!-- Second Row --> */}
            </table>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation" className={cx("pagination-pos")}>
        <ul class="pagination justify-content-end">
          <li class="page-item prev">
            <a class="page-link" onClick={() => handleMinMaxPage("min")}>
              <i class="tf-icon bx bx-chevrons-left"></i>
            </a>
          </li>
          {response &&
            [...Array(response.pagination.lastVisiblePage)].map((_, index) => {
              return (
                <li class="page-item">
                  <a
                    className={
                      "page-link " + (index + 1 === activePage ? "active" : "")
                    }
                    key={index}
                    onClick={() => handleActivePage(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              );
            })}
          <li class="page-item next">
            <a class="page-link" onClick={() => handleMinMaxPage("max")}>
              <i class="tf-icon bx bx-chevrons-right"></i>
            </a>
          </li>
        </ul>
      </nav>
      {/* <!-- / Content --> */}

      <div class="content-backdrop fade"></div>
    </div>
  );
}
