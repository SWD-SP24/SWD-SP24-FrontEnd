import React from "react";

export default function Pagination() {
  return (
    <div className="row mx-3 justify-content-between">
      <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
        <div
          className="dt-info"
          aria-live="polite"
          id="DataTables_Table_0_info"
          role="status"
        >
          Showing 1 to 10 of 30 entries
        </div>
      </div>
      <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto justify-content-md-between justify-content-center d-flex flex-wrap gap-4 mb-md-0 mb-6 mt-0">
        <div className="dt-paging">
          <nav aria-label="pagination">
            <ul className="pagination">
              <li className="dt-paging-button page-item disabled">
                <button
                  className="page-link previous"
                  role="link"
                  type="button"
                  aria-controls="DataTables_Table_0"
                  aria-disabled="true"
                  aria-label="Previous"
                  data-dt-idx="previous"
                  tabIndex="-1"
                >
                  <i className="icon-base bx bx-chevron-left scaleX-n1-rtl icon-18px"></i>
                </button>
              </li>
              <li className="dt-paging-button page-item active">
                <button
                  className="page-link"
                  role="link"
                  type="button"
                  aria-controls="DataTables_Table_0"
                  aria-current="page"
                  data-dt-idx="0"
                >
                  1
                </button>
              </li>
              <li className="dt-paging-button page-item">
                <button
                  className="page-link"
                  role="link"
                  type="button"
                  aria-controls="DataTables_Table_0"
                  aria-current="page"
                  data-dt-idx="0"
                >
                  2
                </button>
              </li>
              <li className="dt-paging-button page-item">
                <button
                  className="page-link"
                  role="link"
                  type="button"
                  aria-controls="DataTables_Table_0"
                  aria-current="page"
                  data-dt-idx="0"
                >
                  3
                </button>
              </li>
              <li className="dt-paging-button page-item disabled">
                <button
                  className="page-link next"
                  role="link"
                  type="button"
                  aria-controls="DataTables_Table_0"
                  aria-disabled="true"
                  aria-label="Next"
                  data-dt-idx="next"
                  tabIndex="-1"
                >
                  <i className="icon-base bx bx-chevron-right scaleX-n1-rtl icon-18px"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
