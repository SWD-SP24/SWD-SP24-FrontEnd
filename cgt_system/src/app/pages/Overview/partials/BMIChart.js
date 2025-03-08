import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";
import { getDate, getYear } from "../../../util/dateFormat";
import DateRangePicker from "../../Indicators/partials/DateRangePicker";
import { LineChart } from "./myChart";
export default function BMIChart() {
  const [labels, setLabels] = useState([]);
  const [BMI, setBMI] = useState([]);
  const [yearList, setYearList] = useState([]);
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const { id } = useParams();
  const [ticks, setTicks] = useState([2]);
  let url = `${API_URLS.INDICATORS.INDICATORS}?childrenId=${id}`;

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
      const newLabels = reversedData.map((record) =>
        getDate(record.recordTime)
      );
      const newBMIList = reversedData.map((record) => record.weight);

      // Update state
      setLabels(newLabels);
      setBMI(newBMIList);
      setTicks(Math.max(2, Math.ceil(BMI.length / 25)));
    }
  }, [response]);
  return (
    <div className="col-12 mb-6">
      <div className="card h-100">
        <div className="card-header header-elements">
          <div>
            <h5 className="card-title mb-0">BMI Chart</h5>
            <small className="text-body-secondary">
              Present the BMI of the child overtime
            </small>
          </div>
          <div className="card-header-elements ms-auto py-0">
            <DateRangePicker
              refetch={callApi}
              childId={id}
              fromDateRef={fromDateRef}
              toDateRef={toDateRef}
            />
          </div>
        </div>
        <div className="card-body pt-2">
          <LineChart
            labels={labels}
            datasets={[
              {
                label: "BMI",
                data: BMI,
                borderColor: "#696cff",
                backgroundColor: "rgba(105, 108, 255, 0.5)",
                tension: 0.4, // Smooth line
              },
            ]}
            ticks={ticks}
          />
        </div>
      </div>
    </div>
  );
}
