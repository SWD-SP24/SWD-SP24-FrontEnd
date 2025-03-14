import React, { useEffect, useState } from "react";
import styles from "./childHealthBook.module.scss";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import calculateAge from "../../util/calculateAge";
import boy from "../../assets/img/illustrations/baby-boy-Photoroom.png";
import girl from "../../assets/img/illustrations/baby-girl-Photoroom.png";
import Skeleton from "react-loading-skeleton";

export default function CoverPage({ childId, user }) {
  const [data, setData] = useState({});
  const { isLoading, response, callApi } = useApi({
    url:
      user.role === "member"
        ? `${API_URLS.CHILDREN.GET_CHILDREN_WITH_ID}${childId}`
        : `${API_URLS.CHILDREN.GET_CHILD}${childId}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response?.data) {
      if (response.data) {
        setData(response.data);
      }
    }
  }, [response]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className={`${styles.coverContent} text-center`}>
      <div className="position-relative">
        {isLoading ? (
          <Skeleton width={426} height={106} />
        ) : (
          <div
            className={`${styles.titleSection} d-flex align-items-center justify-content-center`}
          >
            <h2 className="ms-2 fw-bold">Child Health Record</h2>
          </div>
        )}
      </div>

      <div className={`${styles.childProfile} mt-3 p-3`}>
        {isLoading ? (
          <Skeleton circle width={150} height={150} />
        ) : (
          <img
            src={
              data.avatar ? data.avatar : data.gender === "male" ? boy : girl
            }
            alt="Child Avatar"
            className="me-3"
            width={150}
          />
        )}
        <h3 className={`${styles.childName} mt-2`}>
          {isLoading ? <Skeleton width={120} height={20} /> : data.fullName}
        </h3>
      </div>

      <table className={styles.infoTable}>
        <tbody className="d-flex flex-column">
          {[
            { label: "🎂 Age:", value: calculateAge(data.dob) },
            {
              label: "🩺 Gender:",
              value: data.gender === "male" ? "Male" : "Female",
            },
            { label: "📅 Date of Birth:", value: formatDate(data.dob) },
            { label: "🩸 Blood Type:", value: data.bloodType },
            { label: "⚠️ Allergies:", value: data.allergies || "None" },
            {
              label: "🏥 Chronic Condition:",
              value: data.chronicConditions || "None",
            },
          ].map((item, index) => (
            <tr key={index}>
              <td className="pe-4">{item.label}</td>
              <td className="mb-0">
                {isLoading ? <Skeleton width={100} height={16} /> : item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={`${styles.doodle} ${styles.star}`}>✶</div>
      <div className={`${styles.doodle} ${styles.heart}`}>♥</div>
      <div className={styles.handwrittenNote}>Keep me healthy!</div>
    </div>
  );
}
