import React, { useEffect, useState } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import showToast from "../../../../util/showToast";
import SubscriptionPlanSkeleton from "./SubscriptionPlanSkeleton";
import UpgradePlanModal from "../../../UpgradePlanModal";

export default function SubscriptionPlan() {
  const [plan, setPlan] = useState(null);

  const isLifetime = plan?.membershipPackage.membershipPackageName === "Basic";

  // Tính toán thời gian sử dụng
  const startDate = new Date(plan?.startDate);
  const endDate = new Date(plan?.endDate);
  const today = new Date();
  const totalDays = isLifetime
    ? 1
    : Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const daysUsed = isLifetime
    ? 1
    : Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
  const daysRemaining = isLifetime ? "Unlimited" : totalDays - daysUsed;
  const progressWidth = isLifetime
    ? "100%"
    : `${(daysUsed / totalDays) * 100}%`;

  const { isLoading, response, error, callApi } = useApi({
    url: API_URLS.USER.MEMBERSHIP_PACKAGE.CURRENT,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response) {
      const plan = response || {};
      if (plan) {
        setPlan(response || {});
      }
    }
  }, [response]);

  useEffect(() => {
    if (error?.message) {
      showToast({
        icon: "error",
        text: error?.message,
        targetElement: document.querySelector(".card"),
      });
    }
  }, [error]);

  if (isLoading) return <SubscriptionPlanSkeleton />;

  return (
    <>
      <div className="card mb-6 border border-2 border-primary rounded primary-shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <span className="badge bg-label-primary">
              {plan?.membershipPackage.membershipPackageName}
            </span>
            <div className="d-flex justify-content-center">
              <sub className="h5 pricing-currency mb-auto mt-1 text-primary">
                $
              </sub>
              <h1 className="mb-0 text-primary">
                {plan?.membershipPackage.price}
              </h1>
              <sub className="h6 pricing-duration mt-auto mb-3 fw-normal">
                month
              </sub>
            </div>
          </div>
          <ul className="list-unstyled g-2 my-6">
            {plan?.membershipPackage.permissions.map((permission) => (
              <li
                key={permission.permissionId}
                className="mb-2 d-flex align-items-center"
              >
                <i className="icon-base bx bxs-circle icon-6px text-secondary me-2"></i>
                <span>{permission.description}</span>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="h6 mb-0">Days</span>
            {isLifetime ? (
              <span className="h6 mb-0 text-success">Lifetime Access</span>
            ) : (
              <span className="h6 mb-0 text-success">
                {daysUsed} of {totalDays} Days
              </span>
            )}
          </div>
          <div className="progress mb-1">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: progressWidth }}
              aria-valuenow={isLifetime ? 100 : daysUsed}
              aria-valuemin="0"
              aria-valuemax={totalDays}
            ></div>
          </div>
          <small>
            {isLifetime
              ? "Unlimited Access"
              : `${daysRemaining} days remaining`}
          </small>
          <div className="d-grid w-100 mt-6">
            <button
              className="btn btn-primary"
              data-bs-target="#upgradePlanModal"
              data-bs-toggle="modal"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
      <UpgradePlanModal />
    </>
  );
}
