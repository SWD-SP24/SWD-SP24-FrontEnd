import React, { use, useEffect, useRef, useState } from "react";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";
import showToast from "../../../util/showToast.js";
import { signify } from "react-signify";

const sUrl = signify("");
export default function EditIndicators({ refetch, indicatorId }) {
  const heightRef = useRef(null);
  const weightRef = useRef(null);
  const { callApi } = useApi({
    method: "PUT",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Always get the latest indicatorId at the time of submission
    const latestIndicatorId = indicatorId; // or propIndicatorId if needed
    console.log("📌 API Call URL:", sUrl.value);

    const data = {
      height: heightRef.current.value,
      weight: weightRef.current.value,
    };

    let target = document.querySelector(".content-wrapper");

    await callApi(data, sUrl.value); // ⬅️ Now always using the latest ID
    showToast({
      icon: "success",
      text: "Indicator edited successfully",
      targetElement: target,
    });

    refetch();
  };

  const handleUrl = () => {
    const url = `${API_URLS.INDICATORS.INDICATORS}/${indicatorId}`;
    sUrl.set(url);
  };
  return (
    <>
      <span>
        <i
          class="bx bx-edit icon-md icon-base"
          data-bs-toggle="modal"
          data-bs-target="#ModalEditIndicators"
          style={{ color: "#80deea" }}
          role="button"
          onClick={() => handleUrl()}
        ></i>
      </span>
      <div
        class="modal fade"
        id="ModalEditIndicators"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalCenterTitle">
                Edit Child Indicators
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
