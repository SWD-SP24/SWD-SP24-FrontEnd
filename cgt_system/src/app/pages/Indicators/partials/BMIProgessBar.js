import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Import tooltip styles

export default function BMIProgressBar({ bmi }) {
  if (!bmi || isNaN(bmi)) return null;

  let progress = (bmi / 40) * 100; // Normalize BMI to a scale of 0-100
  let variant = "success"; // Default color for normal BMI
  let tooltipText = `BMI: ${bmi} - Normal Weight`;

  if (bmi < 10) {
    variant = "danger";
    tooltipText = `BMI: ${bmi} - Extremely Low`;
  } else if (bmi < 18.5) {
    variant = "warning";
    tooltipText = `BMI: ${bmi} - Underweight`;
  } else if (bmi < 25) {
    variant = "success";
    tooltipText = `BMI: ${bmi} - Normal Weight`;
  } else if (bmi < 30) {
    variant = "warning";
    tooltipText = `BMI: ${bmi} - Overweight`;
  } else {
    variant = "danger";
    tooltipText = `BMI: ${bmi} - Obese`;
  }

  return (
    <Tippy content={tooltipText} delay={[0, 100]} placement="top">
      <div
        className="progress me-3"
        style={{ height: "6px", width: "70px", cursor: "pointer" }}
      >
        <div
          className={`progress-bar bg-${variant}`}
          style={{ width: `${progress}%` }}
          aria-valuenow={bmi}
          aria-valuemin="0"
          aria-valuemax="40"
        ></div>
      </div>
    </Tippy>
  );
}
