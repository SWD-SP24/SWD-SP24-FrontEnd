import React, { useEffect, useState } from "react";
import styles from "./childHealthBook.module.scss";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import calculateAge from "../../util/calculateAge";
import boy from "../../assets/img/illustrations/baby-boy-Photoroom.png";
import girl from "../../assets/img/illustrations/baby-girl-Photoroom.png";

export default function CoverPage({ childId }) {
  const [data, setData] = useState({});
  const { response, callApi } = useApi({
    url: `${API_URLS.CHILDREN.GET_CHILDREN_WITH_ID}${childId}`,
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

  if (!response) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.coverContent} text-center`}>
      <div className="position-relative">
        <div
          className={`${styles.titleSection} d-flex align-items-center justify-content-center`}
        >
          <h2 className="ms-2 fw-bold">Child Health Record</h2>
        </div>
      </div>
      <div className={`${styles.childProfile} mt-3 p-3`}>
        <img
          src={data.avatar ? data.avatar : data.gender === "male" ? boy : girl}
          alt="Child Avatar"
          className="me-3"
          width={150}
        />
        <h3 className={`${styles.childName} mt-2`}>{data.fullName}</h3>
      </div>
      <table className={styles.infoTable}>
        <tbody className="d-flex flex-column">
          <tr>
            <td className="pe-4">🎂 Age:</td>
            <td className="mb-0">{calculateAge(data.dob)}</td>
          </tr>
          <tr>
            <td className="pe-4">🩺 Gender:</td>
            <td className="mb-0">
              {data.gender === "male" ? "Male" : "Female"}
            </td>
          </tr>
          <tr>
            <td className="pe-4">📅 Date of Birth:</td>
            <td className="mb-0">{formatDate(data.dob)}</td>
          </tr>
          <tr>
            <td className="pe-4">🩸 Blood Type:</td>
            <td className="mb-0">{data.bloodType}</td>
          </tr>
          <tr>
            <td className="pe-4">⚠️ Allergies:</td>
            <td className="mb-0">{data.allergies || "None"}</td>
          </tr>
          <tr>
            <td className="pe-4">🏥 Chronic Condition:</td>
            <td className="mb-0">{data.chronicConditions || "None"}</td>
          </tr>
        </tbody>
      </table>
      <div className={`${styles.doodle} ${styles.star}`}>✶</div>
      <div className={`${styles.doodle} ${styles.heart}`}>♥</div>
      <div className={styles.handwrittenNote}>Keep me healthy!</div>
    </div>
  );
}
