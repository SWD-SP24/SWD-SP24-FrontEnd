import React, { useEffect, useRef } from "react";
import { sDose, sVaccineId, sVaccineName } from "./VaccineTable";
import { useParams } from "react-router";
import useApi from "../../../hooks/useApi";
import API_URLS from "../../../config/apiUrls";
import { convertToISOString, toDMY } from "../../../util/dateFormat";
export default function AddVaccineModal({ refetch, dob }) {
  const shotDateRef = useRef(null);
  const doseValue = sDose.use();
  const vaccineNameValue = sVaccineName.use();
  const vaccineIdValue = sVaccineId.use();
  const childId = useParams().childId;
  const { response, callApi } = useApi({
    url: `${API_URLS.VACCINE_RECORD.VACCINE_RECORD}`,
    method: "POST",
  });

  useEffect(() => {
    console.log("vaccineIdValue", vaccineIdValue, vaccineNameValue, doseValue);
  }, [doseValue, vaccineNameValue, vaccineIdValue]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      childId: childId,
      vaccineId: sVaccineId.value,
      administeredDate: toDMY(shotDateRef.current.value),
      dose: sDose.value,
    };
    await callApi(body);
    refetch();
  };
  return (
    <div
      class="modal fade"
      id="modalAddRecord"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalAddRecordTitle">
              Add Vaccine Record
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="modal-body">
              <div class="row g-2 mb-3">
                <div class="col mb-0">
                  <label for="vaccineSelect" class="form-label">
                    Vaccine
                  </label>
                  <select id="vaccineSelect" class="form-select" disabled>
                    <option selected value={sVaccineId.value}>
                      {sVaccineName.value}
                    </option>
                  </select>
                </div>
                <div class="col mb-0">
                  <label for="vaccineSelect" class="form-label">
                    Vaccine
                  </label>

                  {sDose.value !== "" ? (
                    <select id="vaccineSelect" class="form-select" disabled>
                      <option selected value={sDose.value}>
                        Dose {sDose.value}
                      </option>
                    </select>
                  ) : (
                    <select
                      id="vaccineSelect"
                      class="form-select"
                      onChange={(e) => sDose.set(e.target.value)}
                    >
                      <option selected value="1">
                        Dose 1
                      </option>
                      <option value="2">Dose 2</option>
                      <option value="3">Dose 3</option>
                    </select>
                  )}
                </div>
              </div>
              <div class="row">
                <div class="col mb-0">
                  <label for="shotDateInput" class="form-label">
                    Date
                  </label>

                  <input
                    ref={shotDateRef}
                    class="form-control"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    id="shotDateInput"
                    min={convertToISOString(dob)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="reset"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
