import React, { use, useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import API_URLS from "../../../config/apiUrls";

export default function OverviewChild() {
  const { response, callApi } = useApi({
    url: `${API_URLS.DASHBOARD.TOTAL_CHILDREN}`,
    method: "GET",
  });
  const { response: vaccineCompliantRate, callApi: callApiVSCR } = useApi({
    url: `${API_URLS.DASHBOARD.VACCINATIONS_SCHEDULE_COMPLIANT_RATE}`,
    method: "GET",
  });
  const { response: abnormalChildren, callApi: callApiAC } = useApi({
    url: `${API_URLS.DASHBOARD.ABNORMAL_CHILDREN}`,
    method: "GET",
  });
  const { response: avgGrowRate, callApi: callApiAGR } = useApi({
    url: `${API_URLS.DASHBOARD.AVERAGE_GROWTH_RATE}`,
    method: "GET",
  });
  useEffect(() => {
    callApi();
    callApiVSCR();
    callApiAC();
    callApiAGR();
  }, []);

  useEffect(() => {
    if (response && vaccineCompliantRate && abnormalChildren && avgGrowRate) {
      console.log("Total Children", response);
      console.log("VSCR", vaccineCompliantRate);
      console.log("Abnormal Children", abnormalChildren);
      console.log("Average Grow Rate", avgGrowRate);
    }
  }, [response, abnormalChildren, vaccineCompliantRate, avgGrowRate]);

  return (
    <div class="col-4 order-2 mb-4 h-100">
      <div class="card h-100">
        <div class="card-header d-flex align-items-center justify-content-between pb-0">
          <div class="card-title mb-0">
            <h5 class="m-0 me-2">Children Overview</h5>
          </div>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex flex-column align-items-center gap-1">
              <h2 class="mb-2">{response && response.data}</h2>
              <span>Total Children</span>
            </div>
            <div id="childrenOverviewChart"></div>
          </div>
          <ul class="p-0 m-0">
            <li class="d-flex mb-4 pb-1">
              <div class="avatar flex-shrink-0 me-3">
                <span class="avatar-initial rounded bg-label-primary">
                  <i class="bx bx-user-check"></i>
                </span>
              </div>
              <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                  <h6 class="mb-0">Vaccination Rate</h6>
                  <small class="text-muted">
                    Vaccination schedule compliant rate
                  </small>
                </div>
                <div class="user-progress">
                  <small class="fw-semibold">
                    {vaccineCompliantRate &&
                      Number(Number(vaccineCompliantRate.data).toFixed(2))}
                    %
                  </small>
                </div>
              </div>
            </li>
            <li class="d-flex mb-4 pb-1">
              <div class="avatar flex-shrink-0 me-3">
                <span class="avatar-initial rounded bg-label-success">
                  <i class="bx bx-child"></i>
                </span>
              </div>
              <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                  <h6 class="mb-0">Healthy Growth</h6>
                  <small class="text-muted">Children developing normally</small>
                </div>
                <div class="user-progress">
                  <small class="fw-semibold">85.2%</small>
                </div>
              </div>
            </li>
            <li class="d-flex mb-4 pb-1">
              <div class="avatar flex-shrink-0 me-3">
                <span class="avatar-initial rounded bg-label-info">
                  <i class="bx bx-trending-up"></i>
                </span>
              </div>
              <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                  <h6 class="mb-0">Height Growth Rate</h6>
                  <small class="text-muted">
                    Average monthly height increase
                  </small>
                </div>
                <div class="user-progress">
                  <small class="fw-semibold">
                    {avgGrowRate && avgGrowRate.data.averageHeightGrowRate}
                    cm/month
                  </small>
                </div>
              </div>
            </li>
            <li class="d-flex mb-4 pb-1">
              <div class="avatar flex-shrink-0 me-3">
                <span class="avatar-initial rounded bg-label-warning">
                  <i class="bx bx-bar-chart-alt"></i>
                </span>
              </div>
              <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                  <h6 class="mb-0">Weight Growth Rate</h6>
                  <small class="text-muted">Average monthly weight gain</small>
                </div>
                <div class="user-progress">
                  <small class="fw-semibold">
                    {avgGrowRate && avgGrowRate.data.averageWeightGrowRate}
                    kg/month
                  </small>
                </div>
              </div>
            </li>
            <li class="d-flex mb-4 pb-1">
              <div class="avatar flex-shrink-0 me-3">
                <span class="avatar-initial rounded bg-label-danger">
                  <i class="bx bx-error"></i>
                </span>
              </div>
              <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                  <h6 class="mb-0">Health Alerts</h6>
                  <small class="text-muted">Children needing attention</small>
                </div>
                <div class="user-progress">
                  <small class="fw-semibold">
                    {abnormalChildren &&
                      new Set(
                        abnormalChildren.data.map((entry) => entry.childId)
                      ).size}
                  </small>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
