import React from "react";
import Skeleton from "react-loading-skeleton";

export default function CurrentPlanInfoSkeleton() {
  return (
    <>
      <div className="card mb-6">
        <h5 className="card-header">
          <Skeleton width={100} />
        </h5>
        <div className="card-body">
          <div className="row row-gap-6">
            <div className="col-md-6 mb-1">
              <div className="mb-6">
                <h6 className="mb-1">
                  <Skeleton width={200} />
                </h6>
                <p>
                  <Skeleton width={200} />
                </p>
              </div>
              <h6 className="mb-1">
                <Skeleton width={200} />
              </h6>
              <p>
                <Skeleton width={300} />
              </p>
              <div className="mb-6">
                <Skeleton height={38} />
              </div>
            </div>
            <div className="col-xl-6 order-0 order-xl-0">
              <Skeleton className="mb-4" height={74} />
              <div className="plan-statistics">
                <div className="d-flex justify-content-between">
                  <Skeleton className="mb-1" height={10} width={50} />
                  <Skeleton className="mb-1" height={10} width={100} />
                </div>
                <div>
                  <Skeleton height={7} />
                  <Skeleton className="col-6" height={4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
