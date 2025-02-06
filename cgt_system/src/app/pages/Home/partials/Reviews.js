//img
import Images from "../../../assets/img/images.js";
//core modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const Reviews = () => {
  return (
    // <!-- Real customers reviews: Start -->
    <section
      id="landingReviews"
      className="section-py bg-body landing-reviews pb-0"
    >
      {/* <!-- What people say slider: Start --> */}
      <div className="container">
        <div className="row align-items-center gx-0 gy-4 g-lg-5 mb-5 pb-md-5">
          <div className="col-md-6 col-lg-5 col-xl-3">
            <div className="mb-4">
              <span className="badge bg-label-primary">
                Real Customers Reviews
              </span>
            </div>
            <h4 className="mb-1">
              <span className="position-relative fw-extrabold z-1">
                What people say
                <img
                  src={Images.sectionTitleIcon}
                  alt="laptop charging"
                  className="section-title-img position-absolute object-fit-contain bottom-0 z-n1"
                />
              </span>
            </h4>
            <p className="mb-5 mb-md-12">
              See what our customers have to
              <br className="d-none d-xl-block" />
              say about their experience.
            </p>
            <div className="landing-reviews-btns">
              <button
                id="reviews-previous-btn"
                className="btn btn-icon btn-label-primary reviews-btn me-3"
                type="button"
              >
                <i className="icon-base bx bx-chevron-left icon-md scaleX-n1-rtl"></i>
              </button>
              <button
                id="reviews-next-btn"
                className="btn btn-icon btn-label-primary reviews-btn"
                type="button"
              >
                <i className="icon-base bx bx-chevron-right icon-md scaleX-n1-rtl"></i>
              </button>
            </div>
          </div>
          <div className="col-md-6 col-lg-7 col-xl-9">
            <div className="swiper-reviews-carousel overflow-hidden">
              <Swiper
                id="swiper-reviews"
                slidesPerView={3}
                spaceBetween={25}
                modules={[Navigation, Pagination, Autoplay]}
                freeMode={true}
                navigation={{
                  prevEl: "#reviews-previous-btn",
                  nextEl: "#reviews-next-btn",
                }}
                loop={true}
                grabCursor={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
              >
                <SwiperSlide>
                  <div className="card h-100">
                    <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                      <div className="mb-4">
                        <img
                          src={Images.clientLogo1}
                          alt="client logo"
                          className="client-logo img-fluid"
                        />
                      </div>
                      <p>
                        “Vuexy is hands down the most useful front end Bootstrap
                        theme I've ever used. I can't wait to use it again for
                        my next project.”
                      </p>
                      <div className="text-warning mb-4">
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="avatar me-3 avatar-sm">
                          <img
                            src={Images.avatar1}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0">Cecilia Payne</h6>
                          <p className="small text-body-secondary mb-0">
                            CEO of Airbnb
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card h-100">
                    <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                      <div className="mb-4">
                        <img
                          src={Images.clientLogo2}
                          alt="client logo"
                          className="client-logo img-fluid"
                        />
                      </div>
                      <p>
                        “I've never used a theme as versatile and flexible as
                        Vuexy. It's my go to for building dashboard sites on
                        almost any project.”
                      </p>
                      <div className="text-warning mb-4">
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="avatar me-3 avatar-sm">
                          <img
                            src={Images.avatar2}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0">Eugenia Moore</h6>
                          <p className="small text-body-secondary mb-0">
                            Founder of Hubspot
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card h-100">
                    <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                      <div className="mb-4">
                        <img
                          src={Images.clientLogo3}
                          alt="client logo"
                          className="client-logo img-fluid"
                        />
                      </div>
                      <p>
                        This template is really clean & well documented. The
                        docs are really easy to understand and it's always easy
                        to find a screenshot from their website.
                      </p>
                      <div className="text-warning mb-4">
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="avatar me-3 avatar-sm">
                          <img
                            src={Images.avatar3}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0">Curtis Fletcher</h6>
                          <p className="small text-body-secondary mb-0">
                            Design Lead at Dribbble
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card h-100">
                    <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                      <div className="mb-4">
                        <img
                          src={Images.clientLogo4}
                          alt="client logo"
                          className="client-logo img-fluid"
                        />
                      </div>
                      <p>
                        All the requirements for developers have been taken into
                        consideration, so I’m able to build any interface I
                        want.
                      </p>
                      <div className="text-warning mb-4">
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bx-star"></i>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="avatar me-3 avatar-sm">
                          <img
                            src={Images.avatar4}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0">Sara Smith</h6>
                          <p className="small text-body-secondary mb-0">
                            Founder of Continental
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card h-100">
                    <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                      <div className="mb-4">
                        <img
                          src={Images.clientLogo5}
                          alt="client logo"
                          className="client-logo img-fluid"
                        />
                      </div>
                      <p>
                        “I've never used a theme as versatile and flexible as
                        Vuexy. It's my go to for building dashboard sites on
                        almost any project.”
                      </p>
                      <div className="text-warning mb-4">
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="avatar me-3 avatar-sm">
                          <img
                            src={Images.avatar5}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0">Eugenia Moore</h6>
                          <p className="small text-body-secondary mb-0">
                            Founder of Hubspot
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card h-100">
                    <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                      <div className="mb-4">
                        <img
                          src={Images.clientLogo6}
                          alt="client logo"
                          className="client-logo img-fluid"
                        />
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Veniam nemo mollitia, ad eum officia numquam nostrum
                        repellendus consequuntur!
                      </p>
                      <div className="text-warning mb-4">
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bxs-star"></i>
                        <i className="icon-base bx bx-star"></i>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="avatar me-3 avatar-sm">
                          <img
                            src={Images.avatar1}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0">Sara Smith</h6>
                          <p className="small text-body-secondary mb-0">
                            Founder of Continental
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- What people say slider: End --> */}
      <hr className="m-0 mt-6 mt-md-12" />
      {/* <!-- Logo slider: Start --> */}
      <div className="container">
        <div className="swiper-logo-carousel pt-8">
          <Swiper id="swiper-clients-logos" slidesPerView={5}>
            <SwiperSlide className="swiper-slide">
              <img
                src={Images.lightLogo1}
                alt="client logo"
                className="client-logo"
                data-app-light-img="front-pages/branding/logo_1-light.png"
                data-app-dark-img="front-pages/branding/logo_1-dark.png"
              />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <img
                src={Images.lightLogo2}
                alt="client logo"
                className="client-logo"
                data-app-light-img="front-pages/branding/logo_2-light.png"
                data-app-dark-img="front-pages/branding/logo_2-dark.png"
              />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <img
                src={Images.lightLogo3}
                alt="client logo"
                className="client-logo"
                data-app-light-img="front-pages/branding/logo_3-light.png"
                data-app-dark-img="front-pages/branding/logo_3-dark.png"
              />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <img
                src={Images.lightLogo4}
                alt="client logo"
                className="client-logo"
                data-app-light-img="front-pages/branding/logo_4-light.png"
                data-app-dark-img="front-pages/branding/logo_4-dark.png"
              />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <img
                src={Images.lightLogo5}
                alt="client logo"
                className="client-logo"
                data-app-light-img="front-pages/branding/logo_5-light.png"
                data-app-dark-img="front-pages/branding/logo_5-dark.png"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/* <!-- Logo slider: End --> */}
    </section>
    // <!-- Real customers reviews: End -->
  );
};

export default Reviews;
