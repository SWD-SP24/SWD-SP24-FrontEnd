import React, { useEffect, useState } from "react";
import { LineChart } from "../../pages/Overview/partials/myChart";
import { getDate, getMonth, getYear } from "../../util/dateFormat";
import API_URLS from "../../config/apiUrls";
import useApi from "../../hooks/useApi";
export default function HeightChart({ childId }) {
  const [labels, setLabels] = useState([]);
  const [heightDatasets, setHeightDatasets] = useState([]);
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
      const newHeightDatasets = reversedData.map((record) => record.height);

      // Update state
      setLabels(newLabels);
      setHeightDatasets(newHeightDatasets);
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
                label: "Height",
                data: heightDatasets,
                borderColor: "#696cff",
                backgroundColor: "rgba(105, 108, 255, 0.5)",
                tension: 0.4,
              },
            ]}
            xLabel={"Date"}
          />
        </div>
      </div>
    </div>
  );
}
