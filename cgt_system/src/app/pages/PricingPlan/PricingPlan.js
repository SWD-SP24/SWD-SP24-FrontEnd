import React, { useEffect, useState } from "react";
import styles from "./PricingPlan.module.scss";
import classNames from "classnames/bind";
import API_URLS from "../../config/apiUrls";
import useApi from "../../hooks/useApi";
import Images from "../../assets/img/images.js";
import { Link, useNavigate } from "react-router";
import showToast from "../../util/showToast.js";
const cx = classNames.bind(styles);
export default function PricingPlan() {
  const [currentTheme, setCurrentTheme] = useState(
    document.documentElement.getAttribute("data-bs-theme")
  );
  const navigate = useNavigate();
  const { response, callApi } = useApi({
    url: `${API_URLS.MEMBERSHIP_PACKAGE.GET}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    console.log(response);
  }, [response]);

  const checkType = (type) => {
    if (type === "Basic") {
      return Images.basicPlanIcon;
    }
    if (type === "Standard") {
      return Images.standardPlanIcon;
    }
    if (type === "Enterprise") {
      return Images.PremiumPlanIcon;
    }
  };
  const handleBuy = (e) => {
    e.preventDefault();

    showToast({
      icon: "warning",
      text: "You need to login first",
      showButtons: true,
      onConfirm: () => navigate("/login"),
      onCancel: null,
    });
  };
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

                {/* <!-- Pro --> */}
                {response &&
                  response.data.map((pkg) => {
                    return (
                      <div className="col-xl-4 col-lg-6">
                        <div
                          className="card d-flex flex-column pricing-list"
                          style={{
                            height: "750px",
                            overflowY: "hidden",
                          }}
                        >
                          <div className="card-header">
                            <div className="text-center">
                              <img
                                src={checkType(pkg.membershipPackageName)}
                                alt="paper airplane icon"
                                className="mb-8 pb-2"
                              />
                              <h4 className="mb-0">
                                {pkg.membershipPackageName}
                              </h4>
                              <div className="d-flex align-items-center justify-content-center">
                                <span
                                  className={
                                    "price-monthly h2 text-primary fw-extrabold mb-0 d-none"
                                  }
                                >
                                  {pkg.price}
                                </span>
                                <span
                                  className={
                                    "price-yearly h2 text-primary fw-extrabold mb-0 d-none"
                                  }
                                >
                                  {pkg.price === 0 ? "Free" : pkg.price}
                                </span>
                                <sub className="h6 text-body-secondary mb-n1 ms-1">
                                  /mo
                                </sub>
                              </div>
                            </div>
                          </div>

                          <div
                            className="card-body d-flex flex-column"
                            style={{ flexGrow: 1, overflow: "hidden" }}
                          >
                            {/* Limit height for permissions */}
                            <ul
                              className="list-unstyled pricing-list flex-grow-1"
                              style={{ maxHeight: "400px", overflowY: "auto" }}
                            >
                              {pkg.permissions.map((permission, index) => {
                                return (
                                  <li key={index}>
                                    <h6 className="d-flex align-items-center mb-3">
                                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                                        <i className="icon-base bx bx-check icon-12px"></i>
                                      </span>
                                      {permission.description}
                                    </h6>
                                  </li>
                                );
                              })}
                            </ul>

                            {/* Button stays at the bottom */}
                            <div className="d-grid mt-auto">
                              <Link
                                onClick={(e) => handleBuy(e)}
                                className="btn btn-label-primary"
                              >
                                Get Started
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {/* <!-- Enterprise --> */}
              </div>
            </div>
          </div>
          {/* <!--/ Pricing Plans --> */}
        </div>
      </div>
    </div>
  );
}
