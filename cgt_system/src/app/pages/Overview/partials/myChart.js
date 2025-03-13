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
import zoomPlugin from "chartjs-plugin-zoom";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  Title,
  LineElement,
  zoomPlugin // Register the zoom plugin
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
    backgroundColor: "transparent",
    borderWidth: 3,
    pointRadius: 0,
    tension: 0.4,
  }));

  const data = { labels, datasets: formattedDatasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 5,
          boxHeight: 5,
          font: { size: 14 },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy", // Allow panning in both directions
        },
        zoom: {
          wheel: {
            enabled: true, // Enable zooming with mouse wheel
          },
          pinch: {
            enabled: true, // Enable zooming on touch devices
          },
          mode: "xy", // Zoom both X and Y axis
        },
      },
    },
    scales: {
      x: {
        grid: { display: true },
        ticks: {
          font: { size: 13 },
          callback: function (value, index) {
            return index % ticks === 0 ? labels[index] : "";
          },
          autoSkip: false,
        },
        title: {
          display: true,
          text: xLabel,
          font: { size: 12, weight: "bold" },
          padding: 10,
        },
      },
      y: {
        grid: { color: "rgba(0, 0, 0, 0.1)", borderDash: [5, 5] },
        ticks: { font: { size: 13 } },
        suggestedMin: Math.min(...datasets.flatMap((d) => d.data)) * 0.95,
        suggestedMax: Math.max(...datasets.flatMap((d) => d.data)) * 1.05,
        title: {
          display: true,
          text: yLabel,
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
