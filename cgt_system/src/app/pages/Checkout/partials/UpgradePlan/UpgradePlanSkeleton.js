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
        {/* Header Skeleton */}
        <div className="custom-option-header mb-2 w-100 d-flex justify-content-end">
          <Skeleton width={80} height={24} />
        </div>

        <div className="d-flex gap-4 flex-sm-row flex-column align-items-center">
          {/* Image Skeleton */}
          <div className="flex-shrink-0 d-flex align-items-center">
            <Skeleton width={100} height={100} />
          </div>

          {/* Content Skeleton */}
          <div className="flex-grow-1">
            <div className="row text-center text-sm-start">
              <div className="col-md-12">
                <p className="me-3 mb-2">
                  <Skeleton width={120} height={20} />
                </p>

                <table>
                  <tbody>
                    <tr>
                      <td className="pe-4">
                        <Skeleton width={120} />
                      </td>
                      <p className="fw-medium mb-0">
                        <Skeleton width={50} />
                      </p>
                    </tr>
                    <tr>
                      <td className="pe-4">
                        <Skeleton width={120} />
                      </td>
                      <p className="fw-medium mb-0">
                        <Skeleton width={80} />
                      </p>
                    </tr>
                    <tr>
                      <td className="pe-4">
                        <Skeleton width={120} />
                      </td>
                      <p className="fw-medium mb-0">
                        <Skeleton width={50} />
                      </p>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Plan Skeleton */}
      <div className="border p-4 rounded my-4">
        {/* Header Skeleton */}
        <div className="custom-option-header mb-2 w-100 d-flex justify-content-end">
          <Skeleton width={80} height={24} />
        </div>

        <div className="d-flex gap-4 flex-sm-row flex-column align-items-center">
          {/* Image Skeleton */}
          <div className="flex-shrink-0 d-flex align-items-center">
            <Skeleton width={100} height={100} />
          </div>

          {/* Content Skeleton */}
          <div className="flex-grow-1">
            <div className="row text-center text-sm-start">
              <div className="col-md-12">
                <p className="me-3 mb-2">
                  <Skeleton width={120} height={20} />
                </p>

                <table>
                  <tbody>
                    <tr>
                      <td className="pe-4">
                        <Skeleton width={120} />
                      </td>
                      <p className="fw-medium mb-0">
                        <Skeleton width={50} />
                      </p>
                    </tr>
                    <tr>
                      <td className="pe-4">
                        <Skeleton width={120} />
                      </td>
                      <p className="fw-medium mb-0">
                        <Skeleton width={80} />
                      </p>
                    </tr>
                    <tr>
                      <td className="pe-4">
                        <Skeleton width={120} />
                      </td>
                      <p className="fw-medium mb-0">
                        <Skeleton width={50} />
                      </p>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Overview Skeleton */}
      <div className="border p-4 rounded my-4">
        <Skeleton height={158} />
        <table className="table">
          <thead>
            <tr>
              <th>
                <Skeleton width={100} />
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
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td>
                  <Skeleton width={180} />
                </td>
                <td className="text-center">
                  <Skeleton circle width={24} height={24} />
                </td>
                <td className="text-center">
                  <Skeleton circle width={24} height={24} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
