import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useEffect } from "react";
import { Animations } from "../../../assets/js/Animations";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";

export default function OverviewVaccine() {
  const { response, callApi } = useApi({
    url: `${API_URLS.DASHBOARD.VACCINATIONS_SCHEDULE_COMPLIANT_RATE}`,
    method: "GET",
  });
  const { response: missDoses, callApi: callApiMD } = useApi({
    url: `${API_URLS.DASHBOARD.MISSED_DOSES}`,
    method: "GET",
  });
  const { response: totalVaccine, callApi: callApiTV } = useApi({
    url: `${API_URLS.VACCINATIONS.VACCINATIONS_SCHEDULE}`,
    method: "GET",
  });
  const { response: administeredDoses, callApi: callApiAD } = useApi({
    url: `${API_URLS.DASHBOARD.ADMINISTERED_DOSES}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
    callApiMD();
    callApiTV();
    callApiAD();
  }, []);

  useEffect(() => {
    if (response && missDoses && totalVaccine && administeredDoses) {
      console.log("Compliant Rate", response);
      console.log("Missed Doses", missDoses);
      console.log("Total Vaccines", totalVaccine);
      console.log("Administered Doses", administeredDoses);
    }
  }, [response, missDoses, totalVaccine, administeredDoses]);

  if (
    response === null ||
    missDoses === null ||
    totalVaccine === null ||
    administeredDoses === null
  ) {
    return (
      <div className="col-4 order-2 mb-4 h-100">
        <div className="card h-100">
          <DotLottieReact
            src={Animations.dashboardLoading}
            autoplay
            loop
            speed={2}
          />
        </div>
      </div>
    );
  }
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
            <div class="d-flex flex-column align-items-center gap-1">
              <h2 class="mb-2">{totalVaccine.data.length}</h2>
              <span>Total Vaccines</span>
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
                  <small className="fw-semibold">
                    {Number(
                      (administeredDoses.data * 100) /
                        (administeredDoses.data + missDoses.data.length)
                    ).toFixed(2)}
                    %
                  </small>
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
                  <h6 className="mb-0">Administered Doses</h6>
                  <small className="text-muted">Total administered doses</small>
                </div>
                <div className="user-progress">
                  <small className="fw-semibold">
                    {administeredDoses.data}
                  </small>
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
                  <h6 className="mb-0"> Doses on Schedule </h6>
                  <small className="text-muted">Vaccines given on time</small>
                </div>
                <div className="user-progress">
                  <small className="fw-semibold">
                    {Number(response.data).toFixed(2)}%
                  </small>
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
                  <small className="fw-semibold">{missDoses.data.length}</small>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
