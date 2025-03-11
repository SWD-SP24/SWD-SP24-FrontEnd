import React from "react";
import HTMLFlipBook from "react-pageflip";
import styles from "./childHealthBook.module.scss";
import { Line } from "react-chartjs-2";
import boy from "../../assets/img/illustrations/baby-boy-Photoroom.png";
import flower1 from "../../assets/img/illustrations/flower-green-yellow-svgrepo-com.svg";
import flower2 from "../../assets/img/illustrations/flower-green-yellow-svgrepo-com.svg";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import HeightChart from "./HeightChart,";
import Teeth from "./Teeth";
import { useLocation } from "react-router";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Dữ liệu cho biểu đồ
const heightData = {
  labels: ["Jan 2023", "Jun 2023", "Jan 2024"],
  datasets: [
    {
      label: "Height (cm)",
      data: [85, 90, 95, 98, 12, 43, 43],
      borderColor: "#ff7300",
      backgroundColor: "rgba(255, 115, 0, 0.2)",
      tension: 0.3,
      pointRadius: 5,
    },
  ],
};

const weightData = {
  labels: ["Jan 2023", "Jun 2023", "Jan 2024"],
  datasets: [
    {
      label: "Weight (kg)",
      data: [12, 13, 14],
      borderColor: "#0088FE",
      backgroundColor: "rgba(0, 136, 254, 0.2)",
      tension: 0.3,
      pointRadius: 5,
    },
  ],
};

