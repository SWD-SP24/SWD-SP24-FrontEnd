import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PaginationSkeleton() {
  return (
    <div className="row mx-3 justify-content-between">
      <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto ps-2 mt-0">
        <div className="dt-info" aria-live="polite" role="status">
          <Skeleton height={20} width={150} />
        </div>
      </div>
      <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto justify-content-md-between justify-content-center d-flex flex-wrap gap-4 mb-sm-0 mb-4 mt-0">
        <div className="dt-paging">
          <nav aria-label="pagination">
            <ul className="pagination d-flex gap-1">
              <li className="dt-paging-button page-item disabled">
                <Skeleton height={40} width={40} />
              </li>
              <li className="dt-paging-button page-item active">
                <Skeleton height={40} width={40} />
              </li>
              <li className="dt-paging-button page-item">
                <Skeleton height={40} width={40} />
              </li>
              <li className="dt-paging-button page-item">
                <Skeleton height={40} width={40} />
              </li>
              <li className="dt-paging-button page-item">
                <Skeleton height={40} width={40} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
