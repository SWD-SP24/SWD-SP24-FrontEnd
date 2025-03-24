import React, { use, useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import showToast from "../../util/showToast";
import UpgradePlanModalSkeleton from "./UpgradePlanModalSkeleton";
import useUser from "../../hooks/useUser";
import Button from "./Button";

export default function UpgradePlanModal() {
  const [isAnnually, setIsAnnually] = useState(false);
  const [pricingPlans, setPricingPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState({});
  const [pendingBillings, setPendingBillings] = useState([]);
  const [maxDiscount, setMaxDiscount] = useState(null);
  const { user } = useUser();

  const { isLoading, response, error, callApi } = useApi({
    url: API_URLS.MEMBERSHIP_PACKAGE.GET_PRICING_PLAN,
    method: "GET",
  });

  // API lấy thông tin các gói đang chờ thanh toán
  const { response: pendingOrderResponse, callApi: checkPendingOrder } = useApi(
    {
      url: API_URLS.USER.GET_PENDING_BILLING,
      method: "GET",
    }
  );

  // API lấy thông tin các gói đang chờ thanh toán
  const { response: currentPlanRes, callApi: getCurrentPlan } = useApi({
    url: API_URLS.USER.MEMBERSHIP_PACKAGE.CURRENT,
    method: "GET",
  });

  useEffect(() => {
    const modalElement = document.getElementById("upgradePlanModal");

    const handleShowModal = () => {
      callApi();
      getCurrentPlan();
      checkPendingOrder();
    };

    if (modalElement) {
      modalElement.addEventListener("shown.bs.modal", handleShowModal);
      modalElement.addEventListener("hidden.bs.modal", handleCloseModal);
    }
    return () => {
      if (modalElement) {
        modalElement.removeEventListener("shown.bs.modal", handleShowModal);
        modalElement.removeEventListener("hidden.bs.modal", handleCloseModal);
      }
    };
  }, []);

  useEffect(() => {
    if (response?.status === "successful") {
      const pricingPlans = response.data || [];
      if (pricingPlans) {
        setPricingPlans(pricingPlans);

        // Tìm gói có giảm giá cao nhất
        const highestDiscountPlan = pricingPlans.reduce((max, plan) => {
          return plan.percentDiscount > (max?.percentDiscount || 0)
            ? plan
            : max;
        }, null);

        setMaxDiscount(highestDiscountPlan?.percentDiscount || null);
      }
    }
  }, [response]);

  useEffect(() => {
    if (pendingOrderResponse) {
      setPendingBillings(pendingOrderResponse);
    }
  }, [pendingOrderResponse]);

  useEffect(() => {
    if (currentPlanRes) {
      setCurrentPlan(currentPlanRes);
    }
  }, [currentPlanRes]);

  useEffect(() => {
    if (error?.message) {
      showToast({
        icon: "error",
        text: error?.message,
        targetElement: document.querySelector(".card"),
      });
    }
  }, [error]);

  const handleCloseModal = () => {
    setIsAnnually(false);
    setPricingPlans([]);
    setMaxDiscount(null);
  };

  const displayedPermissions = new Set();

  return (
    <div
      className="modal fade"
      id="upgradePlanModal"
      tabIndex="-1"
      aria-modal="true"
      role="dialog"
      style={{ display: "none" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-pricing modal-simple modal-xl">
        <div className="modal-content">
          {isLoading ? (
            <UpgradePlanModalSkeleton />
          ) : (
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div className="rounded-top">
                <h4 className="text-center mb-2">Pricing Plans</h4>
                <p className="text-center mb-0">
                  All plans include advanced tools and features to support
                  comprehensive child development tracking. Choose the best plan
                  to fit your needs.
                </p>
                {user?.emailActivation === "unactivated" && (
                  <div
                    class="d-flex alert alert-warning align-items-center gap-3 mb-0 mt-3"
                    role="alert"
                  >
                    <h5 class="d-flex alert-heading align-items-center justify-between mb-0">
                      <span class="alert-icon rounded-circle">
                        <span
                          style={{ fontSize: "54px" }}
                          class="bx bx-error icon-base icon-md"
                        ></span>
                      </span>
                    </h5>
                    <div className="d-flex flex-column">
                      <h5 className="text-warning fw-bold mb-0">
                        Your account is not activated yet!
                      </h5>
                      <span>
                        Please activate your account before purchasing a
                        membership package. Check your email for the activation
                        link or contact support if you need help.
                      </span>
                    </div>
                  </div>
                )}
                <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 pb-4 pt-7">
                  <label className="me-0 ms-sm-12 ps-sm-12 switch switch-sm">
                    <span className="text-body fs-6 switch-label">Monthly</span>
                    <input
                      type="checkbox"
                      className="price-duration-toggler switch-input"
                      onChange={() => setIsAnnually((prev) => !prev)}
                      checked={isAnnually}
                    />
                    <span className="switch-toggle-slider">
                      <span className="switch-on"></span>
                      <span className="switch-off"></span>
                    </span>
                    <span className="text-body fs-6 switch-label">
                      Annually
                    </span>
                  </label>
                  <div className="d-none d-sm-flex align-items-center gap-1 mb-10 ml-2 ms-n10 mt-n5">
                    <img
                      src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/pages/pricing-arrow-light.png"
                      alt="arrow img"
                      className="pt-1 scaleX-n1-rtl"
                      data-app-dark-img="pages/pricing-arrow-dark.png"
                      data-app-light-img="pages/pricing-arrow-light.png"
                      style={{ visibility: "visible" }}
                    />
                    <span className="badge badge-sm bg-label-primary rounded-1 mb-2">
                      Save up to {maxDiscount}%
                    </span>
                  </div>
                </div>
                <div className="row gy-6">
                  {pricingPlans.map((pricingPlan, index) => {
                    const previousPlanName =
                      index > 0
                        ? pricingPlans[index - 1]?.membershipPackageName
                        : null;
                    const activePlanIndex = pricingPlans.findIndex(
                      (plan) => plan?.isActive
                    );

                    // Nếu là plan đang active, thay pricingPlan bằng currentPlan
                    const displayedPlan =
                      pricingPlan?.isActive && currentPlan
                        ? currentPlan?.membershipPackage
                        : pricingPlan;

                    return (
                      <div
                        key={displayedPlan?.membershipPackageId}
                        className="col-xl d-flex mb-md-0 px-3"
                      >
                        <div className="d-flex flex-column card border h-100 rounded shadow-none">
                          <div className="d-flex flex-column card-body h-100 pt-12">
                            <div>
                              <div
                                className="text-center mb-5 mt-3"
                                style={{
                                  height: "125px",
                                }}
                              >
                                <img
                                  src={displayedPlan?.image}
                                  alt="Image"
                                  width="120"
                                />
                              </div>
                              <h4 className="card-title text-capitalize text-center mb-1">
                                {displayedPlan?.membershipPackageName}
                              </h4>
                              <p className="text-center mb-5">
                                {displayedPlan?.summary}
                              </p>
                              <div className="h-px-50 text-center mb-10">
                                <div className="d-flex justify-content-center">
                                  <sup className="text-body h6 mb-0 me-1 mt-2 pricing-currency">
                                    $
                                  </sup>
                                  <h1 className="text-primary mb-0">
                                    {isAnnually
                                      ? Number.isInteger(
                                          displayedPlan?.price -
                                            displayedPlan?.savingPerMonth
                                        )
                                        ? displayedPlan?.price -
                                          displayedPlan?.savingPerMonth
                                        : (
                                            displayedPlan?.price -
                                            displayedPlan?.savingPerMonth
                                          )?.toFixed(2)
                                      : Number.isInteger(displayedPlan?.price)
                                      ? displayedPlan?.price
                                      : displayedPlan?.price?.toFixed(2)}
                                  </h1>
                                  <sub className="text-body h6 mb-1 mt-auto pricing-duration">
                                    /month
                                  </sub>
                                </div>
                                {isAnnually &&
                                  displayedPlan?.yearlyPrice > 0 &&
                                  displayedPlan?.membershipPackageId !==
                                    currentPlan?.membershipPackage
                                      ?.membershipPackageId && (
                                    <small className="text-body-secondary price-yearly price-yearly-toggle">
                                      ${displayedPlan?.yearlyPrice} / year
                                    </small>
                                  )}
                              </div>
                              {displayedPlan?.membershipPackageId ===
                              currentPlan?.membershipPackage
                                ?.membershipPackageId ? (
                                <div
                                  className="d-flex alert alert-success align-items-center justify-content-center mb-0"
                                  style={{ height: "37.6px" }}
                                >
                                  <span>Your Current Plan</span>
                                </div>
                              ) : (
                                <Button
                                  pendingBillings={pendingBillings}
                                  activePlanIndex={activePlanIndex}
                                  index={index}
                                  user={user}
                                  pricingPlan={displayedPlan}
                                  isAnnually={isAnnually}
                                />
                              )}
                            </div>
                            <hr />
                            <b className="text-start mb-5">
                              {displayedPlan?.price === 0
                                ? "A simple start for everyone:"
                                : `Everything in the ${previousPlanName}, plus:`}
                            </b>
                            <ul className="flex-grow-1 list-group">
                              {displayedPlan?.permissions
                                ?.filter((permission) => {
                                  if (
                                    displayedPermissions?.has(
                                      permission?.permissionId
                                    )
                                  ) {
                                    return false; // Bỏ qua quyền đã xuất hiện ở gói trước
                                  }
                                  displayedPermissions?.add(
                                    permission?.permissionId
                                  );
                                  return true; // Hiển thị quyền chưa xuất hiện
                                })
                                ?.map((permission) => (
                                  <li
                                    key={permission?.permissionId}
                                    className="d-flex align-items-center mb-4"
                                  >
                                    <span className="badge bg-label-primary h-px-20 p-50 rounded-pill w-px-20 me-2">
                                      <i className="bx bx-check icon-base icon-xs"></i>
                                    </span>
                                    <span>{permission?.description}</span>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
