import React, { useEffect, useState } from "react";
import AddChildButton from "./partials/AddChildButton";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import "./ManageChildren.scss";
import ActionButton from "./partials/ActionButton";
import Avatar from "../../components/Avatar/Avatar";
import { Link } from "react-router";
import baby_girl from "../../assets/img/illustrations/baby_girl.jpg";
import baby_boy from "../../assets/img/illustrations/baby_boy.jpg";
export default function ManageChildren() {
  const { response, callApi } = useApi({
    url: `${API_URLS.CHILDREN.GET_CHILDREN_LIST}`,
    method: "GET",
  });

  const [filterName, setFilterName] = useState("");
  const [filterGender, setFilterGender] = useState("");
  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    console.log(response);
  }, [response]);

  if (!response) {
    return <div> Loading </div>;
  }

  const BloodTypeLabel = ({ bType }) => {
    if (bType === "A") {
      return <span class="badge-blood badge-a">A</span>;
    }
    if (bType === "B") {
      return <span class="badge-blood badge-b">B</span>;
    }
    if (bType === "AB") {
      return <span class="badge-blood badge-ab">AB</span>;
    }
    if (bType === "O") {
      return <span class="badge-blood badge-o">O</span>;
    }
  };
  const filteredChildren = response.data.filter((child) => {
    return (
      (filterName === "" ||
        child.fullName.toLowerCase().includes(filterName.toLowerCase())) &&
      (filterGender === "" ||
        child.gender.toLowerCase() === filterGender.toLowerCase()) &&
      child.status === 1
    );
  });
  return (
    <div className="card">
      <div className="card-datatable">
        <div
          id="DataTables_Table_0_wrapper"
          className="dt-container dt-bootstrap5 dt-empty-footer"
        >
          <div
            className="row mx-3 justify-content-between my-0"
            style={{ height: "58.225px" }}
          >
            <div
              className="d-md-flex align-items-center dt-layout-end col-md-auto d-flex gap-md-4 justify-content-start gap-4 flex-wrap mt-0"
              style={{ paddingLeft: "8px" }}
            >
              {/* <div className={"table-size"}>
                <label htmlFor="dt-length-0">Show</label>
                <div>
                  <select
                    name="DataTables_Table_0_length"
                    aria-controls="DataTables_Table_0"
                    className="form-select"
                    id="dt-length-0"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div> */}
            </div>
            <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
              <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
                <div className="  d-flex align-items-center ">
                  <input
                    type="search"
                    className="form-control"
                    id="dt-search-0"
                    placeholder="Search Child"
                    aria-controls="DataTables_Table_0"
                    onChange={(e) => setFilterName(e.target.value)}
                  />
                  <label htmlFor="dt-search-0"></label>
                </div>
                <div className="user_role w-px-200 my-md-0 mt-6 mb-2">
                  <select
                    id="UserRole"
                    className="form-select text-capitalize"
                    onChange={(e) => setFilterGender(e.target.value)}
                  >
                    <option value=""> Select Gender </option>
                    <option value="male" className="text-capitalize">
                      Male
                    </option>
                    <option value="female" className="text-capitalize">
                      Female
                    </option>
                  </select>
                </div>
                <div className="dt-buttons  flex-wrap d-flex gap-4 mb-md-0 mb-6">
                  <AddChildButton refetch={callApi} />
                </div>
              </div>
            </div>
          </div>

          <div className="justify-content-between dt-layout-table">
            <div className="d-md-flex justify-content-between align-items-center table-responsive dt-layout-full">
              <table
                className="datatables-users table border-top dtr-column dataTable"
                id="DataTables_Table_0"
                aria-describedby="DataTables_Table_0_info"
                style={{ width: "100%" }}
              >
                <colgroup>
                  <col data-dt-column="1" style={{ width: "473.375px" }} />
                  <col data-dt-column="2" style={{ width: "313.656px" }} />
                  <col data-dt-column="3" style={{ width: "300.594px" }} />
                  <col data-dt-column="4" style={{ width: "200px" }} />
                  <col data-dt-column="5" style={{ width: "244.688px" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th
                      data-dt-column="1"
                      rowSpan="1"
                      colSpan="1"
                      aria-sort="descending"
                      aria-label="User: Activate to remove sorting"
                      tabIndex="0"
                    >
                      <span className="dt-column-title" role="button">
                        Name
                      </span>
                      <span className="dt-column-order"></span>
                    </th>
                    <th data-dt-column="2" rowSpan="1" colSpan="1" tabIndex="0">
                      <span className="dt-column-title" role="button">
                        Gender
                      </span>
                      <span className="dt-column-order"></span>
                    </th>
                    <th data-dt-column="3" rowSpan="1" colSpan="1" tabIndex="0">
                      <span className="dt-column-title" role="button">
                        Date of birth
                      </span>
                      <span className="dt-column-order"></span>
                    </th>
                    <th
                      data-dt-column="4"
                      rowSpan="1"
                      colSpan="1"
                      aria-sort="descending"
                      tabIndex="0"
                    >
                      <span className="dt-column-title">Blood-type</span>
                    </th>

                    <th
                      data-dt-column="5"
                      rowSpan="1"
                      colSpan="1"
                      className="dt-orderable-none"
                      aria-label="Actions"
                    >
                      <span className="dt-column-title">Actions</span>
                      <span className="dt-column-order"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChildren.length > 0 ? (
                    filteredChildren.map((child) => (
                      <tr key={child.childrenId}>
                        <td className="sorting_1">
                          <Link
                            to={`${child.childrenId}/overview`}
                            className="d-flex justify-content-start align-items-center user-name"
                          >
                            <div>
                              <Avatar
                                src={
                                  child?.avatar
                                    ? child?.avatar
                                    : child?.gender === "male"
                                    ? baby_boy
                                    : baby_girl
                                }
                                className="child-avatar"
                              />
                            </div>
                            <div className="d-flex flex-column">
                              <span className="text-truncate">
                                {child.fullName}
                              </span>
                            </div>
                          </Link>
                        </td>
                        <td>
                          <span className="badge bg-label-info">
                            {child.gender === "male" ? "Male" : "Female"}
                          </span>
                        </td>
                        <td>
                          <span className="text-truncate">{child.dob}</span>
                        </td>
                        <td>
                          <BloodTypeLabel bType={child.bloodType} />
                        </td>
                        <td>
                          <ActionButton
                            childId={child.childrenId}
                            refetch={callApi}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4">
                        No children found. Please add a new child.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
