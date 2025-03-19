import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import API_URLS from "../../config/apiUrls";
import useApi from "../../hooks/useApi";
import VaccineTable from "./partials/VaccineTable";
import AIAnalysis from "./partials/AIAnalysis";
import "./vaccine.scss";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Animations } from "../../assets/js/Animations";
export default function Vaccinations() {
  const { permissions, childrenData } = useOutletContext();
  const url = `${API_URLS.VACCINATIONS.VACCINATIONS_SCHEDULE}?pageNumber=1&pageSize=7&sortByAge=true`;
  const [vaccinations, setVaccinations] = useState([]);
  const [page, setPage] = useState(1);

  const { response, callApi } = useApi({
    url: url,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    console.log("Vaccine Schedule ne", response);
  }, [response]);
  const handlePage = (index) => {
    setPage(index);
    const customUrl = `${API_URLS.VACCINATIONS.VACCINATIONS_SCHEDULE}?pageNumber=${index}&pageSize=7&sortByAge=true`;
    callApi(null, customUrl);
  };

  const permissionsJson = JSON.parse(permissions);
  const isHasPermission = (permission) => {
    return permissionsJson.map((p) => p.permissionName).includes(permission);
  };
  if (response === null) {
    return (
      <div className="card" style={{ height: "300px" }}>
        <DotLottieReact src={Animations.AmongUs} loop autoplay />
      </div>
    );
  }
  return (
    <>
      <div class="card mb-6">
        <h5
          class="card-header pb-0 text-md-start text-center"
          style={{ marginBottom: "20px" }}
        >
          Vaccine List
        </h5>
        <VaccineTable
          vaccineList={response}
          refetch={callApi}
          onSetVaccinations={setVaccinations}
          dob={childrenData.dob}
        />
        <div class="row mx-2 justify-content-between">
          <div class="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto px-4 mt-0">
            <div
              class="dt-info"
              aria-live="polite"
              id="DataTables_Table_0_info"
              role="status"
            >
              {response &&
                `Showing ${1 + 6 * (page - 1)} to ${Math.min(
                  1 + 6 * page,
                  Math.ceil(response.pagination.total)
                )} of ${response.pagination.total} entries`}
            </div>
          </div>
          <div class="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto px-4 mt-0 gap-2">
            <div class="dt-paging">
              <nav aria-label="pagination">
                <ul class="pagination">
                  <li class="page-item next">
                    <a class="page-link" onClick={() => handlePage(1)}>
                      <i class="icon-base bx bx-chevron-left scaleX-n1-rtl icon-18px"></i>
                    </a>
                  </li>

                  {response &&
                    [...Array(response.pagination.lastVisiblePage)].map(
                      (_, index) => {
                        return (
                          <li class="page-item">
                            <a
                              className={
                                "page-link " +
                                (index + 1 === page ? "active" : "")
                              }
                              key={index}
                              onClick={() => handlePage(index + 1)}
                            >
                              {index + 1}
                            </a>
                          </li>
                        );
                      }
                    )}
                  <li class="page-item next">
                    <a
                      class="page-link"
                      onClick={() =>
                        handlePage(response.pagination.lastVisiblePage)
                      }
                    >
                      <i class="icon-base bx bx-chevron-right scaleX-n1-rtl icon-18px"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-6 mt-6">
        {isHasPermission("AI_HEALTH_DATA_ANALYSIS") ? (
          <AIAnalysis vaccinations={vaccinations} />
        ) : (
          <div className="card p-4 bg-gray-100 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              🔒 Advance Feature Locked
            </h3>
            <p className="text-gray-500 mt-1">
              Upgrade now to access AI health analysis!
            </p>
            <button
              className="col-12 btn btn-primary me-2"
              data-bs-toggle="modal"
              data-bs-target="#upgradePlanModal"
            >
              Upgrade Now 🚀
            </button>
          </div>
        )}
      </div>
    </>
  );
}
