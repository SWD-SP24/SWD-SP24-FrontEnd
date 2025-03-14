import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useEffect } from "react";
import { Animations } from "../../../assets/js/Animations";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";
export default function TopStatic() {
  const { response, callApi } = useApi({
    url: `${API_URLS.DASHBOARD.VACCINE_COMPLETE}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response) {
      console.log("Top Vaccines", response);
    }
  }, [response]);

  if (response === null) {
    return (
      <div className="col-4 order-5 mb-4">
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

  function getTopVaccines(data, count = 4) {
    return data
      .sort((a, b) => b.completionCount - a.completionCount)
      .slice(0, count);
  }

  console.log(getTopVaccines(response.data, 4));
  return (
    <div className="col-4 order-5 mb-4">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Top 4 Vaccines Given the Most</h5>
        </div>
        <div className="card-body px-0">
          <ul className="list-group list-group-flush">
            {getTopVaccines(response.data, 4).map((item) => (
              <li className="list-group-item d-flex align-items-center">
                <div>
                  <h6 className="mb-0">{item.vaccineName}</h6>
                  <small className="text-muted">
                    Administered {item.completionCount} times
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
