import React, { useEffect, useState } from "react";
import API_URLS from "../../../config/apiUrls";
import { useParams } from "react-router";
import useApi from "../../../hooks/useApi";

export default function VaccineTable({ vaccineList, refetch }) {
  const childId = useParams().id;
  const { response, callApi } = useApi({
    url: `${API_URLS.VACCINE_RECORD.VACCINE_RECORD}?childrenId=${childId}`,
    method: "GET",
  });
  const [page, setPage] = useState(1);
  const handlePage = (index) => {
    setPage(index);
    const customUrl = `${API_URLS.VACCINATIONS.VACCINATIONS_SCHEDULE}?pageNumber=${index}&pageSize=8&sortByAge=true`;
    refetch(null, customUrl);
  };

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    console.log(response);
  }, [response]);

  const handleStatus = (vaccineId, recordList) => {
    if (!vaccineId || !recordList)
      return <span className="badge bg-label-warning">Pending</span>; // Handle undefined values
    const haveRecord = recordList.some(
      (record) => record.vaccineId === vaccineId
    );
    return haveRecord ? (
      <span className="badge bg-label-info">Given</span>
    ) : (
      <span className="badge bg-label-warning">Pending</span>
    );
  };

  return (
    <div class="table-responsive mb-4">
      <div
        id="DataTables_Table_0_wrapper"
        class="dt-container dt-bootstrap5 dt-empty-footer"
      >
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
                    <span class="dt-column-title">Recommend Age</span>
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
                    data-dt-column="6"
                    rowspan="1"
                    colspan="1"
                    class="dt-orderable-none"
                    aria-label="Action"
                  >
                    <span class="dt-column-title">Action</span>
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
                          <span class="text-heading">
                            {vaccine.vaccineName}
                          </span>
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
                            {handleStatus(vaccine.vaccineId, response.data)}
                          </div>
                        </td>
                        <td class="d-flex gap-5">Check</td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        </div>
        <div class="row mx-2 justify-content-between">
          <div class="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto px-4 mt-0">
            <div
              class="dt-info"
              aria-live="polite"
              id="DataTables_Table_0_info"
              role="status"
            >
              {vaccineList &&
                response &&
                `Showing ${1 + 6 * (page - 1)} to ${Math.min(
                  1 + 6 * page,
                  Math.ceil(vaccineList.pagination.total)
                )} of ${vaccineList.pagination.total} entries`}
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

                  {vaccineList &&
                    [...Array(vaccineList.pagination.lastVisiblePage)].map(
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
                        handlePage(vaccineList.pagination.lastVisiblePage)
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
    </div>
  );
}
