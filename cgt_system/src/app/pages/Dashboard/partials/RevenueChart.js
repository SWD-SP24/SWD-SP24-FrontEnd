import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Animations } from "../../../assets/js/Animations";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";
import { getShortMonthName } from "../../../util/dateFormat";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
};

export default function RevenueChart() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { response, callApi, isLoading } = useApi({
    url: `${API_URLS.DASHBOARD.MONTHLY_REVENUE}?startTime=01/01/${selectedYear}&endTime=31/12/${selectedYear}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, [selectedYear]);

  const handleChangeYear = (year) => {
    setSelectedYear(year);
  };

  let lineLabel = [];
  let monthData = [];

  if (!isLoading && response) {
    lineLabel = response.data.map((item) => getShortMonthName(item.month));
    monthData = response.data.map((item) => item.totalRevenue);
  }

  const lineData = {
    labels: lineLabel,
    datasets: [
      {
        label: "Revenue",
        data: monthData,
        borderColor: "#696cff",
        backgroundColor: "rgba(105, 108, 255, 0.5)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: lineLabel,
    datasets: [
      {
        label: "Monthly Revenue",
        data: monthData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FFCD56",
          "#4BC0C0",
          "#C9CBCF",
          "#5A5CF0",
          "#E63946",
          "#34A853",
        ],
        borderWidth: 1,
      },
    ],
  };
  if (response === null) {
    return (
      <div className="col-8 order-1 order-md-3 order-lg-2 mb-4">
        <div className="card h-100">
          <DotLottieReact
            src={Animations.dashboardLoading}
            autoplay
            loop
            speed={2}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="col-8 order-1 order-md-3 order-lg-2 mb-4">
      <div className="card h-100">
        <div className="row row-bordered g-0 h-100">
          {/* Left Section: Line Chart */}
          <div className="col-md-8 p-4 d-flex flex-column h-100">
            <h5 className="card-header m-0 me-2 pb-3">Total Revenue</h5>
            <div
              className="flex-grow-1 d-flex align-items-center justify-content-center"
              style={{ minHeight: "250px" }}
            >
              {isLoading ? (
                <Skeleton height={200} />
              ) : (
                <Line data={lineData} options={lineOptions} />
              )}
            </div>
          </div>

          {/* Right Section: Pie Chart */}
          <div className="col-lg-4 d-flex flex-column align-items-center py-4 h-100">
            {/* Year Selector */}
            <div className="text-center mb-3">
              <div className="btn-group">
                <button type="button" className="btn btn-label-primary">
                  {selectedYear}
                </button>
                <button
                  type="button"
                  className="btn btn-label-primary dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => handleChangeYear(new Date().getFullYear())}
                    >
                      {new Date().getFullYear()}
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() =>
                        handleChangeYear(new Date().getFullYear() - 1)
                      }
                    >
                      {new Date().getFullYear() - 1}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
              <div style={{ width: 200, height: 200 }}>
                {isLoading ? (
                  <Skeleton circle height={200} width={200} />
                ) : (
                  <Pie data={pieData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
