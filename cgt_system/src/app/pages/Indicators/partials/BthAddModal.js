import React, { useEffect, useRef, useState } from "react";
import { convertToISOString, toDMY } from "../../../util/dateFormat";
import { sLatestHeight } from "./BthAddIndicators";
import { Bluetooth } from "lucide-react";
import useApi from "../../../hooks/useApi";
import API_URLS from "../../../config/apiUrls";
import showToast from "../../../util/showToast";
import { useParams } from "react-router";
export default function BthAddModal({ dob, refetch }) {
  const { childId } = useParams();
  const weightRef = useRef(null);
  const recordTimeRef = useRef(null);
  const [latestHeight, setLatestHeight] = useState(null);
  const { response, callApi } = useApi({
    url: `${API_URLS.INDICATORS.INDICATORS}`,
    method: "POST",
  });

  const { response: latestResponse, callApi: callLatestApi } = useApi({
    url: `${API_URLS.INDICATORS.LATEST_RECORD}?childrenId=${childId}`,
    method: "GET",
  });
  useEffect(() => {
    callLatestApi();
  }, []);

  useEffect(() => {
    if (latestResponse !== null) {
      setLatestHeight(latestResponse.data.height);
    }
  }, [latestResponse]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const weight = weightRef.current.value.trim();
    const recordTime = recordTimeRef.current.value.trim();
    if (!latestHeight || !weight) {
      const target = document.querySelector(".content-wrapper");
      showToast({
        icon: "warning",
        text: "All fields are required. Please fill in all fields before submitting.",
        targetElement: target,
      });
      return;
    }
    const data = {
      height: latestHeight,
      weight: weightRef.current.value,
      recordTime: toDMY(recordTime),
      childrenId: childId,
    };
    const closeButton = document.querySelector("#closeBluetoothModal");
    closeButton.click();
    console.log(data);
    await callApi(data);
    refetch();
    e.target.reset();
  };
  return (
    <div
      class="modal fade"
      id="modalBluetoothAdd"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalCenterTitle">
              Add New Indicators - Bluetooth
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="modal-body">
              <div class="row g-2 mb-3">
                <div class="col mb-2 ">
                  <label for="weight" class="form-label">
                    Weight
                  </label>
                  <div className="input-group">
                    <input
                      ref={weightRef}
                      type="text"
                      id="weight"
                      className="form-control"
                      placeholder="Enter Weight"
                    />
                    <span
                      className="input-group-text"
                      style={{ cursor: "pointer" }}
                    >
                      <Bluetooth size={20} />
                    </span>
                  </div>
                </div>
                <div class="col mb-3">
                  <label for="height" class="form-label">
                    Height
                  </label>
                  <input
                    type="text"
                    id="height"
                    class="form-control"
                    placeholder={latestHeight ? latestHeight : "Enter Height"}
                    value={latestHeight}
                    onChange={(e) => setLatestHeight(e.target.value)}
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
                id="closeBluetoothModal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
