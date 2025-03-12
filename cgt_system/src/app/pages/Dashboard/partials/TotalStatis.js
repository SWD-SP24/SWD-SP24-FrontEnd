import React from "react";
import Images from "../../../assets/img/images";
export default function TotalStatis() {
  return (
    <div class="col-12 col-md-8 col-lg-4 order-3 order-md-2">
      <div class="row">
        <div class="col-6 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="card-title d-flex align-items-start justify-content-between">
                <div class="avatar flex-shrink-0">
                  <img src={Images.paypal} alt="Credit Card" class="rounded" />
                </div>
              </div>
              <span class="d-block mb-1">Total Children</span>
              <h3 class="card-title text-nowrap mb-2">$2,456</h3>
            </div>
          </div>
        </div>
        <div class="col-6 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="card-title d-flex align-items-start justify-content-between">
                <div class="avatar flex-shrink-0">
                  <img
                    src={Images.ccPrimary}
                    alt="Credit Card"
                    class="rounded"
                  />
                </div>
              </div>
              <span class="fw-semibold d-block mb-1">Vaccine Completion</span>
              <h3 class="card-title mb-2">$14,857</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between flex-sm-row flex-column gap-3">
                <div class="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                  <div class="card-title">
                    <h5 class="text-nowrap mb-2">Profile Report</h5>
                    <span class="badge bg-label-warning rounded-pill">
                      Year 2021
                    </span>
                  </div>
                  <div class="mt-sm-auto">
                    <small class="text-success text-nowrap fw-semibold">
                      <i class="bx bx-chevron-up"></i> 68.2%
                    </small>
                    <h3 class="mb-0">$84,686k</h3>
                  </div>
                </div>
                <div id="profileReportChart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
