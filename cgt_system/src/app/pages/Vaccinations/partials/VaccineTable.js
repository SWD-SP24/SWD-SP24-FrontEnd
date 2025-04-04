import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { signify } from "react-signify";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";
import AddVaccineModal from "./AddVaccineModal";

export const sVaccineId = signify("");
export const sDose = signify("");
export const sVaccineName = signify("");
export default function VaccineTable({
  vaccineList,
  refetch,
  onSetVaccinations,
  dob,
}) {
  const childId = useParams().childId;
  const { response, callApi } = useApi({
    url: `${API_URLS.VACCINE_RECORD.VACCINE_RECORD}?childId=${childId}`,
    method: "GET",
  });
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response?.status === "successful") {
      const vaccinations = response.data || [];
      onSetVaccinations(vaccinations);
    }
  }, [response]);

  const handleStatus = (vaccineId, dose, recordList) => {
    if (!vaccineId || !recordList)
      return <span className="badge bg-label-warning">Pending</span>; // Handle undefined values
    const haveRecord = recordList.some(
      (record) => record.vaccineId === vaccineId && record.dose === dose
    );
    return haveRecord ? (
      <span className="badge bg-label-info">Given</span>
    ) : (
      <span className="badge bg-label-warning">Pending</span>
    );
  };

  const handleCheckList = (vaccine, recordList) => {
    if (!vaccine || !recordList) return null;
    const haveRecord = recordList.some(
      (record) =>
        record.vaccineId === vaccine.vaccineId &&
        record.dose === vaccine.doseNumber
    );
    return haveRecord ? (
      <div className="badge bg-label-success">Updated</div>
    ) : (
      <button
        className="btn btn-sm btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalAddRecord"
        onClick={() => {
          sVaccineId.set(vaccine.vaccineId);
          sVaccineName.set(vaccine.vaccineName);
          sDose.set(vaccine.doseNumber);
          console.log("signify o day", sVaccineName.value);
        }}
      >
        Update
      </button>
    );
  };
  // const checkStatus = (vaccine, recordList) => {
  //   if (!vaccine || !recordList) return "pending"; // Default to "pending"
  //   const haveRecord = recordList.some(
  //     (record) =>
  //       record.vaccineId === vaccine.vaccineId &&
  //       record.dose === vaccine.doseNumber // Ensure correct dose comparison
  //   );
  //   return haveRecord ? "given" : "pending";
  // };

  // if (!vaccineList) return <div>Loading</div>;
  // const filteredList = vaccineList.data.filter((vaccine) => {
  //   const status = checkStatus(vaccine, response.data); // Get status
  //   return (
  //     (filterName === "" ||
  //       vaccine.vaccineName.toLowerCase().includes(filterName.toLowerCase())) &&
  //     (filterStatus === "" || status === filterStatus) // Compare status correctly
  //   );
  // });

  return (
    <div class="table-responsive mb-4">
      <div
        id="DataTables_Table_0_wrapper"
        class="dt-container dt-bootstrap5 dt-empty-footer"
      >
        {/* <div
          className="row mx-3 justify-content-between my-0"
          style={{ height: "58.225px" }}
        >
          <div
            className="d-md-flex align-items-center dt-layout-end col-md-auto d-flex gap-md-4 justify-content-start gap-4 flex-wrap mt-0"
            style={{ paddingLeft: "8px" }}
          ></div>
          <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
            <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
              <div className="  d-flex align-items-center ">
                <input
                  type="search"
                  className="form-control"
                  id="dt-search-0"
                  placeholder="Search Vaccine"
                  aria-controls="DataTables_Table_0"
                  onChange={(e) => setFilterName(e.target.value)}
                />
                <label htmlFor="dt-search-0"></label>
              </div>
              <div className="user_role w-px-200 my-md-0 mt-6 mb-2">
                <select
                  id="UserRole"
                  className="form-select text-capitalize"
                  onChange={(e) => setFilterStatus(e.target.value)}
                  disabled
                >
                  <option value=""> Select Status </option>
                  <option value="given" className="text-capitalize">
                    Given
                  </option>
                  <option value="pending" className="text-capitalize">
                    Pending
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div> */}
        <div class="justify-content-between dt-layout-table">
          <div class="d-md-flex justify-content-between align-items-center dt-layout-full table-responsive">
            <table
              class="table datatable-project dataTable dtr-column"
              id="DataTables_Table_0"
              aria-describedby="DataTables_Table_0_info"
              style={{ width: "100%" }}
            >
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead class="border-top">
                <tr>
                  <th
                    data-dt-column="2"
                    rowspan="1"
                    colspan="1"
                    aria-sort="descending"
                    aria-label="Project: Activate to remove sorting"
                    tabindex="0"
                  >
                    <span class="dt-column-title">Age mo.</span>
                    <span class="dt-column-order"></span>
                  </th>
                  <th
                    data-dt-column="3"
                    rowspan="1"
                    colspan="1"
                    aria-label="Leader: Activate to sort"
                    tabindex="0"
                  >
                    <span class="dt-column-title">Name </span>
                  </th>
                  <th
                    data-dt-column="4"
                    rowspan="1"
                    colspan="1"
                    class="dt-orderable-none"
                    aria-label="Team"
                  >
                    <span class="dt-column-title">Dose number</span>
                  </th>
                  <th
                    class="w-px-200 dt-orderable-none"
                    data-dt-column="5"
                    rowspan="1"
                    colspan="1"
                    tabindex="0"
                  >
                    Status
                  </th>
                  <th
                    class="w-px-200 dt-orderable-none"
                    data-dt-column="6"
                    rowspan="1"
                    colspan="1"
                    tabindex="0"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {vaccineList &&
                  response &&
                  vaccineList.data.map((vaccine) => {
                    return (
                      <tr key={vaccine.vaccineId}>
                        <td class="sorting_1">
                          <div class="d-flex justify-content-left align-items-center">
                            <div class="d-flex flex-column gap-50">
                              <span class="text-truncate fw-medium text-heading">
                                {vaccine.recommendedAgeMonths}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <Link
                            to={`/member/children/${childId}/vaccine/${vaccine.vaccineId}`}
                            state={{ doseNumber: vaccine.doseNumber }}
                          >
                            <span className="text-heading">
                              {vaccine.vaccineName}
                            </span>
                          </Link>
                        </td>
                        <td className="text-center">
                          <div class="d-flex align-items-center">
                            <div class="d-flex flex-column gap-50">
                              <span class=" text-heading">
                                {vaccine.doseNumber}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td class="dt-type-numeric">
                          <div class="d-flex align-items-center">
                            {handleStatus(
                              vaccine.vaccineId,
                              vaccine.doseNumber,
                              response.data
                            )}
                          </div>
                        </td>
                        <td class="dt-type-numeric text-center">
                          <div class="d-flex align-items-center gap-2">
                            {handleCheckList(vaccine, response.data)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        </div>
      </div>

      <AddVaccineModal refetch={callApi} dob={dob} />
    </div>
  );
}
