import React from "react";
import { signify } from "react-signify";
export const sLatestHeight = signify("");
export default function BthAddIndicators() {
  return (
    <button
      className="btn add-new btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#modalBluetoothAdd"
    >
      <span>
        <i className="icon-base bx bx-plus icon-sm me-0 me-sm-2"></i>
        <span className="d-none d-sm-inline-block">Add Indicator</span>
      </span>
    </button>
  );
}
