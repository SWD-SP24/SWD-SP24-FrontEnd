import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { vaccineDetail } from "../../constants/VaccineDetail";

import {
  sVaccineId,
  sVaccineName,
  sDose,
} from "../Vaccinations/partials/VaccineTable";
import AddVaccineModal from "../Vaccinations/partials/AddVaccineModal";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
export default function VaccineInfo() {
  const { childId, vaccineId } = useParams();
  const navigate = useNavigate();
  const [vaccine, setVaccine] = useState(null);
  const location = useLocation();
  const { doseNumber } = location.state || {};
  console.log("doseNumber", doseNumber);
  const { response, callApi } = useApi({
    url: `${API_URLS.VACCINE_RECORD.VACCINE_RECORD}?childId=${childId}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (vaccineDetail) {
      const selectedVaccine = vaccineDetail.find(
        (v) => v.id === parseInt(vaccineId)
      );
      setVaccine(selectedVaccine || null);
    }
  }, [vaccineId]);

  if (!vaccine) return <div>Loading...</div>;

  const handleStatus = (recordList) => {
    if (!vaccineId || !recordList)
      return <span className="badge bg-label-warning">No data</span>; // Handle undefined values
    const haveRecord = recordList.some(
      (record) =>
        record.vaccineId === Number(vaccineId) && record.dose === doseNumber
    );

    return haveRecord ? (
      <span className="badge bg-label-info">Given</span>
    ) : (
      <div>
        <span className="badge bg-label-warning">Pending</span>
        <span className="mx-4">-</span>
        <button
          className="btn btn-sm btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalAddRecord"
          onClick={() => {
            sVaccineId.set(vaccine.id);
            sVaccineName.set(vaccine.name);
            sDose.set(doseNumber);
          }}
        >
          Update
        </button>
      </div>
    );
  };

  return (
    <div className="card">
      <h5 className="card-header pb-0 text-md-start text-center mb-3">
        Vaccine Details
      </h5>
      <table className="table">
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "70%" }} />
        </colgroup>
        <tbody>
          <tr>
            <td>
              <strong>Name</strong>
            </td>
            <td>
              <span className="d-block">
                {vaccine.name} - Dose number {doseNumber}
              </span>
              {vaccine.otherNames && (
                <span className="d-block">
                  ({vaccine.otherNames.join(", ")})
                </span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Status</strong>
            </td>
            <td>{response && handleStatus(response.data)}</td>
          </tr>
          <tr>
            <td>
              <strong>Dose Required</strong>
            </td>
            <td>{vaccine.dosesRequired}</td>
          </tr>
          <tr>
            <td>
              <strong>Schedule</strong>
            </td>
            <td>
              {vaccine.schedule && vaccine.schedule.length > 0 ? (
                vaccine.schedule.map((schedule, index) => (
                  <div key={index}>
                    <span className="d-block">
                      <strong>Shot {schedule.doseNumber}:</strong>
                      {schedule.age}
                    </span>
                  </div>
                ))
              ) : (
                <span>No schedule available</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Dosage</strong>
            </td>
            <td>{vaccine.dosage}</td>
          </tr>
          <tr>
            <td>
              <strong>Injection Site</strong>
            </td>
            <td>{vaccine.injectionSite}</td>
          </tr>
          <tr>
            <td>
              <strong>Not Recommended For</strong>
            </td>
            <td>{vaccine.ageNotRecommended || "N/A"}</td>
          </tr>
          <tr>
            <td>
              <strong>Side Effects</strong>
            </td>
            <td>
              {vaccine.sideEffects && vaccine.sideEffects.length > 0 ? (
                vaccine.sideEffects.map((sideEffect, index) => (
                  <div key={index}>{sideEffect}</div>
                ))
              ) : (
                <span>No known side effects</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <AddVaccineModal refetch={callApi} />
    </div>
  );
}
