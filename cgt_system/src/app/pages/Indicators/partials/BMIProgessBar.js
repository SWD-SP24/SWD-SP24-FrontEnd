import React from "react";

export default function BMIProgessBar({ bmi }) {
  if (!bmi || isNaN(bmi)) return null; // Don't render if bmi is invalid

  let progress = (bmi / 40) * 100; // Normalize to a max BMI of 40
  let variant = "success"; // Default color for normal BMI

  if (bmi < 10) variant = "danger";
  else if (bmi < 18.5) variant = "warning"; // Underweight (Blue)
  else if (bmi < 25) variant = "success"; // Normal weight (Green)
  else if (bmi < 30) variant = "warning"; // Overweight (Yellow)
  else variant = "danger"; // Obese (Red)

  return (
    <div className="progress me-3" style={{ height: "6px", width: "70px" }}>
      <div
        className={`progress-bar bg-${variant}`}
        style={{ width: `${progress}%` }}
        aria-valuenow={bmi}
        aria-valuemin="0"
        aria-valuemax="40"
      ></div>
    </div>
  );
}
