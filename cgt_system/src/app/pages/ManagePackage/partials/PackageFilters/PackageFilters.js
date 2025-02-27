import React from "react";
import { sPagination } from "../../managePackageStore";

export default function PackageFilters({ onFetchPackages }) {
  const pagination = sPagination.use();

  const handleChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    const firstVisibleItemIndex =
      (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
    const newCurrentPage =
      Math.ceil(firstVisibleItemIndex / newItemsPerPage) || 1;
    sPagination.set((prev) => {
      prev.value.itemsPerPage = newItemsPerPage;
      prev.value.currentPage = newCurrentPage;
    });

    onFetchPackages(newCurrentPage, newItemsPerPage);
  };
  return (
    <div className="row mx-3 justify-content-between my-0">
      <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
        <div className="dt-length mb-0 mb-md-6">
          <label htmlFor="dt-length-0">Show</label>
          <select
            name="DataTables_Table_0_length"
            aria-controls="DataTables_Table_0"
            className="form-select"
            id="dt-length-0"
            onChange={handleChange}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
        <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
          <div className="dt-search mb-md-6 mb-2">
            <input
              type="search"
              className="form-control"
              id="dt-search-0"
              placeholder="Search Package"
              aria-controls="DataTables_Table_0"
            />
            <label htmlFor="dt-search-0"></label>
          </div>
          <div className="user_role w-px-200 my-md-0 mt-6 mb-2">
            <select id="UserRole" className="form-select text-capitalize">
              <option value=""> Select Status </option>
              <option value="Admin" className="text-capitalize">
                Active
              </option>
              <option value="Author" className="text-capitalize">
                Inactive
              </option>
            </select>
          </div>
          <div className="dt-buttons btn-group flex-wrap d-flex gap-4 mb-md-0 mb-6">
            <button
              className="btn add-new btn-primary"
              data-bs-target="#addRoleModal"
              data-bs-toggle="modal"
            >
              <span>
                <i className="icon-base bx bx-plus icon-sm me-0 me-sm-2"></i>
                <span className="d-none d-sm-inline-block">
                  Add New Package
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
