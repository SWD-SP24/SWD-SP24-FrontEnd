import React from "react";
import Images from "../../../assets/img/images";
export default function Profit() {
  return (
    <div class="col-lg-4 col-md-4 order-1">
      <div class="row">
        <div class="col-lg-6 col-md-12 col-6 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="card-title d-flex align-items-start justify-content-between">
                <div class="avatar flex-shrink-0">
                  <img
                    src={Images.chartSuccess}
                    alt="chart success"
                    class="rounded"
                  />
                </div>
              </div>
              <span class="fw-semibold d-block mb-1">Profit</span>
              <h3 class="card-title mb-2">$12,628</h3>
              <small class="text-success fw-semibold">
                <i class="bx bx-up-arrow-alt"></i> +72.80%
              </small>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-12 col-6 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="card-title d-flex align-items-start justify-content-between">
                <div class="avatar flex-shrink-0">
                  <img
                    src={Images.walletInfo}
                    alt="Credit Card"
                    class="rounded"
                  />
                </div>
              </div>
              <span>Revenue</span>
              <h3 class="card-title text-nowrap mb-1">$4,679</h3>
              <small class="text-success fw-semibold">
                <i class="bx bx-up-arrow-alt"></i> +28.42%
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
