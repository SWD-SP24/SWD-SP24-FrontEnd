import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";
import { convertToISOString, toDMY } from "../../../util/dateFormat";
import showToast from "../../../util/showToast";
export default function CreateToothRecord({ toothId, refetch, dob }) {
  const id = useParams().childId;
  const eruptionDate = useRef(null);
  const note = useRef(null);
  const { response, callApi } = useApi({
    url: `${API_URLS.TEETH_RECORD.TEETH_RECORD}`,
    method: "POST",
  });

  useEffect(() => {
    console.log(response);
  }, [response]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let target = document.querySelector(".content-wrapper");

    const data = {
      childId: id,
      toothId: toothId,
      eruptionDate: toDMY(eruptionDate.current.value),
      note: note.current.value,
    };

    await callApi(data);
    showToast({
      icon: "success",
      text: "Create Tooth Record successfully",
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
        <h5 className="card-title mb-0 ">Create Tooth Record</h5>
      </div>
      <div className="card-body pt-2">
        <div className="tooth-content d-flex flex-column">
          <form>
            <div className="tooth-label mb-3">
              <span>Eruption Date: </span>
              <div>
                <input
                  ref={eruptionDate}
                  value={new Date().toISOString().split("T")[0]}
                  className="form-control"
                  type="date"
                  id="fromDateInput"
                  min={convertToISOString(dob)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div className="tooth-label">
              <span>Tooth Note: </span>
              <div>
                <textarea
                  ref={note}
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="This tooth has erupted."
                />
              </div>
            </div>
            <div className="button-container">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
                style={{ width: "160px" }}
              >
                Create Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
