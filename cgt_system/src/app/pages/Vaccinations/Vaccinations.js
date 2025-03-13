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
  const permissions = useOutletContext();
  const url = `${API_URLS.VACCINATIONS.VACCINATIONS_SCHEDULE}?pageNumber=1&pageSize=7&sortByAge=true`;
  const [vaccinations, setVaccinations] = useState([]);

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
        />
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
