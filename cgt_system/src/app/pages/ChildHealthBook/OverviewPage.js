import React from "react";
import HeightChart from "./HeightChart,.js";

const OverviewPage = ({ childId }) => (
  <>
    <h2>📊 Overview</h2>
    <div className="card-header header-elements w-100">
      <div className="w-100 d-flex flex-column justify-between mb-2">
        <h5 className="card-title mb-0">Height Chart</h5>
        <small className="text-body-secondary">
          Present the height of the child over time
        </small>
      </div>
    </div>
    <HeightChart childId={childId} />
  </>
);

export default OverviewPage;
