import React from "react";
import styles from "./childHealthBook.module.scss";

const HealthMetricsPage = () => (
  <>
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
  </>
);

export default HealthMetricsPage;
