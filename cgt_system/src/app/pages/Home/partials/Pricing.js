//img
import Images from "../../../assets/img/images.js";
//core modules
import { useEffect, useState } from "react";
import getMembershipPackages from "../../../modules/MembershipPackages/getMembershipPackages.js";
const Pricing = () => {
  const [priceSales, setPriceSales] = useState(true);
  const [membershipPackages, setMembershipPackages] = useState(null);

  const homePackages = [];
  const handleChange = (e) => {
    if (e.target.checked === true) {
      setPriceSales(true);
      console.log(priceSales);
    } else {
      setPriceSales(false);
      console.log(priceSales);
    }
  };
  useEffect(() => {
    getMembershipPackages().then((data) => {
      setMembershipPackages(data);
    });
  }, []);
  if (membershipPackages === null) {
    return <div> </div>;
  }
  console.log(membershipPackages);
  homePackages.push(membershipPackages.at(3));
  membershipPackages.map((packages) => {
    if (
      packages.membershipPackageName != "Basic" &&
      packages.membershipPackageName != "Trial"
    ) {
      homePackages.push(packages);
    }
  });
  return (
    <section id="landingPricing" className="section-py bg-body landing-pricing">
      <div className="container">
        <div className="text-center mb-4">
          <span className="badge bg-label-primary">Pricing Plans</span>
        </div>
        <h4 className="text-center mb-1">
          <span className="position-relative fw-extrabold z-1 px-2">
            Tailored pricing plans
            <img
              src={Images.sectionTitleIcon}
              alt="laptop charging"
              className="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
            />
          </span>
          designed for you
        </h4>
        <p className="text-center pb-2 mb-7">
          All plans include 10+ advanced tools and features for you.
          <br />
          Choose the best plan to fit your needs.
          {console.log("hello")}
        </p>
        {/* <div className="text-center mb-12">
          <div className="position-relative d-inline-block pt-3 pt-md-0">
            <label className="switch switch-sm switch-primary me-0">
              <span className="switch-label fs-6 text-body me-3">
                Pay Monthly
              </span>
              <input
                id="price-toggler"
                type="checkbox"
                className="switch-input price-duration-toggler"
                defaultChecked={priceSales}
                onChange={(e) => handleChange(e)}
              />
              <span className="switch-toggle-slider">
                <span className="switch-on"></span>
                <span className="switch-off"></span>
              </span>
              <span className="switch-label fs-6 text-body ms-3">
                Pay Annual
              </span>
            </label>
            <div className="pricing-plans-item position-absolute d-flex">
              <img
                src={Images.pricingPlansArrow}
                alt="pricing plans arrow"
                className="scaleX-n1-rtl"
              />
              <span className="fw-medium mt-2 ms-1"> Save 25%</span>
            </div>
          </div>
        </div> */}
        <div className="row g-6 pt-lg-5">
          {/* <!-- Basic Plan: Start --> */}
          {/* <div className="col-xl-4 col-lg-6">
            <div className="card">
              <div className="card-header">
                <div className="text-center">
                  <img
                    src={Images.basicPlanIcon}
                    alt="paper airplane icon"
                    className="mb-8 pb-2"
                  />
                  <h4 className="mb-0">Basic</h4>
                  <div className="d-flex align-items-center justify-content-center">
                    <span
                      className={
                        priceSales
                          ? "price-monthly h2 text-primary fw-extrabold mb-0 d-none"
                          : "price-monthly h2 text-primary fw-extrabold mb-0"
                      }
                    >
                      $19
                    </span>
                    <span
                      className={
                        priceSales
                          ? "price-yearly h2 text-primary fw-extrabold mb-0"
                          : "price-yearly h2 text-primary fw-extrabold mb-0 d-none"
                      }
                    >
                      $14
                    </span>
                    <sub className="h6 text-body-secondary mb-n1 ms-1">/mo</sub>
                  </div>
                  <div className="position-relative pt-2">
                    <div
                      className={
                        priceSales
                          ? "price-yearly text-body-secondary price-yearly-toggle"
                          : "price-yearly text-body-secondary price-yearly-toggle d-none"
                      }
                    >
                      $ 168 / year
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul className="list-unstyled pricing-list">
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Timeline
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Basic search
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Live chat widget
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Email marketing
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Custom Forms
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Traffic analytics
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Basic Support
                    </h6>
                  </li>
                </ul>
                <div className="d-grid mt-8">
                  <a href="payment-page.html" className="btn btn-label-primary">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div> */}
          {/* <!-- Basic Plan: End --> */}

          {/* <!-- Favourite Plan: Start --> */}
          {/* <div className="col-xl-4 col-lg-6">
            <div className="card border border-primary shadow-xl">
              <div className="card-header">
                <div className="text-center">
                  <img
                    src={Images.favouritePlanIcon}
                    alt="plane icon"
                    className="mb-8 pb-2"
                  />
                  <h4 className="mb-0">Team</h4>
                  <div className="d-flex align-items-center justify-content-center">
                    <span
                      className={
                        priceSales
                          ? "price-monthly h2 text-primary fw-extrabold mb-0 d-none"
                          : "price-monthly h2 text-primary fw-extrabold mb-0"
                      }
                    >
                      $29
                    </span>
                    <span
                      className={
                        priceSales
                          ? "price-yearly h2 text-primary fw-extrabold mb-0"
                          : "price-yearly h2 text-primary fw-extrabold mb-0 d-none"
                      }
                    >
                      $22
                    </span>
                    <sub className="h6 text-body-secondary mb-n1 ms-1">/mo</sub>
                  </div>
                  <div className="position-relative pt-2">
                    <div
                      className={
                        priceSales
                          ? "price-yearly text-body-secondary price-yearly-toggle "
                          : "price-yearly text-body-secondary price-yearly-toggle d-none"
                      }
                    >
                      $ 264 / year
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul className="list-unstyled pricing-list">
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Everything in basic
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Timeline with database
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Advanced search
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Marketing automation
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Advanced chatbot
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Campaign management
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Collaboration tools
                    </h6>
                  </li>
                </ul>
                <div className="d-grid mt-8">
                  <a href="payment-page.html" className="btn btn-primary">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div> */}
          {/* <!-- Favourite Plan: End --> */}

          {/* <!-- Standard Plan: Start --> */}
          {/* <div className="col-xl-4 col-lg-6">
            <div className="card">
              <div className="card-header">
                <div className="text-center">
                  <img
                    src={Images.standardPlanIcon}
                    alt="shuttle rocket icon"
                    className="mb-8 pb-2"
                  />
                  <h4 className="mb-0">Enterprise</h4>
                  <div className="d-flex align-items-center justify-content-center">
                    <span
                      className={
                        priceSales
                          ? "price-monthly h2 text-primary fw-extrabold mb-0 d-none"
                          : "price-monthly h2 text-primary fw-extrabold mb-0"
                      }
                    >
                      $49
                    </span>
                    <span
                      className={
                        priceSales
                          ? "price-yearly h2 text-primary fw-extrabold mb-0 "
                          : "price-yearly h2 text-primary fw-extrabold mb-0 d-none"
                      }
                    >
                      $37
                    </span>
                    <sub className="h6 text-body-secondary mb-n1 ms-1">/mo</sub>
                  </div>
                  <div className="position-relative pt-2">
                    <div
                      className={
                        priceSales
                          ? "price-yearly text-body-secondary price-yearly-toggle"
                          : "price-yearly text-body-secondary price-yearly-toggle d-none"
                      }
                    >
                      $ 444 / year
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul className="list-unstyled pricing-list">
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Everything in premium
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Timeline with database
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Fuzzy search
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      A/B testing sanbox
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Custom permissions
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Social media automation
                    </h6>
                  </li>
                  <li>
                    <h6 className="d-flex align-items-center mb-3">
                      <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                        <i className="icon-base bx bx-check icon-12px"></i>
                      </span>
                      Sales automation tools
                    </h6>
                  </li>
                </ul>
                <div className="d-grid mt-8">
                  <a href="payment-page.html" className="btn btn-label-primary">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div> */}
          {/* <!-- Standard Plan: End --> */}
          {homePackages.map((packages) => {
            return (
              <div className="col-xl-4 col-lg-6">
                <div className="card" style={{ height: 695 }}>
                  <div className="card-header">
                    <div className="text-center">
                      <img
                        src={Images.basicPlanIcon}
                        alt="paper airplane icon"
                        className="mb-8 pb-2"
                      />
                      <h4 className="mb-0">{packages.membershipPackageName}</h4>
                      <div className="d-flex align-items-center justify-content-center">
                        <span
                          className={
                            priceSales
                              ? "price-monthly h2 text-primary fw-extrabold mb-0 d-none"
                              : "price-monthly h2 text-primary fw-extrabold mb-0"
                          }
                        >
                          {packages.price}
                        </span>
                        <span
                          className={
                            priceSales
                              ? "price-yearly h2 text-primary fw-extrabold mb-0"
                              : "price-yearly h2 text-primary fw-extrabold mb-0 d-none"
                          }
                        >
                          {packages.price === 0 ? "Free" : packages.price}
                        </span>
                        <sub className="h6 text-body-secondary mb-n1 ms-1">
                          /mo
                        </sub>
                      </div>
                      {/* <div className="position-relative pt-2">
                        <div
                          className={
                            priceSales
                              ? "price-yearly text-body-secondary price-yearly-toggle"
                              : "price-yearly text-body-secondary price-yearly-toggle d-none"
                          }
                        >
                          $ 168 / year
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div
                    className="card-body"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <ul className="list-unstyled pricing-list">
                      {packages.permissions.map((permissions) => {
                        return (
                          <li>
                            <h6 className="d-flex align-items-center mb-3">
                              <span className="badge badge-center rounded-pill bg-label-primary p-0 me-3">
                                <i className="icon-base bx bx-check icon-12px"></i>
                              </span>
                              {permissions.description}
                            </h6>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="d-grid mt-auto">
                      <a
                        href="payment-page.html"
                        className="btn btn-label-primary"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
