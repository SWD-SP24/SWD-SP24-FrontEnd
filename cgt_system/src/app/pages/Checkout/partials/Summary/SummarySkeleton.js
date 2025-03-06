import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SummarySkeleton() {
  return (
    <div className="col-lg-5 card-body p-md-8">
      <h4 className="mb-2">
        <Skeleton width={120} height={24} />
      </h4>
      <p className="mb-8">
        <Skeleton width={"80%"} height={16} />
      </p>
      <div className="bg-lighter p-6 rounded">
        <div className="d-flex align-items-center mb-4">
          <Skeleton width={120} height={40} />
        </div>
        <div className="d-grid">
          <Skeleton width={"100%"} height={40} />
        </div>
      </div>
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">
            <Skeleton width={70} height={20} />
          </p>
          <h6 className="mb-0">
            <Skeleton width={70} height={20} />
          </h6>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <p className="mb-0">
            <Skeleton width={70} height={20} />
          </p>
          <h6 className="mb-0">
            <Skeleton width={70} height={20} />
          </h6>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <p className="mb-0">
            <Skeleton width={70} height={20} />
          </p>
          <h6 className="mb-0 text-primary">
            <Skeleton width={70} height={20} />
          </h6>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4 pb-1">
          <p className="mb-0">
            <Skeleton width={70} height={20} />
          </p>
          <h6 className="mb-0">
            <Skeleton width={70} height={20} />
          </h6>
        </div>
        <div className="d-grid mt-5">
          <Skeleton height={40} />
        </div>
        <p className="mt-8">
          <Skeleton height={10} />
          <Skeleton width={"70%"} height={10} />
        </p>
      </div>
    </div>
  );
}
