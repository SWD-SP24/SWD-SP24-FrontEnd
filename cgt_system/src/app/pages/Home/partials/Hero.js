import { useEffect, useState, useRef } from "react";
import Images from "../../../assets/img/images";
import { Link, useNavigate } from "react-router";

const Hero = () => {
  // State to track theme
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-bs-theme") === "dark"
  );

  // Refs for images
  const heroDashboardRef = useRef(null);
  const heroElementsRef = useRef(null);
  const nav = useNavigate();
  useEffect(() => {
    // Function to update theme state
    const updateTheme = () => {
      const darkMode =
        document.documentElement.getAttribute("data-bs-theme") === "dark";
      setIsDark(darkMode);
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
    <section id="hero-animation">
      <div
        id="landingHero"
        className="section-py landing-hero position-relative"
      >
        <img
          src={Images.heroBg}
          alt="hero background"
          className="position-absolute top-0 start-50 translate-middle-x object-fit-cover w-100 h-100"
          data-speed="1"
        />
        <div className="container">
          <div className="hero-text-box text-center position-relative">
            <h1 className="text-primary hero-title display-6 fw-extrabold">
              A smart way to track your child's growth
            </h1>
            <h2 className="hero-sub-title h6 mb-6">
              An intuitive platform to monitor health, vaccinations,
              <br className="d-none d-lg-block" />
              and overall development with ease.
            </h2>
            <div className="landing-hero-btn d-inline-block position-relative">
              <span className="hero-btn-item position-absolute d-none d-md-flex fw-medium">
                Explore now
                <img
                  src={Images.joinCommunityArrow}
                  alt="Join community arrow"
                  className="scaleX-n1-rtl"
                />
              </span>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => nav("register")}
              >
                Get started
              </button>
            </div>
          </div>
          <div id="heroDashboardAnimation" className="hero-animation-img">
            <Link to={"/register"}>
              <div
                id="heroAnimationImg"
                className="position-relative hero-dashboard-img"
              >
                <img
                  ref={heroDashboardRef}
                  src={
                    isDark ? Images.landingHeroDark : Images.landingHeroLight
                  }
                  alt="hero dashboard"
                  className="animation-img"
                  id="heroDashboard"
                  style={{
                    visibility: "visible",
                    height: "530px",
                    marginTop: "70px",
                    borderRadius: "1.25rem",
                    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.13)",
                  }}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="landing-hero-blank"></div>
    </section>
  );
};

export default Hero;
