import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import styles from "./childHealthBook.module.scss";
import CoverPage from "./CoverPage";
import OverviewPage from "./OverviewPage";
import HealthMetricsPage from "./HealthMetricsPage";
import DentalPage from "./DentalPage";
import VaccinationHistoryPage from "./VaccinationHistoryPage";

const ChildHealthBook = ({ childId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const flipBookRef = useRef(null);

  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => {
        if (flipBookRef.current) {
          flipBookRef.current.pageFlip().update();
        }
      }, 300);
    }
  }, [modalOpen]);

  useEffect(() => {
    const modalElement = document.getElementById("childHealthBookModal");

    modalElement.addEventListener("shown.bs.modal", () => setModalOpen(true));
    modalElement.addEventListener("hidden.bs.modal", () => setModalOpen(false));

    return () => {
      modalElement.removeEventListener("shown.bs.modal", () =>
        setModalOpen(true)
      );
      modalElement.removeEventListener("hidden.bs.modal", () =>
        setModalOpen(false)
      );
    };
  }, []);

  return (
    <div
      className="modal fade"
      id="childHealthBookModal"
      tabIndex="-1"
      aria-modal="true"
      role="dialog"
      style={{
        display: "none",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="modal-dialog modal-xl modal-simple modal-dialog-centered"
        style={{ transform: "none" }}
      >
        <div
          className="modal-content"
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
            padding: "0",
          }}
        >
          <div className="modal-body p-4 d-flex flex-wrap gap-3 justify-content-center">
            <div
              className={styles.bookContainer}
              style={{
                visibility: modalOpen ? "visible" : "hidden",
                opacity: modalOpen ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              {[...Array(50)].map((_, i) => (
                <div key={i} className={styles.flower}></div>
              ))}
              {childId && (
                <HTMLFlipBook
                  key={modalOpen ? "flipbook-open" : "flipbook-closed"}
                  ref={flipBookRef}
                  width={500}
                  height={650}
                  showCover={true}
                  flippingTime={1000}
                  mobileScrollSupport={true}
                  maxShadowOpacity={0.3}
                >
                  <div
                    className={`${styles.page} ${styles.cover}`}
                    data-density="hard"
                  >
                    <CoverPage childId={childId} />
                  </div>
                  <div className={styles.page}>
                    <OverviewPage childId={childId} />
                  </div>
                  <div className={styles.page}>
                    <HealthMetricsPage childId={childId} />
                  </div>
                  <div className={styles.page}>
                    <DentalPage childId={childId} />
                  </div>
                  <div className={styles.page}>
                    <VaccinationHistoryPage childId={childId} />
                  </div>
                  <div
                    className={`${styles.page} ${styles.cover}`}
                    data-density="hard"
                  ></div>
                </HTMLFlipBook>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildHealthBook;
