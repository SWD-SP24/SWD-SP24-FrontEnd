import React, { useRef } from "react";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";
import {
  convertToISOString,
  formatDate,
  toDMY,
} from "../../../util/dateFormat";
import showToast from "../../../util/showToast";
export default function AddIndicators({ refetch, childId, dob }) {
  const heightRef = useRef(null);
  const weightRef = useRef(null);
  const recordTimeRef = useRef(null);
  const { response, callApi } = useApi({
    url: `${API_URLS.INDICATORS.INDICATORS}`,
    method: "POST",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const height = heightRef.current.value.trim();
    const weight = weightRef.current.value.trim();
    const recordTime = recordTimeRef.current.value.trim();

    if (!height || !weight) {
      const target = document.querySelector(".content-wrapper");
      showToast({
        icon: "warning",
        text: "All fields are required. Please fill in all fields before submitting.",
        targetElement: target,
      });
      return;
    }

    const data = {
      childrenId: childId,
      height,
      weight,
      recordTime: toDMY(recordTime),
    };

    console.log(data);
    await callApi(data);
    refetch();
    e.target.reset();
  };

  return (
    <>
      <button
        className="btn add-new btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalCenterIndicators"
      >
        <span>
          <i className="icon-base bx bx-plus icon-sm me-0 me-sm-2"></i>
          <span className="d-none d-sm-inline-block">Add New Indicators</span>
        </span>
      </button>
      <div
        class="modal fade"
        id="modalCenterIndicators"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalCenterTitle">
                Add New Indicators
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
                  <div class="col mb-2 ">
                    <label for="weight" class="form-label">
                      Weight
                    </label>
                    <input
                      ref={weightRef}
                      type="text"
                      id="weight"
                      class="form-control"
                      placeholder="Enter Child Weight"
                    />
                  </div>
                  <div class="col mb-3">
                    <label for="height" class="form-label">
                      Height
                    </label>
                    <input
                      ref={heightRef}
                      type="text"
                      id="height"
                      class="form-control"
                      placeholder="Enter Child height"
                    />
                  </div>
                  <div class="col mb-0">
                    <label for="dobInput" class="form-label">
                      Date
                    </label>

                    <input
                      ref={recordTimeRef}
                      class="form-control"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      id="dobInput"
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
    </>
  );
}
