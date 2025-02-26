import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PackageActionsSkeleton() {
  return (
    <div className="d-flex align-items-center">
      <button className="btn btn-icon me-1">
        <Skeleton height={22} width={22} />
      </button>
      <i className="btn btn-icon delete-record">
        <Skeleton height={22} width={22} />
      </i>
    </div>
  );
}
