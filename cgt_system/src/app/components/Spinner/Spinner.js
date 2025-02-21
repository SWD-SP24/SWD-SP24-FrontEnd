import React from "react";

export default function Spinner() {
  return (
    <div
      className="container-xxl flex-grow-1 container-p-y d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <span
        className="spinner-border spinner-border-lg text-primary"
        role="status"
        style={{
          width: "3rem",
          height: "3rem",
          borderWidth: "0.5rem",
        }}
      ></span>
    </div>
  );
}
