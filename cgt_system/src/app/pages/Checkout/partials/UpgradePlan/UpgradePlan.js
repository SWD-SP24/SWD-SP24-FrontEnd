import React from "react";

export default function UpgradePlan({ checkoutInfo, isYearly }) {
  const totalDays =
    checkoutInfo?.membershipPackage.validityPeriod +
    checkoutInfo?.additionalDays;

  const showMonthlySaving = checkoutInfo?.membershipPackage?.savingPerMonth > 0;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="col-lg-7 card-body border-end p-md-8">
      <h4 className="mb-2">Upgrade Plan</h4>
      <p className="mb-0">
        Upgrade your plan to access exclusive child development tracking
        features.
      </p>

      {/* Current Plan */}
      {checkoutInfo?.remainingDays > 0 && (
        <div class="border p-4 rounded my-4">
          <div class="custom-option-header mb-2 w-100 d-flex justify-content-end">
            <span class="badge bg-label-primary">Current</span>
          </div>
          <div class="d-flex gap-4 flex-sm-row flex-column align-items-center">
            <div class="flex-shrink-0 d-flex align-items-center">
              <img
                src={checkoutInfo?.currentMembershipPackage.image}
                alt="Plan Image"
                class="w-px-100"
              />
            </div>
            <div class="flex-grow-1">
              <div class="row text-center text-sm-start">
                <div class="col-md-12">
                  <p class="me-3 mb-2">
                    <h5 className="text-heading">
                      <span class="text-heading">
                        {
                          checkoutInfo?.currentMembershipPackage
                            ?.membershipPackageName
                        }
                      </span>
                    </h5>
                  </p>
                  <table>
                    <tbody>
                      <tr>
                        <td class="pe-4">Remaining Days:</td>
                        <p class="fw-medium mb-0">
                          {checkoutInfo?.remainingDays} days
                        </p>
                      </tr>
                      <tr>
                        <td class="pe-4">Remaining Balance:</td>
                        <p class="fw-medium mb-0">
                          ${checkoutInfo?.remainingPrice.toFixed(2)}
                        </p>
                      </tr>
                      <tr>
                        <td class="pe-4">Converted Additional Days:</td>
                        <p class="fw-medium mb-0">
                          {checkoutInfo?.additionalDays} days
                        </p>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Plan */}
      <div class="border p-4 rounded my-4">
        <div class="custom-option-header mb-2 w-100 d-flex justify-content-end">
          <span class="badge bg-label-success">New</span>
        </div>
        <div class="d-flex gap-4 flex-sm-row flex-column align-items-center">
          <div class="flex-shrink-0 d-flex align-items-center">
            <img
              src={checkoutInfo?.membershipPackage.image}
              alt="Plan Image"
              class="w-px-100"
            />
          </div>
          <div class="flex-grow-1">
            <div class="row text-center text-sm-start">
              <div class="col-md-12">
                <p class="me-3 mb-2">
                  <h5 className="text-heading">
                    <span class="text-heading">
                      {checkoutInfo?.membershipPackage?.membershipPackageName}
                    </span>
                  </h5>
                </p>
                <table className="w-100">
                  <tbody>
                    <tr>
                      <td class="pe-4">Validity Period:</td>
                      <p class="fw-medium mb-0">
                        {checkoutInfo?.membershipPackage?.validityPeriod} days
                      </p>
                    </tr>
                    <tr>
                      <td class="pe-4">Monthly Price:</td>
                      <p class="fw-medium mb-0">
                        $
                        {(
                          checkoutInfo?.membershipPackage?.price -
                          checkoutInfo?.membershipPackage?.savingPerMonth
                        ).toFixed(2)}
                        /month
                        {isYearly && (
                          <s className="text-body-secondary ms-1 small">
                            ${checkoutInfo?.membershipPackage?.price.toFixed(2)}
                            /month
                          </s>
                        )}
                      </p>
                    </tr>
                    {isYearly && (
                      <tr>
                        <td class="pe-4">Yearly Price:</td>
                        <p class="fw-medium mb-0">
                          $
                          {checkoutInfo?.membershipPackage?.yearlyPrice.toFixed(
                            2
                          )}
                          /year
                        </p>
                      </tr>
                    )}
                    {showMonthlySaving && isYearly && (
                      <tr>
                        <td class="pe-4">Monthly Savings:</td>
                        <p class="fw-medium mb-0">
                          $
                          {checkoutInfo?.membershipPackage?.savingPerMonth.toFixed(
                            2
                          )}
                        </p>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Overview */}
      <div className="border p-4 rounded my-4">
        <div className="alert alert-secondary">
          <h5 className="fw-bold">Upgrade Overview</h5>
          <table className="w-100 mb-4">
            <tbody>
              <tr className="row">
                <td className="col-6">
                  <tr>
                    <td class="pe-4">From Plan:</td>
                    <p class="fw-bold mb-0">
                      {
                        checkoutInfo?.currentMembershipPackage
                          .membershipPackageName
                      }
                    </p>
                  </tr>
                  <tr>
                    <td class="pe-4">To Plan:</td>
                    <p class="fw-bold mb-0">
                      {checkoutInfo?.membershipPackage.membershipPackageName}
                    </p>
                  </tr>
                </td>
                <td className="col-6">
                  <tr>
                    <td class="pe-4">Start Date:</td>
                    <p class="fw-medium mb-0">
                      {formatDate(checkoutInfo?.startDate)}
                    </p>
                  </tr>
                  <tr>
                    <td class="pe-4">Expiration Date:</td>
                    <p class="fw-medium mb-0">
                      {formatDate(checkoutInfo?.endDate)}
                    </p>
                  </tr>
                  <tr>
                    <td class="pe-4">Additional Date:</td>
                    <p class="fw-medium mb-0">
                      {checkoutInfo?.additionalDays} days
                    </p>
                  </tr>
                  <tr>
                    <td class="pe-4">Total Validity Period:</td>
                    <p class="fw-medium mb-0">{totalDays} days</p>
                  </tr>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Feature</th>
              <th className="text-center">Current </th>
              <th className="text-center">New</th>
            </tr>
          </thead>
          <tbody>
            {checkoutInfo?.membershipPackage?.permissions?.map((permission) => {
              const hasCurrentPermission =
                checkoutInfo?.currentMembershipPackage?.permissions?.some(
                  (p) => p.permissionId === permission.permissionId
                );
              return (
                <tr key={permission.permissionId}>
                  <td>{permission.description}</td>
                  <td className="text-center">
                    {hasCurrentPermission ? (
                      <span className="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                        <i className="icon-base bx bx-check icon-xs"></i>
                      </span>
                    ) : (
                      <span className="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-danger me-2">
                        <i className="icon-base bx bx-x icon-xs"></i>
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    <span className="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                      <i className="icon-base bx bx-check icon-xs"></i>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
