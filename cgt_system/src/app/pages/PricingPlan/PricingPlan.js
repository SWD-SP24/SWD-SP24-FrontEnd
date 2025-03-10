import React, { useState } from "react";
import styles from "./PricingPlan.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
export default function PricingPlan() {
  const [currentTheme, setCurrentTheme] = useState(
    document.documentElement.getAttribute("data-bs-theme")
  );
  return (
    <div className={cx("content-wrapper")}>
      {/* <!-- Content --> */}
      <div class="container-xxl flex-grow-1 container-p-y">
        <div class="card" style={{ marginBottom: "50px" }}>
          {/* <!-- Pricing Plans --> */}
          <div class="pb-4 rounded-top">
            <div class="container py-md-12 py-6 px-xl-10 px-4">
              <h3 class="text-center mb-2 mt-4">Pricing Plans</h3>
              <p class="text-center mb-0">
                All plans include 40+ advanced tools and features to boost your
                product.
                <br />
                Choose the best plan to fit your needs.
              </p>

              <div class="row mx-0 px-lg-12 gy-6 mt-6">
                {/* <!-- Basic --> */}
                <div class="col-xl mb-md-0 px-3">
                  <div class="card border rounded shadow-none">
                    <div class="card-body pt-12">
                      <div class="mt-3 mb-5 text-center">
                        <img
                          src="../../assets/img/icons/unicons/bookmark.png"
                          alt="Basic Image"
                          width="120"
                        />
                      </div>
                      <h4 class="card-title text-center text-capitalize mb-1">
                        Basic
                      </h4>
                      <p class="text-center mb-5">
                        A simple start for everyone
                      </p>
                      <div class="text-center h-px-50">
                        <div class="d-flex justify-content-center">
                          <sup class="h6 text-body pricing-currency mt-2 mb-0 me-1">
                            $
                          </sup>
                          <h1 class="mb-0 text-primary">0</h1>
                          <sub class="h6 text-body pricing-duration mt-auto mb-1">
                            /month
                          </sub>
                        </div>
                      </div>

                      <ul class="list-group my-5 pt-9">
                        <li class="mb-4 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>100 responses a month</span>
                        </li>
                        <li class="mb-4 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>Unlimited forms and surveys</span>
                        </li>
                        <li class="mb-4 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>Unlimited fields</span>
                        </li>
                        <li class="mb-4 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>Basic form creation tools</span>
                        </li>
                        <li class="mb-0 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>Up to 2 subdomains</span>
                        </li>
                      </ul>

                      <a
                        href="auth-register-basic.html"
                        class="btn btn-label-success d-grid w-100"
                      >
                        Your Current Plan
                      </a>
                    </div>
                  </div>
                </div>

                {/* <!-- Pro --> */}
                <div class="col-xl mb-md-0 px-3">
                  <div class="card border-primary border shadow-none">
                    <div class="card-body position-relative pt-4">
                      <div class="position-absolute end-0 me-5 top-0 mt-4">
                        <span class="badge bg-label-primary rounded-1">
                          Popular
                        </span>
                      </div>
                      <div class="my-5 pt-6 text-center">
                        <img
                          src="../../assets/img/icons/unicons/wallet-round.png"
                          alt="Pro Image"
                          width="120"
                        />
                      </div>
                      <h4 class="card-title text-center text-capitalize mb-1">
                        Standard
                      </h4>
                      <p class="text-center mb-5">
                        For small to medium businesses
                      </p>
                      <div class="text-center h-px-50">
                        <div class="d-flex justify-content-center">
                          <sup class="h6 text-body pricing-currency mt-2 mb-0 me-1">
                            $
                          </sup>
                          <h1 class="price-toggle price-yearly text-primary mb-0">
                            7
                          </h1>
                          <h1 class="price-toggle price-monthly text-primary mb-0 d-none">
                            9
                          </h1>
                          <sub class="h6 text-body pricing-duration mt-auto mb-1">
                            /month
                          </sub>
                        </div>
                        <small class="price-yearly price-yearly-toggle text-body-secondary">
                          USD 480 / year
                        </small>
                      </div>

                      <ul class="list-group my-5 pt-9">
                        <li class="mb-4 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>Unlimited responses</span>
                        </li>
                        <li class="mb-4 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>Unlimited forms and surveys</span>
                        </li>
                        <li class="mb-4 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>Instagram profile page</span>
                        </li>
                        <li class="mb-4 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>Google Docs integration</span>
                        </li>
                        <li class="mb-0 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>Custom “Thank you” page</span>
                        </li>
                      </ul>

                      <a
                        href="auth-register-basic.html"
                        class="btn btn-primary d-grid w-100"
                      >
                        Upgrade
                      </a>
                    </div>
                  </div>
                </div>

                {/* <!-- Enterprise --> */}
                <div class="col-xl px-3">
                  <div class="card border rounded shadow-none">
                    <div class="card-body pt-12">
                      <div class="mt-3 mb-5 text-center">
                        <img
                          src="../../assets/img/icons/unicons/briefcase-round.png"
                          alt="Pro Image"
                          width="120"
                        />
                      </div>
                      <h4 class="card-title text-center text-capitalize mb-1">
                        Enterprise
                      </h4>
                      <p class="text-center mb-5">
                        Solution for big organizations
                      </p>

                      <div class="text-center h-px-50">
                        <div class="d-flex justify-content-center">
                          <sup class="h6 text-body pricing-currency mt-2 mb-0 me-1">
                            $
                          </sup>
                          <h1 class="price-toggle price-yearly text-primary mb-0">
                            16
                          </h1>
                          <h1 class="price-toggle price-monthly text-primary mb-0 d-none">
                            19
                          </h1>
                          <sub class="h6 text-body pricing-duration mt-auto mb-1">
                            /month
                          </sub>
                        </div>
                        <small class="price-yearly price-yearly-toggle text-body-secondary">
                          USD 960 / year
                        </small>
                      </div>

                      <ul class="list-group my-5 pt-9">
                        <li class="mb-4 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>PayPal payments</span>
                        </li>
                        <li class="mb-4 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>Logic Jumps</span>
                        </li>
                        <li class="mb-4 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>File upload with 5GB storage</span>
                        </li>
                        <li class="mb-4 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>Custom domain support</span>
                        </li>
                        <li class="mb-0 d-flex align-items-center">
                          <span class="badge p-50 w-px-20 h-px-20 rounded-pill bg-label-primary me-2">
                            <i class="icon-base bx bx-check icon-xs"></i>
                          </span>
                          <span>Stripe integration</span>
                        </li>
                      </ul>

                      <a
                        href="auth-register-basic.html"
                        class="btn btn-label-primary d-grid w-100"
                      >
                        Upgrade
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!--/ Pricing Plans --> */}
        </div>
      </div>
    </div>
  );
}
