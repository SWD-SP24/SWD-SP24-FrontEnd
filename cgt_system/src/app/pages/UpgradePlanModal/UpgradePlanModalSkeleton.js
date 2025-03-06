import React from "react";
import Skeleton from "react-loading-skeleton";

export default function UpgradePlanModalSkeleton() {
  return (
    <div className="modal-body">
      <div className="rounded-top">
        <div className="d-flex align-items-center justify-content-center mb-4">
          <Skeleton className="text-center" width={200} height={20} />
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Skeleton width={950} height={10} />
        </div>
        <div className="d-flex align-items-center justify-content-center flex-wrap gap-2 pt-12 pb-4">
          <Skeleton width={70} height={10} />
          <Skeleton width={30} height={18} borderRadius={50} />
          <Skeleton width={70} height={10} />
        </div>

        <div className="row gy-6">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="col-xl mb-md-0 px-3">
                <div className="card border rounded shadow-none">
                  <div className="card-body pt-12">
                    <div className="mt-3 mb-5 text-center">
                      <Skeleton width={120} height={121} />
                    </div>
                    <h4 className="card-title text-center text-capitalize mb-1">
                      <Skeleton width={75} height={15} />
                    </h4>
                    <p className="text-center mb-5">
                      <Skeleton width={150} height={10} />
                    </p>
                    <div className="text-center h-px-50">
                      <div className="d-flex justify-content-center">
                        <sup className="h6 text-body pricing-currency mt-2 mb-0 me-1">
                          <Skeleton width={10} height={10} />
                        </sup>
                        <h1 className="mb-0 text-primary">
                          <Skeleton width={35} height={50} />
                        </h1>
                        <sub className="h6 text-body pricing-duration mt-auto mb-1">
                          <Skeleton width={40} height={10} />
                        </sub>
                      </div>
                    </div>

                    <ul className="list-group my-5 pt-9">
                      {Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <li
                            key={index}
                            className="mb-4 d-flex align-items-center"
                          >
                            <span className="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                              <Skeleton
                                width={10}
                                height={10}
                                borderRadius={100}
                              />
                            </span>
                            <span>
                              <Skeleton width={200} height={10} />
                            </span>
                          </li>
                        ))}
                    </ul>
                    <Skeleton width={272} height={38} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
