import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import showToast from "../../util/showToast";
import UpgradePlanModalSkeleton from "./UpgradePlanModalSkeleton";
import { useNavigate } from "react-router";
import { auto } from "@popperjs/core";

export default function UpgradePlanModal() {
  const [isAnnually, setIsAnnually] = useState(false);
  const [pricingPlans, setPricingPlans] = useState([]);
  const [maxDiscount, setMaxDiscount] = useState(null);

  const navigate = useNavigate();

  const { isLoading, response, error, callApi } = useApi({
    url: API_URLS.MEMBERSHIP_PACKAGE.GET_PRICING_PLAN,
    method: "GET",
  });

  useEffect(() => {
    const modalElement = document.getElementById("upgradePlanModal");

    if (modalElement) {
      modalElement.addEventListener("shown.bs.modal", () => callApi());
      modalElement.addEventListener("hidden.bs.modal", handleCloseModal);
    }
    return () => {
      if (modalElement) {
        modalElement.removeEventListener("shown.bs.modal", callApi);
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
      <div className="modal-dialog modal-xl modal-simple modal-dialog-centered modal-pricing">
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
                <div className="d-flex align-items-center justify-content-center flex-wrap gap-2 pt-12 pb-4">
                  <label className="switch switch-sm ms-sm-12 ps-sm-12 me-0">
                    <span className="switch-label fs-6 text-body">Monthly</span>
                    <input
                      type="checkbox"
                      className="switch-input price-duration-toggler"
                      onChange={() => setIsAnnually((prev) => !prev)}
                      checked={isAnnually}
                    />
                    <span className="switch-toggle-slider">
                      <span className="switch-on"></span>
                      <span className="switch-off"></span>
                    </span>
                    <span className="switch-label fs-6 text-body">
                      Annually
                    </span>
                  </label>
                  <div className="mt-n5 ms-n10 ml-2 mb-10 d-none d-sm-flex align-items-center gap-1">
                    <img
                      src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/pages/pricing-arrow-light.png"
                      alt="arrow img"
                      className="scaleX-n1-rtl pt-1"
                      data-app-dark-img="pages/pricing-arrow-dark.png"
                      data-app-light-img="pages/pricing-arrow-light.png"
                      style={{ visibility: "visible" }}
                    />
                    <span className="badge badge-sm bg-label-primary rounded-1 mb-2 ">
                      Save up to {maxDiscount}%
                    </span>
                  </div>
                </div>

                <div className="row gy-6">
                  {pricingPlans.map((pricingPlan, index) => {
                    const previousPlanName =
                      index > 0
                        ? pricingPlans[index - 1].membershipPackageName
                        : null;
                    const activePlanIndex = pricingPlans.findIndex(
                      (plan) => plan.isActive
                    );
                    return (
                      <div
                        key={pricingPlan.membershipPackageId}
                        className="col-xl mb-md-0 px-3 d-flex"
                      >
                        <div className="card border rounded shadow-none d-flex flex-column h-100">
                          <div className="card-body pt-12 d-flex flex-column h-100">
                            <div>
                              <div
                                className="mt-3 mb-5 text-center"
                                style={{
                                  height: "125px",
                                }}
                              >
                                <img
                                  src={pricingPlan.image}
                                  alt="Image"
                                  width="120"
                                />
                              </div>
                              <h4 className="card-title text-center text-capitalize mb-1">
                                {pricingPlan.membershipPackageName}
                              </h4>
                              <p class="text-center mb-5">
                                {pricingPlan.summary}
                              </p>
                              <div className="text-center h-px-50 mb-10">
                                <div className="d-flex justify-content-center">
                                  <sup className="h6 text-body pricing-currency mt-2 mb-0 me-1">
                                    $
                                  </sup>
                                  <h1 className="mb-0 text-primary">
                                    {isAnnually
                                      ? Number.isInteger(
                                          pricingPlan.price -
                                            pricingPlan.savingPerMonth
                                        )
                                        ? pricingPlan.price -
                                          pricingPlan.savingPerMonth
                                        : (
                                            pricingPlan.price -
                                            pricingPlan.savingPerMonth
                                          ).toFixed(2)
                                      : Number.isInteger(pricingPlan.price)
                                      ? pricingPlan.price
                                      : pricingPlan.price.toFixed(2)}
                                  </h1>
                                  <sub className="h6 text-body pricing-duration mt-auto mb-1">
                                    /month
                                  </sub>
                                </div>
                                {isAnnually && pricingPlan.yearlyPrice > 0 && (
                                  <small className="price-yearly price-yearly-toggle text-body-secondary">
                                    ${pricingPlan.yearlyPrice} / year
                                  </small>
                                )}
                              </div>
                              {pricingPlan.isActive ? (
                                <div
                                  className="alert alert-success d-flex align-items-center justify-content-center mb-0"
                                  style={{ height: "37.6px" }}
                                >
                                  <span>Your Current Plan</span>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-label-primary d-grid w-100"
                                  data-bs-dismiss="modal"
                                  disabled={
                                    activePlanIndex !== -1 &&
                                    index < activePlanIndex
                                  }
                                  onClick={
                                    activePlanIndex !== -1 &&
                                    index < activePlanIndex
                                      ? undefined
                                      : () =>
                                          navigate(
                                            "/member/upgrade-plan/checkout",
                                            {
                                              state: {
                                                planId:
                                                  pricingPlan.membershipPackageId,
                                                isYearly: isAnnually,
                                              },
                                            }
                                          )
                                  }
                                >
                                  {pricingPlan.isActive
                                    ? "Your Current Plan"
                                    : "Upgrade"}
                                </button>
                              )}
                            </div>
                            <hr />
                            <b className="text-start mb-5">
                              {pricingPlan.price === 0
                                ? "A simple start for everyone:"
                                : `Everything in the ${previousPlanName}, plus:`}
                            </b>
                            <ul className="list-group flex-grow-1">
                              {pricingPlan?.permissions
                                .filter((permission) => {
                                  if (
                                    displayedPermissions.has(
                                      permission.permissionId
                                    )
                                  ) {
                                    return false; // Bỏ qua quyền đã xuất hiện ở gói trước
                                  }
                                  displayedPermissions.add(
                                    permission.permissionId
                                  );
                                  return true; // Hiển thị quyền chưa xuất hiện
                                })
                                .map((permission) => (
                                  <li
                                    key={permission.permissionId}
                                    className="mb-4 d-flex align-items-center"
                                  >
                                    <span className="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                                      <i className="icon-base bx bx-check icon-xs"></i>
                                    </span>
                                    <span>{permission.description}</span>
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
