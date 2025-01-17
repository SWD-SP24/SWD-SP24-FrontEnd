//img
import Images from "../../../assets/img/images";
const Hero = () => {
  return (
    // <!-- Hero: Start -->
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
              Support you to observe your childs growth
            </h1>
            <h2 className="hero-sub-title h6 mb-6">
              Provide many effective and useful features
              <br className="d-none d-lg-block" />
              for Tracking and Giving consultation to parents.
            </h2>
            <div className="landing-hero-btn d-inline-block position-relative">
              <span className="hero-btn-item position-absolute d-none d-md-flex fw-medium">
                Check out
                <img
                  src={Images.joinCommunityArrow}
                  alt="Join community arrow"
                  className="scaleX-n1-rtl"
                />
              </span>
              <a href="#landingPricing" className="btn btn-primary btn-lg">
                Get your membership
              </a>
            </div>
          </div>
          <div id="heroDashboardAnimation" className="hero-animation-img">
            <a href="../html/index.html" target="_blank">
              <div
                id="heroAnimationImg"
                className="position-relative hero-dashboard-img"
              >
                <img
                  src={Images.heroDashboard}
                  alt="hero dashboard"
                  className="animation-img"
                  data-app-light-img="front-pages/landing-page/hero-dashboard-light.png"
                  data-app-dark-img="front-pages/landing-page/hero-dashboard-dark.png"
                />
                <img
                  src={Images.heroElement}
                  alt="hero elements"
                  className="position-absolute hero-elements-img animation-img top-0 start-0"
                  data-app-light-img="front-pages/landing-page/hero-elements-light.png"
                  data-app-dark-img="front-pages/landing-page/hero-elements-dark.png"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="landing-hero-blank"></div>
    </section>
    // <!-- Hero: End -->
  );
};

export default Hero;