const bmiData = {
  labels: ["Jan 2023", "Jun 2023", "Jan 2024"],
  datasets: [
    {
      label: "BMI",
      data: [16.5, 16.2, 15.9],
      borderColor: "#00C49F",
      backgroundColor: "rgba(0, 196, 159, 0.2)",
      tension: 0.3,
      pointRadius: 5,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
};

const ChildHealthBook = () => {
  const location = useLocation();
  const { child } = location.state || {};

  const defaultData = {
    name: "Văn Quyến",
    age: "3 years old",
    gender: "Female",
    dateOfBirth: "2021-06-18",
    bloodType: "A",
    allergies: "None",
    chronicCondition: "None",
    avatarUrl: boy, // Update with your image path
  };

  // Use provided data or defaults
  const data = defaultData;

  return (
    <div className={styles.bookContainer}>
      {[...Array(50)].map((_, i) => (
        <div key={i} className={styles.flower}></div>
      ))}
      <HTMLFlipBook
        width={500}
        height={650}
        showCover={true}
        flippingTime={1000}
        mobileScrollSupport={true}
        maxShadowOpacity={0.3}
      >
        {/* Cover Page */}
        <div className={`${styles.page} ${styles.cover}`} data-density="hard">
          <div className={`${styles.coverContent} text-center`}>
            {/* Header */}
            <div className="position-relative">
              <div
                className={`${styles.titleSection} d-flex align-items-center justify-content-center`}
              >
                <h2 className="ms-2 fw-bold">Child Health Book</h2>
              </div>
            </div>

            {/* Child Profile */}
            <div className={`${styles.childProfile} mt-3 p-3`}>
              <img
                src={data.avatarUrl}
                alt="Child Avatar"
                className="me-1"
                width={150}
              />
              <h3 className={`${styles.childName} mt-2`}>{data.name}</h3>
            </div>

            {/* Information Section */}
            <table className={styles.infoTable}>
              <tbody className="d-flex flex-column">
                <tr>
                  <td className="pe-4">🎂 Age:</td>
                  <td className=" mb-0">{data.age}</td>
                </tr>
                <tr>
                  <td className="pe-4">🩺 Gender:</td>
                  <td className=" mb-0">{data.gender}</td>
                </tr>
                <tr>
                  <td className="pe-4">📅 Date of Birth:</td>
                  <td className=" mb-0">{data.dateOfBirth}</td>
                </tr>
                <tr>
                  <td className="pe-4">🩸 Blood Type:</td>
                  <td className=" mb-0">{data.bloodType}</td>
                </tr>
                <tr>
                  <td className="pe-4">⚠️ Allergies:</td>
                  <td className=" mb-0">{data.allergies}</td>
                </tr>
                <tr>
                  <td className="pe-4">🏥 Chronic Condition:</td>
                  <td className=" mb-0">{data.chronicCondition}</td>
                </tr>
              </tbody>
            </table>

            {/* Decorative Elements */}
            <div className={`${styles.doodle} ${styles.star}`}>✶</div>
            <div className={`${styles.doodle} ${styles.heart}`}>♥</div>
            <div className={styles.handwrittenNote}>Keep me healthy!</div>
          </div>
        </div>

        {/* Overview Page with Charts */}
        <div className={styles.page}>
          <h2>📊 Overview</h2>
          <div className="card-header header-elements w-100">
            <div className="w-100 d-flex flex-column justify-between mb-2">
              <h5 className="card-title mb-0">Height Chart</h5>
              <small className="text-body-secondary">
                Present the height of the child over time
              </small>
            </div>
          </div>
          <HeightChart />
        </div>

        <div className={styles.page}>
          <div className="card-header header-elements w-100 mt-10">
            <div className="w-100 d-flex flex-column justify-between mb-2 mt-7">
              <h5 className="card-title mb-0">Height Chart</h5>
              <small className="text-body-secondary">
                Present the height of the child over time
              </small>
            </div>
          </div>
          <HeightChart />
        </div>

        <div className={styles.page}>
          <div className="card-header header-elements w-100 mt-10">
            <div className="w-100 d-flex flex-column justify-between mb-2 mt-7">
              <h5 className="card-title mb-0">Height Chart</h5>
              <small className="text-body-secondary">
                Present the height of the child over time
              </small>
            </div>
          </div>
          <HeightChart />
        </div>

        {/* Health Metrics Page */}
        <div className={styles.page}>
          <h2>📋 Health Metrics</h2>
          <table className={styles.infoTable_indicators}>
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Date</th>
                <th>Weight (kg)</th>
                <th>Height (cm)</th>
                <th>BMI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023-01</td>
                <td>12</td>
                <td>85</td>
                <td>16.5</td>
              </tr>
              <tr>
                <td>2023-06</td>
                <td>13</td>
                <td>90</td>
                <td>16.2</td>
              </tr>
              <tr>
                <td>2024-01</td>
                <td>14</td>
                <td>95</td>
                <td>15.9</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dental Chart Page */}
        <div className={styles.page}>
          <h2>🦷 Dental</h2>
          <p>Tracking baby teeth development...</p>
          <Teeth />
        </div>

        {/* Vaccination Schedule Page */}
        <div className={styles.page}>
          <table className={styles.infoTable_indicators}>
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "40%" }} />
              <col style={{ width: "35%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Tooth Number</th>
                <th>Eruption Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>8</td>
                <td>2024-01-05</td>
                <td>No reaction</td>
              </tr>
              <tr>
                <td>8</td>
                <td>2024-01-05</td>
                <td>No reaction</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Vaccination Schedule Page */}
        <div className={styles.page}>
          <h2>💉Vaccination History</h2>
          <table className={styles.infoTable_indicators}>
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Name</th>
                <th>Dose Number</th>
                <th>Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hepatitis B</td>
                <td>1/2</td>
                <td>2024-01-05</td>
                <td>No reaction</td>
              </tr>
              <tr>
                <td>Hepatitis B</td>
                <td>1/2</td>
                <td>2024-01-05</td>
                <td>No reaction</td>
              </tr>
              <tr>
                <td>Hepatitis B</td>
                <td>1/2</td>
                <td>2024-01-05</td>
                <td>No reaction</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Back Cover */}
        <div
          className={`${styles.page} ${styles.cover}`}
          data-density="hard"
        ></div>
      </HTMLFlipBook>
    </div>
  );
};

export default ChildHealthBook;
