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
    if (type === "Premium") {
      return Images.PremiumPlanIcon;
    }
  };
  const handleBuy = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  if (response === null) {
    return <div>loading</div>;
  }
  function filterPermissions(membershipData) {
    const packageMap = {};

    membershipData.data.forEach((pkgData) => {
      packageMap[pkgData.membershipPackageName] = new Set(
        pkgData.permissions.map((p) => p.description)
      );
    });

    return membershipData.data.map((pkgData) => {
      let filteredPermissions = [...packageMap[pkgData.membershipPackageName]];

      if (pkgData.membershipPackageName === "Premium") {
        filteredPermissions = filteredPermissions.filter(
          (p) => !packageMap["Standard"].has(p)
        );
      } else if (pkgData.membershipPackageName === "Standard") {
        filteredPermissions = filteredPermissions.filter(
          (p) => !packageMap["Basic"].has(p)
        );
      }

      return {
        membershipPackageName: pkgData.membershipPackageName,
        permissions: filteredPermissions,
      };
    });
  }

  const permissionSubtitle = (name) => {
    if (name === "Basic") {
      return <strong>Simple start for everyone</strong>;
    }
    if (name === "Standard") {
      return <strong> Contain all the features of basic plan</strong>;
    }
    if (name === "Premium") {
      return <strong> Contain all the features of standard plan</strong>;
    }
  };
  // Sample API response (replace this with your actual API response)

  const filteredPermissions = filterPermissions(response);
  console.log(filteredPermissions);
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
                            height: "700px",
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
                                    "price-yearly h2 text-primary fw-extrabold mb-0 "
                                  }
                                >
                                  {pkg.price === 0 ? "Free" : pkg.price + "$"}
                                </span>
                                <sub className="h6 text-body-secondary mb-n1 ms-1">
                                  /mo
                                </sub>
                              </div>
                              <small className="text-muted text-center">
                                {pkg.summary}
                              </small>
                            </div>
                          </div>

                          <div
                            className="card-body d-flex flex-column"
                            style={{ flexGrow: 1, overflow: "hidden" }}
                          >
                            <span style={{ textAlign: "center" }}>
                              {permissionSubtitle(pkg.membershipPackageName)}
                            </span>
                            {/* Limit height for permissions */}
                            <ul
                              className="list-unstyled pricing-list flex-grow-1 mt-4"
                              style={{ maxHeight: "400px", overflowY: "auto" }}
                            >
                              {filteredPermissions &&
                                filteredPermissions
                                  .find(
                                    (p) =>
                                      p.membershipPackageName ===
                                      pkg.membershipPackageName
                                  )
                                  .permissions.map((permission, index) => (
                                    <li key={index}>
                                      <h6 className="d-flex align-items-center mb-3">
                                        <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                                          <i className="icon-base bx bx-check icon-12px"></i>
                                        </span>
                                        {permission}
                                      </h6>
                                    </li>
                                  ))}
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

                {/* <!-- Premium --> */}
              </div>
            </div>
          </div>
          {/* <!--/ Pricing Plans --> */}
        </div>
      </div>
    </div>
  );
}
