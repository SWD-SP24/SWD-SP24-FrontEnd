import React from "react";
import Skeleton from "react-loading-skeleton";

export default function UpgradePlanSkeleton() {
  return (
    <div className="col-lg-7 card-body border-end p-md-8">
      <h4 className="mb-2">
        <Skeleton width={180} height={30} />
      </h4>
      <p className="mb-0">
        <Skeleton width={"80%"} />
      </p>

      {/* Current Plan Skeleton */}
      <div className="border p-4 rounded my-4">
        <h5>
          <Skeleton width={200} />
        </h5>
        <p className="d-flex gap-2">
          <strong>
            <Skeleton width={95} />
          </strong>{" "}
          <Skeleton width={120} />
        </p>
        <p className="d-flex gap-2">
          <strong>
            <Skeleton width={118} />
          </strong>{" "}
          <Skeleton width={50} />
        </p>
        <p className="d-flex gap-2">
          <strong>
            <Skeleton width={141} />
          </strong>{" "}
          <Skeleton width={80} />
        </p>
        <p className="d-flex gap-2">
          <strong>
            <Skeleton width={194} />
          </strong>{" "}
          <Skeleton width={50} />
        </p>
      </div>

      {/* New Plan Skeleton */}
      <div className="border p-4 rounded my-4">
        <h5>
          <Skeleton width={200} />
        </h5>
        <p className="d-flex gap-2">
          <strong>
            <Skeleton width={108} />
          </strong>{" "}
          <Skeleton width={80} />
        </p>
        <p className="d-flex gap-2">
          <strong>
            <Skeleton width={103} />
          </strong>{" "}
          <Skeleton width={100} />
        </p>
        <p className="d-flex gap-2">
          <strong>
            <Skeleton width={80} />
          </strong>{" "}
          <Skeleton width={100} />
        </p>
      </div>

      {/* Upgrade Overview Skeleton */}
      <div className="border p-4 rounded my-4">
        <h5>
          <Skeleton width={180} />
        </h5>
        <p className="d-flex gap-2">
          <strong>
            <Skeleton width={108} />
          </strong>{" "}
          <Skeleton width={120} />
        </p>
        <p className="d-flex gap-2">
          <strong>
            <Skeleton width={103} />
          </strong>{" "}
          <Skeleton width={120} />
        </p>
        <p className="d-flex gap-2">
          <strong>
            <Skeleton width={80} />
          </strong>{" "}
          <Skeleton width={100} />
        </p>
        <p className="d-flex gap-2">
          <strong>
            <Skeleton width={80} />
          </strong>{" "}
          <Skeleton width={100} />
        </p>
        <p className="d-flex gap-2">
          <strong>
            <Skeleton width={80} />
          </strong>{" "}
          <Skeleton width={80} />
        </p>
      </div>

      {/* Benefit Comparison Skeleton */}
      <div className="border p-4 rounded my-4">
        <h5>
          <Skeleton width={200} />
        </h5>
        <table className="table">
          <thead>
            <tr>
              <th>
                <Skeleton width={90} />
              </th>
              <th className="text-center">
                <Skeleton width={80} />
              </th>
              <th className="text-center">
                <Skeleton width={80} />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index}>
                <td>
                  <Skeleton width={150} />
                </td>
                <td className="text-center">
                  <Skeleton width={20} height={20} />
                </td>
                <td className="text-center">
                  <Skeleton width={20} height={20} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
