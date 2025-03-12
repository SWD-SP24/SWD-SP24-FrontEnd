import React from "react";

export default function OverviewVaccine() {
  return (
    <div className="col-4 order-2 mb-4 h-100">
      <div className="card h-100">
        <div className="card-header d-flex align-items-center justify-content-between pb-0">
          <div className="card-title mb-0">
            <h5 className="m-0 me-2">Vaccine Overview</h5>
          </div>
        </div>
        <div className="card-body">
          {/* Total Administered Doses */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex flex-column align-items-center gap-1">
              <h2 className="mb-2">12,350</h2>
              <span>Total Administered Doses</span>
            </div>
            <div id="vaccineOverviewChart"></div>
          </div>

          {/* Vaccine Statistics List */}
          <ul className="p-0 m-0">
            {/* Vaccination Coverage */}
            <li className="d-flex mb-4 pb-1">
              <div className="avatar flex-shrink-0 me-3">
                <span className="avatar-initial rounded bg-label-primary">
                  <i className="bx bx-shield-quarter"></i>
                </span>
              </div>
              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div className="me-2">
                  <h6 className="mb-0">Vaccination Coverage</h6>
                  <small className="text-muted">
                    Children fully vaccinated
                  </small>
                </div>
                <div className="user-progress">
                  <small className="fw-semibold">87.5%</small>
                </div>
              </div>
            </li>

            {/* Doses on Schedule */}
            <li className="d-flex mb-4 pb-1">
              <div className="avatar flex-shrink-0 me-3">
                <span className="avatar-initial rounded bg-label-success">
                  <i className="bx bx-calendar-check"></i>
                </span>
              </div>
              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div className="me-2">
                  <h6 className="mb-0">Doses on Schedule</h6>
                  <small className="text-muted">Vaccines given on time</small>
                </div>
                <div className="user-progress">
                  <small className="fw-semibold">92.3%</small>
                </div>
              </div>
            </li>

            {/* Pending Doses */}
            <li className="d-flex mb-4 pb-1">
              <div className="avatar flex-shrink-0 me-3">
                <span className="avatar-initial rounded bg-label-warning">
                  <i className="bx bx-time-five"></i>
                </span>
              </div>
              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div className="me-2">
                  <h6 className="mb-0">Pending Doses</h6>
                  <small className="text-muted">
                    Upcoming scheduled vaccines
                  </small>
                </div>
                <div className="user-progress">
                  <small className="fw-semibold">1,245</small>
                </div>
              </div>
            </li>

            {/* Missed Doses */}
            <li className="d-flex mb-4 pb-1">
              <div className="avatar flex-shrink-0 me-3">
                <span className="avatar-initial rounded bg-label-danger">
                  <i className="bx bx-x-circle"></i>
                </span>
              </div>
              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div className="me-2">
                  <h6 className="mb-0">Missed Doses</h6>
                  <small className="text-muted">Children behind schedule</small>
                </div>
                <div className="user-progress">
                  <small className="fw-semibold">430</small>
                </div>
              </div>
            </li>

            {/* Adverse Reactions */}
            <li className="d-flex mb-4 pb-1">
              <div className="avatar flex-shrink-0 me-3">
                <span className="avatar-initial rounded bg-label-info">
                  <i className="bx bx-band-aid"></i>
                </span>
              </div>
              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div className="me-2">
                  <h6 className="mb-0">Adverse Reactions</h6>
                  <small className="text-muted">Reported side effects</small>
                </div>
                <div className="user-progress">
                  <small className="fw-semibold">27 cases</small>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
