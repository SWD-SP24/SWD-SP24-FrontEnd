import React, { useEffect } from "react";
import { useParams } from "react-router";
import API_URLS from "../../config/apiUrls.js";
import useApi from "../../hooks/useApi.js";
import "./overview.scss";
import BMIChart from "./partials/BMIChart.js";
import HeightChart from "./partials/HeightChart.js";
import WeightChart from "./partials/WeightChart.js";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

export default function Overview() {
  const { id } = useParams();
  const url = `${API_URLS.INDICATORS.INDICATORS}?childrenId=${id}`;
  const { response, callApi } = useApi({
    url: url,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response && response.data) {
      console.log(response);
    }
  }, [response]);

  if (!response) {
    return <div>Loading...</div>;
  }

  return (
    <div className="scrollable-container">
      <PerfectScrollbar
        options={{
          wheelSpeed: 0.5, // Smooth scrolling
          swipeEasing: true,
          minScrollbarLength: 30, // Prevent tiny scrollbars
          suppressScrollX: true, // Hide vertical scroll
        }}
      >
        <div className="scroll-content">
          <HeightChart />
          <WeightChart />
          <BMIChart />
        </div>
      </PerfectScrollbar>
    </div>
  );
}
