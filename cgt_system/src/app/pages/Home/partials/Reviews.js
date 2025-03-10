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
                      <p>
                        “This child growth tracking system has been a lifesaver!
                        It helps me monitor my baby's milestones and vaccination
                        schedule with ease.”
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
                          <h6 className="mb-0">Emily Johnson</h6>
                          <p className="small text-body-secondary mb-0">
                            Mother of two
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card h-100">
                    <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                      <p>
                        “I love how this system provides personalized growth
                        insights for my child. It makes parenting so much
                        easier!”
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
                          <h6 className="mb-0">David Martinez</h6>
                          <p className="small text-body-secondary mb-0">
                            Pediatrician
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card h-100">
                    <div className="card-body text-body d-flex flex-column justify-content-between h-100">
                      <p>
                        “Tracking my child's weight and height progress has
                        never been this simple! Highly recommended for all
                        parents.”
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
                            src={Images.avatar3}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0">Sarah Lee</h6>
                          <p className="small text-body-secondary mb-0">
                            New Parent
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
      <div className="swiper-logo-carousel pt-8">
        <Swiper
          id="swiper-clients-logos"
          slidesPerView={5}
          className="flex items-center"
        >
          <SwiperSlide className="swiper-slide flex justify-center">
            <img
              src={Images.WHO}
              alt="Global Nutrition Report logo"
              className="client-logo h-16 object-contain mx-auto"
            />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide flex justify-center">
            <img
              src={Images.CDC}
              alt="WHO Child Health logo"
              className="client-logo h-16 object-contain mx-auto"
            />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide flex justify-center">
            <img
              src={Images.Gavi}
              alt="WHO Growth Standards logo"
              className="client-logo h-16 object-contain mx-auto"
            />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide flex justify-center">
            <img
              src={Images.UNICEF}
              alt="CDC logo"
              className="client-logo h-16 object-contain mx-auto"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* <!-- Logo slider: End --> */}
    </section>
    // <!-- Real customers reviews: End -->
  );
};

export default Reviews;
