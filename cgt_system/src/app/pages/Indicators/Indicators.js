import React, { useEffect, useRef, useState } from "react";
import AddIndicators from "./partials/AddIndicators.js";
import BMIProgressBar from "./partials/BMIProgessBar.js";
import { useParams } from "react-router";
import API_URLS from "../../config/apiUrls.js";
import useApi from "../../hooks/useApi.js";
import { toDMY } from "../../util/dateFormat.js";
import RemoveIndicators from "./partials/RemoveIndicators.js";
import DateRangePicker from "./partials/DateRangePicker.js";
export default function Indicators() {
  const childId = useParams().id;
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const [page, setPage] = useState(1);
  const url = `${API_URLS.INDICATORS.INDICATORS}?childrenId=${childId}&pageNumber=1&pageSize=6`;

  const { response, callApi } = useApi({
    url: url,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    console.log(response);
  }, [response]);

  const handlePage = (index) => {
    setPage(index);
    const customUrl = `${API_URLS.INDICATORS.INDICATORS}?childrenId=${childId}&pageNumber=${index}&pageSize=6`;
    callApi(null, customUrl);
  };
  return (
    <div class="card mb-6">
      <h5 class="card-header pb-0 text-md-start text-center">Projects List</h5>
      <div class="table-responsive mb-4">
        <div
          id="DataTables_Table_0_wrapper"
          class="dt-container dt-bootstrap5 dt-empty-footer"
        >
          <div class="row mx-md-2 justify-content-between">
            <div class="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto px-4 mt-0">
              <DateRangePicker
                fromDateRef={fromDateRef}
                toDateRef={toDateRef}
                refetch={callApi}
                childId={childId}
              />
            </div>
            <div class="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto px-4 mt-0 gap-2">
              <AddIndicators refetch={callApi} childId={childId} />
            </div>
          </div>
          <div class="justify-content-between dt-layout-table">
            <div class="d-md-flex justify-content-between align-items-center dt-layout-full table-responsive">
              <table
                class="table datatable-project dataTable dtr-column"
                id="DataTables_Table_0"
                aria-describedby="DataTables_Table_0_info"
                style={{ width: "100%" }}
              >
                <colgroup>
                  <col data-dt-column="2" style={{ width: "230px;" }} />
                  <col data-dt-column="3" style={{ width: "100px;" }} />
                  <col data-dt-column="4" style={{ width: "100px;" }} />
                  <col data-dt-column="5" style={{ width: "120px;" }} />
                  <col data-dt-column="6" style={{ width: "107.912px;" }} />
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
                      <span class="dt-column-title">Date</span>
                      <span class="dt-column-order"></span>
                    </th>
                    <th
                      data-dt-column="3"
                      rowspan="1"
                      colspan="1"
                      aria-label="Leader: Activate to sort"
                      tabindex="0"
                    >
                      <span class="dt-column-title">Weight (kg)</span>
                    </th>
                    <th
                      data-dt-column="4"
                      rowspan="1"
                      colspan="1"
                      class="dt-orderable-none"
                      aria-label="Team"
                    >
                      <span class="dt-column-title">Height (cm)</span>
                    </th>
                    <th
                      class="w-px-200 dt-orderable-asc dt-orderable-desc dt-type-numeric"
                      data-dt-column="5"
                      rowspan="1"
                      colspan="1"
                      tabindex="0"
                    >
                      <span class="dt-column-title">BMI</span>
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
                  {response &&
                    response.data.map((record) => {
                      return (
                        <tr key={record.growthIndicatorsId}>
                          <td class="sorting_1">
                            <div class="d-flex justify-content-left align-items-center">
                              <div class="d-flex flex-column gap-50">
                                <span class="text-truncate fw-medium text-heading">
                                  {toDMY(record.recordTime)}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span class="text-heading">{record.weight}</span>
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <div class="d-flex flex-column gap-50">
                                <span class=" text-heading">
                                  {record.height}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td class="dt-type-numeric">
                            <div class="d-flex align-items-center">
                              <BMIProgressBar bmi={record.bmi} />
                              <span class="text-heading">{record.bmi}</span>
                            </div>
                          </td>
                          <td class="">
                            <RemoveIndicators
                              refetch={callApi}
                              indicatorId={record.growthIndicatorsId}
                            />
                          </td>
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
      </div>
    </div>
  );
}
