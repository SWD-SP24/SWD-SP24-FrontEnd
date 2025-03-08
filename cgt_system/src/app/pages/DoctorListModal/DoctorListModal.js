import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const doctors = [
  {
    id: 1,
    name: "Dr. Chu Thi Minh",
    specialty: "Public Relations Specialist",
    image:
      "https://ivie.vn/_next/image?url=https%3A%2F%2Fisofhcare-backup.s3-ap-southeast-1.amazonaws.com%2Fimages%2Fdoctor_f4ed72b7_85fc_43d7_ac3b_9e98156ce1f6.png&w=1920&q=75",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "Dr. John Doe",
    specialty: "Pediatrician",
    image:
      "https://ivie.vn/_next/image?url=https%3A%2F%2Fisofhcare-backup.s3-ap-southeast-1.amazonaws.com%2Fimages%2Ftest_7f16e492_a1e5_435f_9f02_bcf31894d87c.png&w=640&q=75",
    rating: 4.2,
    reviews: 98,
  },
  {
    id: 3,
    name: "Dr. Jane Smith",
    specialty: "Dermatologist",
    image:
      "https://ivie.vn/_next/image?url=https%3A%2F%2Fisofhcare-backup.s3-ap-southeast-1.amazonaws.com%2Fimages%2Fdoctor_23d469d9_d5ef_4e13_8be8_4d75b3bb6005.png&w=1920&q=75",
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 4,
    name: "Dr. Emily Brown",
    specialty: "Cardiologist",
    image:
      "https://ivie.vn/_next/image?url=https%3A%2F%2Fisofhcare-backup.s3-ap-southeast-1.amazonaws.com%2Fimages%2Fdoctor_82972113_966a_4d7e_b194_3734a39341c1.png&w=1920&q=75",
    rating: 4.9,
    reviews: 200,
  },
];

export default function DoctorListModal() {
  return (
    <div
      className="modal fade"
      id="doctorListModal"
      tabIndex="-1"
      aria-modal="true"
      role="dialog"
      style={{ display: "none" }}
    >
      <div className="modal-dialog modal-xl modal-simple modal-dialog-centered modal-pricing">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-body p-4">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <h3 className="text-center text-primary fw-bold mb-3">
              Consult a Doctor
            </h3>
            <p className="text-center text-muted mb-4">
              Find the best doctors to get expert advice on your child's health.
              Our experienced specialists are here to help.
            </p>
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loopFillGroupWithBlank={true}
              coverflowEffect={{
                rotate: 10,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true }}
              className="pt-3"
            >
              {doctors.map((doctor) => (
                <SwiperSlide key={doctor.id}>
                  <div
                    className="card border-0 shadow-sm p-4 text-center"
                    style={{
                      borderRadius: "20px",
                      transition: "transform 0.3s ease-in-out",
                      background: "linear-gradient(135deg, #E3F2FD, #FFFFFF)",
                    }}
                  >
                    <span
                      className="badge bg-primary position-absolute"
                      style={{
                        top: "10px",
                        right: "10px",
                        fontSize: "12px",
                        padding: "6px 12px",
                        borderRadius: "12px",
                      }}
                    >
                      🌟 Featured
                    </span>
                    <div className="d-flex justify-content-center">
                      <div
                        className="rounded-circle overflow-hidden border shadow-sm"
                        style={{
                          width: "170px",
                          height: "170px",
                          border: "4px solid #0d6efd",
                        }}
                      >
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-100 h-100 object-fit-cover"
                        />
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-dark">
                        {doctor.name}
                      </h5>
                      <p className="text-muted small">{doctor.specialty}</p>
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        {Array.from({ length: 5 }, (_, index) => (
                          <i
                            key={index}
                            className={
                              index < Math.floor(doctor.rating)
                                ? "bx bxs-star text-warning"
                                : "bx bx-star text-secondary"
                            }
                          ></i>
                        ))}
                        <span className="text-muted ms-2 small">
                          ({doctor.reviews} reviews)
                        </span>
                      </div>
                      <button className="btn btn-primary mt-6 w-100">
                        Chat Now
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
