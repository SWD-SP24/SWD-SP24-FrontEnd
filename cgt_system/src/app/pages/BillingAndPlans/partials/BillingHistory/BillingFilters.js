import React from "react";
import { sPagination } from "../../billingAndPlansStore";

export default function BillingFilters({ onFetchBillings }) {
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

    onFetchBillings(newCurrentPage, newItemsPerPage);
  };
  return (
    <div class="row border-bottom mx-0 px-3">
      <div class="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto px-4 mt-0">
        <h5 class="card-title mb-0 text-md-start text-center pt-6 pt-md-0">
          Billing List
        </h5>
      </div>
      <div class="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto px-4 mt-0 gap-2">
        <div class="dt-length mb-md-6 mb-0">
          <select
            name="DataTables_Table_1_length"
            aria-controls="DataTables_Table_1"
            class="form-select ms-0"
            id="dt-length-1"
            onChange={handleChange}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <label for="dt-length-1"></label>
        </div>
      </div>
    </div>
  );
}
