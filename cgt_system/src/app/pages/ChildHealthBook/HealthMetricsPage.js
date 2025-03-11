import React, { useEffect, useState } from "react";
import styles from "./childHealthBook.module.scss";
import API_URLS from "../../config/apiUrls";
import useApi from "../../hooks/useApi";

export default function HealthMetricsPage({ childId }) {
  const [indicators, setIndicators] = useState([]);
  const url = `${API_URLS.INDICATORS.INDICATORS}?childrenId=${childId}&pageNumber=1&pageSize=999`;

  const { response, callApi } = useApi({
    url: url,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response?.status === "successful") {
      const allIndicators = response.data;

      const first16Indicators = allIndicators.slice(0, 16);
      setIndicators(first16Indicators);
    }
  }, [response]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return dateString.replace(/\//g, "-");
  };

  return (
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
          {indicators.map((indicator) => (
            <tr key={indicator.growthIndicatorsId}>
              <td>{formatDate(indicator.recordTime)}</td>
              <td>{indicator.weight}</td>
              <td>{indicator.height}</td>
              <td>{indicator.bmi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
