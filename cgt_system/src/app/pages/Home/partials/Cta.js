import { useEffect, useState } from "react";
import Images from "../../../assets/img/images.js";

const Cta = () => {
  // State to track the theme
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.getAttribute("data-bs-theme") === "dark"
  );

  useEffect(() => {
    // Function to update the theme state
    const updateTheme = () => {
      setIsDarkMode(
        document.documentElement.getAttribute("data-bs-theme") === "dark"
      );
    };

    // Observe theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-bs-theme"],
    });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="landingCTA"
      className="section-py landing-cta position-relative p-lg-0 pb-0"
    >
      <img
        src={isDarkMode ? Images.ctaDarkBg : Images.ctaLightBg}
        className="position-absolute bottom-0 end-0 scaleX-n1-rtl h-100 w-100 z-n1"
        alt="cta background"
      />
      <div className="container">
        <div className="row align-items-center gy-12">
          <div className="col-lg-6 text-start text-sm-center text-lg-start">
            <h3 className="cta-title text-primary fw-bold mb-1">
              Track Your Child’s Growth with Ease!
            </h3>
            <h5 className="text-body mb-8">
              Start monitoring milestones, vaccinations, and growth patterns
              today.
            </h5>
            <a href="signup.html" className="btn btn-lg btn-primary">
              Get Started Now
            </a>
          </div>
          <div className="col-lg-6 pt-lg-12 text-center text-lg-end">
            <img
              src={Images.ctaDashboardBg}
              alt="child growth dashboard"
              className="img-fluid mt-lg-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
