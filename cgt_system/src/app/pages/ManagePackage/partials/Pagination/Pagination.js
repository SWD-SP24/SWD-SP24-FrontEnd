import React from "react";

export default function Pagination({
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
  onPageChange,
}) {
  const handleChange = (page) => {
    onPageChange(page);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="row mx-3 justify-content-between">
      <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
        <div className="dt-info" aria-live="polite" role="status">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}{" "}
          to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          entries
        </div>
      </div>
      <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto justify-content-md-between justify-content-center d-flex flex-wrap gap-4 mb-md-0 mb-6 mt-0">
        <div className="dt-paging">
          <nav aria-label="pagination">
            <ul className="pagination">
              <li
                className={`dt-paging-button page-item ${
                  currentPage === 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link previous"
                  role="link"
                  type="button"
                  aria-label="Previous"
                  disabled={currentPage === 1}
                  onClick={() => handleChange(currentPage - 1)}
                >
                  <i className="icon-base bx bx-chevron-left scaleX-n1-rtl icon-18px"></i>
                </button>
              </li>
              {pages.map((page) => (
                <li
                  key={page}
                  className={`dt-paging-button page-item ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    role="link"
                    type="button"
                    onClick={() => handleChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li
                className={`dt-paging-button page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link next"
                  role="link"
                  type="button"
                  aria-label="Next"
                  disabled={currentPage === totalPages}
                  onClick={() => handleChange(currentPage + 1)}
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
