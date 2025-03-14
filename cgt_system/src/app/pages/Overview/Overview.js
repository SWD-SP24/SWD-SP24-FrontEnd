import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useEffect } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useParams } from "react-router";
import API_URLS from "../../config/apiUrls.js";
import useApi from "../../hooks/useApi.js";
import "./overview.scss";
import BMIChart from "./partials/BMIChart.js";
import HeightChart from "./partials/HeightChart.js";
import WeightChart from "./partials/WeightChart.js";
import { Animations } from "../../assets/js/Animations.js";
export default function Overview() {
  const id = useParams().childId;
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
    return (
      <div className="card" style={{ height: "300px" }}>
        <DotLottieReact src={Animations.AmongUs} loop autoplay />
      </div>
    );
  }

  return (
    <div>
      {/* <PerfectScrollbar
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
      </PerfectScrollbar> */}
      <HeightChart />
      <WeightChart />
      <BMIChart />
    </div>
  );
}
