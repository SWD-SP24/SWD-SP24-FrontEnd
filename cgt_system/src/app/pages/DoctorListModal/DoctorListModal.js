import React, { useEffect, useState } from "react";
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
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { Modal } from "bootstrap";
import default_avatar from "../../assets/img/avatars/default-avatar.jpg";
import Skeleton from "react-loading-skeleton";

export default function DoctorListModal({
  user,
  conversations,
  onSelectConversation,
}) {
  const { isLoading, response, callApi } = useApi({
    url: API_URLS.USER.GET_DOCTORS_LIST,
    method: "GET",
  });

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const modalElement = document.getElementById("doctorListModal");
    if (modalElement) {
      modalElement.addEventListener("shown.bs.modal", () => callApi());
      modalElement.addEventListener("hidden.bs.modal", handleCloseModal);
    }
    return () => {
      if (modalElement) {
        modalElement.removeEventListener("shown.bs.modal", callApi);
        modalElement.removeEventListener("hidden.bs.modal", handleCloseModal);
      }
    };
  }, []);

  useEffect(() => {
    if (response?.status === "successful") {
      const doctors = response.data || [];
      if (doctors) {
        setDoctors(doctors);
      }
    }
  }, [response]);

  const handleCloseModal = () => {
    setDoctors([]);
  };

  const handleChatWithDoctor = async (doctor) => {
    if (!user) return;

    // Kiểm tra xem đã có cuộc trò chuyện với bác sĩ chưa
    const existingConversation = conversations.find((conv) =>
      conv.participants.includes(doctor.userId)
    );

    if (existingConversation) {
      // Nếu đã có, mở cuộc trò chuyện đó
      onSelectConversation(existingConversation);
    } else {
      // Nếu chưa, tạo cuộc trò chuyện mới
      const conversationId = `${user.userId}_${doctor.userId}`;

      const conversationRef = doc(db, "conversations", conversationId);

      await setDoc(conversationRef, {
        id: `${user.userId}_${doctor.userId}`,
        participants: [user.userId, doctor.userId],
        lastSenderId: "",
        lastSenderName: "",
        lastSenderAvatar: "",
        lastMessage: "The consultation has started",
        lastTimestamp: serverTimestamp(),
        [user.userId]: { name: user.fullName, avatar: user.avatar },
        [doctor.userId]: { name: doctor.fullName, avatar: doctor.avatar },
        unreadCounts: {
          [user.userId]: 1,
          [doctor.userId]: 1,
        },
      });

      const newConversation = {
        id: conversationRef.id,
        participants: [user.userId, doctor.userId],
        lastSenderId: "",
        lastSenderName: "",
        lastSenderAvatar: "",
        lastMessage: "The consultation has started",
        lastTimestamp: serverTimestamp(),
        [user.userId]: { name: user.fullName, avatar: user.avatar },
        [doctor.userId]: { name: doctor.fullName, avatar: doctor.avatar },
        unreadCounts: {
          [user.userId]: 1,
          [doctor.userId]: 1,
        },
      };

      // Mở cuộc trò chuyện mới
      onSelectConversation(newConversation);
    }

    const modalElement = document.getElementById("doctorListModal");
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

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
              Consult A Doctor
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
              {isLoading
                ? [...Array(5)].map((_, index) => (
                    <SwiperSlide key={index}>
                      <div className="card border-0 shadow-sm p-4 text-center rounded-4">
                        <div className="d-flex justify-content-center">
                          <Skeleton circle={true} height={170} width={170} />
                        </div>
                        <div className="card-body">
                          <Skeleton height={20} width="60%" className="mb-2" />
                          <Skeleton height={15} width="40%" className="mb-2" />
                          <Skeleton height={15} width="50px" className="mb-3" />
                          <Skeleton height={40} width="100%" />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                : doctors.map((doctor) => (
                    <SwiperSlide key={doctor.userId}>
                      <div
                        className="card border shadow-none p-4 text-center"
                        style={{
                          borderRadius: "20px",
                          transition: "transform 0.3s ease-in-out",
                          background:
                            "linear-gradient(135deg, #E3F2FD, #FFFFFF)",
                        }}
                      >
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
                              src={doctor.avatar || default_avatar}
                              alt={doctor.fullName}
                              className="w-100 h-100 object-fit-cover"
                            />
                          </div>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title fw-bold text-dark">
                            {doctor.fullName}
                          </h5>
                          <div className="d-flex justify-content-center align-items-center mb-1">
                            <i className="bx bx-first-aid me-2"></i>
                            <span className="text-normal small">
                              {doctor.specialization}
                            </span>
                          </div>
                          <div className="d-flex justify-content-center align-items-center mb-3">
                            <i className="bx bx-buildings me-2"></i>
                            <span className="text-normal small">
                              {doctor.hospital}
                            </span>
                          </div>
                          <button
                            className="btn btn-primary mt-6 w-100"
                            onClick={() => handleChatWithDoctor(doctor)}
                          >
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
