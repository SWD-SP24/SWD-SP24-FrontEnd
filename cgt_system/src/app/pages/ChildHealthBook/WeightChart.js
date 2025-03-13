import React, { useEffect, useState } from "react";
import { getDate, getMonth, getYear } from "../../util/dateFormat";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import { LineChart } from "../Overview/partials/myChart";
export default function WeightChart({ childId }) {
  const [labels, setLabels] = useState([]);
  const [weightDatasets, setWeightDatasets] = useState([]);
  const [yearList, setYearList] = useState([]);
  let url = `${API_URLS.INDICATORS.INDICATORS}?childrenId=${childId}`;

  const { response, callApi } = useApi({
    url: url,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response != null) {
      const reversedData = [...response.data].reverse();

      // Extract data
      if (yearList.length === 0) {
        const yearData = reversedData.map((record) =>
          getYear(record.recordTime)
        );
        const uniqueYears = Array.from(new Set(yearData));
        setYearList(uniqueYears);
      }

      // Extract data
      const newLabels = reversedData.map(
        (record) =>
          getDate(record.recordTime) +
          "/" +
          getMonth(record.recordTime) +
          "/" +
          getYear(record.recordTime)
      );
      const newWeightDatasets = reversedData.map((record) => record.weight);

      // Update state
      setLabels(newLabels);
      setWeightDatasets(newWeightDatasets);
    }
  }, [response]);

  return (
    <div style={{ width: "100%", minHeight: "100vh", height: "auto" }}>
      <div
        className="card p-0 d-flex flex-column"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <div
          className="card-body p-0"
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <LineChart
            labels={labels}
            datasets={[
              {
                label: "Weight",
                data: weightDatasets,
                borderColor: "#696cff",
                backgroundColor: "rgba(105, 108, 255, 0.5)",
                tension: 0.4, // Smooth line
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
