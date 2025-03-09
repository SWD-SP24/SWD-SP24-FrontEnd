import React from "react";
import { formatDate } from "../../../util/dateFormat";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";
import showToast from "../../../util/showToast.js";
export default function UpdateToothRecord({
  toothData,
  setToothData,
  refetch,
}) {
  const url = `${API_URLS.TEETH_RECORD.TEETH_RECORD}/${toothData.recordId}`;
  const { response, callApi } = useApi({
    url: url,
    method: "PUT",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let target = document.querySelector(".content-wrapper");

    await callApi(toothData);
    showToast({
      icon: "success",
      text: "Update Tooth Record successfully",
      targetElement: target,
    });
    refetch();
  };
  return (
    <div>
      <div
        className="card-header header-elements py-0 "
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h5 className="card-title mb-0 ">Tooth Record</h5>
      </div>
      <div className="card-body pt-2">
        <form>
          <div className="tooth-content">
            <div className="tooth-label mb-3">
              <span>Eruption Date: </span>
              <div>
                <input
                  value={formatDate(toothData.eruptionDate) || ""}
                  className="form-control"
                  type="date"
                  id="fromDateInput"
                  onChange={(e) =>
                    setToothData((prev) => ({
                      ...prev,
                      eruptionDate: e.target.value,
                    }))
                  }
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div className="tooth-label">
              <span>Tooth Note: </span>
              <div>
                <textarea
                  value={toothData.note || "Note your child tooth here"}
                  onChange={(e) =>
                    setToothData((prev) => ({ ...prev, note: e.target.value }))
                  }
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Update Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
