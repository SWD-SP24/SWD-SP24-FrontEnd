import React, { useEffect, useRef, useState } from "react";
import { toDMY, getYear, getShortMonthName } from "../../../util/dateFormat";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import useApi from "../../../hooks/useApi";
import API_URLS from "../../../config/apiUrls";

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

const growthPercentage = -12; // Example negative growth
const isNegativeGrowth = growthPercentage < 0;

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
};

const generateFullYearData = (data) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Create an object with all months initialized to 0 revenue
  const fullYearData = monthNames.map((month) => ({
    month,
    totalRevenue: 0,
  }));

  // Merge actual data into the fullYearData
  data.forEach((item) => {
    const index = item.month - 1; // Convert 1-based month to 0-based index
    fullYearData[index].totalRevenue = item.totalRevenue;
  });

  return fullYearData;
};
export default function RevenueChart() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { response, callApi } = useApi({
    url: `${API_URLS.DASHBOARD.MONTHLY_REVENUE}?startTime=01/01/${selectedYear}&endTime=31/12/${selectedYear}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, [selectedYear]);

  useEffect(() => {
    console.log(response);
  }, [response]);

  if (response === null) {
    return <div>loading</div>;
  }
  const lineLabel = response.data.map((item) => getShortMonthName(item.month));
  const monthData = response.data.map((item) => item.totalRevenue);

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

  const processedData = generateFullYearData(response.data);

  const doughnutData = {
    labels: processedData.map((item) => item.month),
    datasets: [
      {
        data: processedData.map((item) => item.totalRevenue),
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
        hoverBackgroundColor: [
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
        borderWidth: 0,
      },
    ],
  };
  const doughnutOptions = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            let month = doughnutData.labels[tooltipItem.dataIndex];
            let value = doughnutData.datasets[0].data[tooltipItem.dataIndex];
            return `${month}: $${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  const totalRevenue = response.data.reduce(
    (sum, item) => sum + item.totalRevenue,
    0
  );

  const handleChangeYear = (year) => {
    setSelectedYear(year);
  };
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
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>

          {/* Right Section: Doughnut Chart + Growth Info */}
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

            {/* Doughnut Chart (Auto-adjusted size) */}
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
              <div style={{ width: 180, height: 180, position: "relative" }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  <div style={{ fontSize: "22px" }}>{totalRevenue}$</div>
                  <div style={{ fontSize: "14px", color: "#555" }}>Revenue</div>
                </div>
              </div>
            </div>

            {/* Growth Status Text */}
            <div className="text-center fw-medium mt-3 mb-2">
              {/* {isNegativeGrowth
                ? `Company Decline: ${growthPercentage}%`
                : `${growthPercentage}% Company Growth`} */}
              No data
            </div>

            {/* Revenue Comparison */}
            <div className="d-flex gap-3 justify-content-between">
              <div className="d-flex">
                <div className="avatar me-2">
                  <span className="avatar-initial rounded-2 bg-label-primary">
                    <i className="icon-base bx bx-dollar icon-lg text-primary"></i>
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <small>{new Date().getFullYear() - 1}</small>
                  <h6 className="mb-0">$32.5k</h6>
                </div>
              </div>
              <div className="d-flex">
                <div className="avatar me-2">
                  <span className="avatar-initial rounded-2 bg-label-info">
                    <i className="icon-base bx bx-wallet icon-lg text-info"></i>
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <small>{new Date().getFullYear() - 2}</small>
                  <h6 className="mb-0">$41.2k</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
