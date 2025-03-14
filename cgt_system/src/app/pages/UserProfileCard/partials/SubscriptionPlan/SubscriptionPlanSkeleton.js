import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SubscriptionPlanSkeleton() {
  return (
    <div className="card mb-6 border border-2 border-primary rounded primary-shadow">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <Skeleton width={80} height={20} />
          <div className="d-flex justify-content-center">
            <sub className="h5 pricing-currency mb-auto mt-1 text-primary">
              <Skeleton width={10} height={20} className="p-2" />
            </sub>
            <h1 className="mb-0 text-primary">
              <Skeleton width={50} height={30} />
            </h1>
            <sub className="h6 pricing-duration mt-auto mb-3 fw-normal">
              <Skeleton width={50} height={10} />
            </sub>
          </div>
        </div>
        <ul className="list-unstyled g-2 my-6">
          {[...Array(5)].map((_, index) => (
            <li key={index} className="mb-2 d-flex align-items-center">
              <Skeleton width={200} height={20} />
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="h6 mb-0">
            {" "}
            <Skeleton width={90} height={10} />
          </span>
          <Skeleton width={100} height={20} />
        </div>
        <div className="progress mb-1">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: "0%" }}
          ></div>
        </div>
        <small>
          <Skeleton width={150} height={20} />
        </small>
      </div>
    </div>
  );
}
