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
      {checkoutInfo?.remainingDays > 0 && (
        <div className="border p-4 rounded my-4">
          <h5>Current Plan Information</h5>
          <p>
            <strong>Current Plan:</strong>{" "}
            {checkoutInfo?.currentMembershipPackage?.membershipPackageName}
          </p>
          <p>
            <strong>Remaining Days:</strong> {checkoutInfo?.remainingDays} days
          </p>
          <p>
            <strong>Remaining Balance:</strong> $
            {checkoutInfo?.remainingPrice.toFixed(2)}
          </p>

          <p>
            <strong>Converted Additional Days:</strong>{" "}
            {checkoutInfo?.additionalDays} days
          </p>
        </div>
      )}
      {/* New Plan */}
      <div className="border p-4 rounded my-4">
        <h5>
          New Plan: {checkoutInfo?.membershipPackage?.membershipPackageName}
        </h5>
        <p>
          <strong>Validity Period:</strong>{" "}
          {checkoutInfo?.membershipPackage?.validityPeriod} days
        </p>

        <p>
          <strong>Monthly Price:</strong> $
          {(
            checkoutInfo?.membershipPackage?.price -
            checkoutInfo?.membershipPackage?.savingPerMonth
          ).toFixed(2)}
          /month
          {isYearly && (
            <s className="text-body-secondary ms-1 small">
              {" "}
              ${checkoutInfo?.membershipPackage?.price.toFixed(2)}/month{" "}
            </s>
          )}
        </p>
        {isYearly && (
          <p>
            <strong>Yearly Price:</strong> $
            {checkoutInfo?.membershipPackage?.yearlyPrice.toFixed(2)}/year
          </p>
        )}
        {showMonthlySaving && isYearly && (
          <p>
            <strong>Monthly Savings:</strong> $
            {checkoutInfo?.membershipPackage?.savingPerMonth.toFixed(2)}
          </p>
        )}
      </div>
      {/* Upgrade Overview */}
      <div className="border p-4 rounded my-4">
        <h5>Upgrade Overview</h5>
        <p>
          <strong>Current Plan:</strong>{" "}
          {checkoutInfo?.currentMembershipPackage?.membershipPackageName}
        </p>
        <p>
          <strong>New Plan:</strong>{" "}
          {checkoutInfo?.membershipPackage?.membershipPackageName}
        </p>
        <p>
          <strong>Start Date:</strong> {formatDate(checkoutInfo?.startDate)}
        </p>
        <p>
          <strong>End Date:</strong> {formatDate(checkoutInfo?.endDate)}
        </p>
        <p>
          {checkoutInfo?.additionalDays > 0 && (
            <>
              <strong>Additional Days:</strong> {checkoutInfo?.additionalDays}{" "}
              days
            </>
          )}
        </p>
        <p>
          <strong>Total Validity Period:</strong> {totalDays} days
        </p>
      </div>
      {/* Benefit Comparison */}
      <div className="border p-4 rounded my-4">
        <h5>Benefit Comparison</h5>
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
