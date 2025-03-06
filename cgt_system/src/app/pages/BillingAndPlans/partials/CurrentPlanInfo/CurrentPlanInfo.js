import React from "react";
import UpgradePlanModal from "../../../UpgradePlanModal";

export default function CurrentPlanInfo({ currentPlan }) {
  const isFreePlan = currentPlan?.membershipPackage.price === 0;

  // Tính toán thời gian sử dụng
  const startDate = new Date(currentPlan?.startDate);
  const endDate = new Date(currentPlan?.endDate);
  const today = new Date();
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const daysUsed = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
  const daysRemaining = totalDays - daysUsed;
  const progressWidth = `${100 - (daysUsed / totalDays) * 100}%`;

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
    <>
      <div className="card mb-6">
        <h5 className="card-header">Current Plan</h5>
        <div className="card-body">
          <div className="row row-gap-6">
            <div className="col-md-6 mb-1">
              <div className="mb-6">
                <h6 className="mb-1">
                  Your Current Plan is{" "}
                  {currentPlan?.membershipPackage.membershipPackageName}
                </h6>
                <p>
                  {isFreePlan
                    ? "Zero cost, endless possibilities! Get a taste of what we offer. 🎉"
                    : currentPlan?.membershipPackage.summary}
                </p>
              </div>
              {isFreePlan && (
                <ul className="text-muted ps-0">
                  <li className="mb-4 d-flex align-items-center">
                    <span className="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                      <i className="icon-base bx bx-check icon-xs"></i>
                    </span>
                    <span>Access core functionalities</span>
                  </li>
                  <li className="mb-4 d-flex align-items-center">
                    <span className="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                      <i className="icon-base bx bx-check icon-xs"></i>
                    </span>
                    <span>No expiration – use it forever</span>
                  </li>
                  <li className="mb-4 d-flex align-items-center">
                    <span className="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                      <i className="icon-base bx bx-check icon-xs"></i>
                    </span>
                    <span>Upgrade anytime for advanced tools</span>
                  </li>
                </ul>
              )}
              {!isFreePlan && (
                <>
                  <h6 className="mb-1">
                    Active until {formatDate(currentPlan?.endDate)}
                  </h6>
                  <p>
                    We will send you a notification upon Subscription expiration
                  </p>
                  <div className="mb-6">
                    <button
                      className="col-12 btn btn-primary me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#upgradePlanModal"
                    >
                      Upgrade Plan
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="col-md-6">
              {isFreePlan ? (
                <div className="badge d-block w-100 bg-label-primary rounded p-4 text-center">
                  <h6 className="text-dark">Want More Features?</h6>
                  <p className="text-muted text-wrap">
                    Upgrade to unlock new benefits like advanced analytics,
                    priority support, and more.
                  </p>
                  <button
                    className="col-12 btn btn-primary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#upgradePlanModal"
                  >
                    Upgrade Plan 🚀
                  </button>
                </div>
              ) : (
                <>
                  <div
                    className={`alert ${
                      daysRemaining < 10 ? "alert-warning" : "alert-success"
                    } mb-6`}
                    role="alert"
                  >
                    <h5 className="alert-heading mb-1 d-flex align-items-center gap-2">
                      <span className="alert-icon rounded-circle">
                        <i
                          className={`icon-base bx ${
                            daysRemaining < 10 ? "bx-error" : "bx-coffee"
                          } icon-md`}
                        ></i>
                      </span>
                      <span>
                        {daysRemaining < 10
                          ? "We need your attention!"
                          : "Your plan is active!"}
                      </span>
                    </h5>
                    <span className="ms-11 ps-1">
                      {daysRemaining < 10
                        ? "Your plan requires update"
                        : "You're all set! Enjoy your plan benefits."}
                    </span>
                  </div>
                  <div className="plan-statistics">
                    <div className="d-flex justify-content-between mb-1">
                      <h6 className="mb-0">Days</h6>
                      <h6 className="mb-0">
                        {daysRemaining} of{" "}
                        {currentPlan?.membershipPackage.validityPeriod} Days
                      </h6>
                    </div>
                    <div className="progress rounded">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: progressWidth }}
                        aria-valuenow={daysUsed}
                        aria-valuemin="0"
                        aria-valuemax={totalDays}
                      ></div>
                    </div>
                    <small className="text-muted">
                      {daysRemaining} days remaining until your plan requires
                      update
                    </small>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <UpgradePlanModal />
    </>
  );
}
