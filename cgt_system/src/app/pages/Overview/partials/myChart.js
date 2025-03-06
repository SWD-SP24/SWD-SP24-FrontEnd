import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  Title,
  LineElement
);
export const LineChart = ({
  labels = [],
  datasets = [],
  xLabel,
  yLabel,
  ticks = 2,
}) => {
  const formattedDatasets = datasets.map((dataset, index) => ({
    label: dataset.label || `Dataset ${index + 1}`,
    data: dataset.data || [],
    borderColor:
      dataset.borderColor || ["#FF4500", "#4169E1", "#FFD700"][index], // Red, Blue, Yellow
    backgroundColor: "transparent", // No fill
    borderWidth: 3,
    pointRadius: 0, // Hide points for smooth curves
    tension: 0.4, // Smooth curves
  }));

  const data = { labels, datasets: formattedDatasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center", // Aligns legend to the left

        labels: {
          usePointStyle: true, // Changes the legend to a dot
          pointStyle: "circle", // Ensures it's a circular dot
          boxWidth: 5,
          boxHeight: 5,
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        grid: { display: true }, // Hide x-axis grid
        ticks: {
          font: { size: 13 },
          callback: function (value, index) {
            return index % ticks === 0 ? labels[index] : "";
          },
        },
        title: {
          display: true,
          text: xLabel, // X-axis Label
          font: { size: 12, weight: "bold" },
          padding: 10,
        },
      },
      y: {
        grid: { color: "rgba(0, 0, 0, 0.1)", borderDash: [5, 5] }, // Light dashed lines
        ticks: { font: { size: 13 } },
        suggestedMin: Math.min(...datasets.flatMap((d) => d.data)) * 0.95, // 5% padding
        suggestedMax: Math.max(...datasets.flatMap((d) => d.data)) * 1.05, // 5% padding
        title: {
          display: true,
          text: yLabel, // Y-axis Label
          font: { size: 12, weight: "bold" },
          padding: 10,
        },
      },
    },
  };

  return (
    <Line
      data={data}
      options={options}
      style={{ width: "800px", height: "400px" }}
    />
  );
};
