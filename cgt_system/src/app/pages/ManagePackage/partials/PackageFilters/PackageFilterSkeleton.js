import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PackageFiltersSkeleton() {
  return (
    <div className="row mx-3 justify-content-between my-0">
      <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
        <div className="dt-length d-flex align-items-center gap-2 mb-0 mb-md-6">
          <Skeleton height={20} width={50} />
          <Skeleton height={35} width={100} />
        </div>
      </div>
      <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
        <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
          <div className="dt-search mb-md-6 mb-2">
            <Skeleton height={35} width={200} />
          </div>
          <div className="user_role w-px-200 my-md-0 mt-6 mb-2">
            <Skeleton height={35} width={150} />
          </div>
          <div className="dt-buttons btn-group flex-wrap d-flex gap-4 mb-md-0 mb-6">
            <Skeleton height={40} width={150} />
          </div>
        </div>
      </div>
    </div>
  );
}
