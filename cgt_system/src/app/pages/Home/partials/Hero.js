//img
import Images from "../../../assets/img/images";
const Hero = () => {
  const isDarkMode =
    document.documentElement.getAttribute("data-bs-theme") === "dark";

  return (
    <section id="hero-animation">
      <div id="landingHero" class="section-py landing-hero position-relative">
        <img
          src={Images.heroBg}
          alt="hero background"
          class="position-absolute top-0 start-50 translate-middle-x object-fit-cover w-100 h-100"
          data-speed="1"
        />
        <div class="container">
          <div class="hero-text-box text-center position-relative">
            <h1 class="text-primary hero-title display-6 fw-extrabold">
              A smart way to track your child's growth
            </h1>
            <h2 class="hero-sub-title h6 mb-6">
              An intuitive platform to monitor health, vaccinations,
              <br class="d-none d-lg-block" />
              and overall development with ease.
            </h2>
            <div class="landing-hero-btn d-inline-block position-relative">
              <span class="hero-btn-item position-absolute d-none d-md-flex fw-medium">
                Explore now
                <img
                  src={Images.joinCommunityArrow}
                  alt="Join community arrow"
                  class="scaleX-n1-rtl"
                />
              </span>
              <a href="#landingPricing" class="btn btn-primary btn-lg">
                Get started
              </a>
            </div>
          </div>
          <div id="heroDashboardAnimation" class="hero-animation-img">
            <a href="#" target="_blank">
              <div
                id="heroAnimationImg"
                class="position-relative hero-dashboard-img"
                style={{
                  transform:
                    "perspective(1200px) rotateX(2.54deg) rotateY(-8.18deg) scale3d(1, 1, 1);",
                }}
              >
                <img
                  src={
                    isDarkMode ? Images.heroDashboardDark : Images.heroDashboard
                  }
                  alt="hero dashboard"
                  class="animation-img"
                  style={{ visibility: "visible;" }}
                />
                <img
                  src={isDarkMode ? Images.heroElementDark : Images.heroElement}
                  alt="hero elements"
                  class="position-absolute hero-elements-img animation-img top-0 start-0"
                  style={{
                    visibility: " visible;",
                    transform: "translateZ(1rem);",
                  }}
                />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="landing-hero-blank"></div>
    </section>
  );
};

export default Hero;
