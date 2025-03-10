//img
import Images from "../../../assets/img/images.js";
//core modules
import { useEffect, useState } from "react";
import getMembershipPackages from "../../../modules/MembershipPackages/getMembershipPackages.js";
const Pricing = () => {
  const [priceSales, setPriceSales] = useState(true);
  const [membershipPackages, setMembershipPackages] = useState(null);

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
    return <div> loading </div>;
  }
  console.log(membershipPackages);

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

        <div className="row g-6 pt-lg-5">
          {/* <!-- Basic Plan: Start --> */}

          {/* <!-- Standard Plan: End --> */}
          {membershipPackages.map((packages) => {
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
                        src={checkType(packages.membershipPackageName)}
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
                      {packages.permissions.map((permissions, index) => {
                        return (
                          <li key={index}>
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

                    {/* Button stays at the bottom */}
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
