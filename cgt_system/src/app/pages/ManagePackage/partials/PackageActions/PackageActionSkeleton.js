import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PackageActionsSkeleton() {
  return (
    <div className="d-flex align-items-center">
      <div style={{ marginRight: "0.5rem" }}>
        <Skeleton height={32} width={32} />
      </div>

      <div style={{ marginRight: "0.5rem" }}>
        <Skeleton height={32} width={32} />
      </div>

      <div>
        <Skeleton height={32} width={32} />
      </div>
    </div>
  );
}
