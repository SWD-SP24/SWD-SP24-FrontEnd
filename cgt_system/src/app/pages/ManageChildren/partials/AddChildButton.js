import React, { useRef } from "react";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";
export default function AddChildButton({
  refetch,
  permissions,
  numberOfChild,
}) {
  const fullNameRef = useRef(null);
  const genderRef = useRef(null);
  const dobRef = useRef(null);
  const bloodRef = useRef(null);
  const allergiesRef = useRef(null);
  const chronicConditionRef = useRef(null);

  const { response, callApi } = useApi({
    url: `${API_URLS.CHILDREN.ADD_CHILD}`,
    method: "POST",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullName: fullNameRef.current.value,
      gender: genderRef.current.value,
      dob: dobRef.current.value,
      bloodType: bloodRef.current.value,
      allergies: allergiesRef.current.value,
      chronicConditions: chronicConditionRef.current.value,
    };
    console.log(data);
    await callApi(data);
    refetch();
    e.target.reset();
    let button = document.querySelector("#closeAddNewChild");
    button.click();
  };

  return (
    <>
      <div style={{ position: "relative", display: "inline-block" }}>
        <button
          className="btn add-new btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalCenter"
          disabled={
            !permissions.some(
              (p) => p.permissionName === "MANAGE_MULTIPLE_CHILDREN"
            ) && numberOfChild >= 1
          }
          style={{ position: "relative" }}
        >
          <span>
            <i className="icon-base bx bx-plus icon-sm me-0 me-sm-2"></i>
            <span className="d-none d-sm-inline-block">Add New Child</span>
          </span>
        </button>

        {/* Hiển thị biểu tượng khóa nếu button bị disabled */}
        {!permissions.some(
          (p) => p.permissionName === "MANAGE_MULTIPLE_CHILDREN"
        ) &&
          numberOfChild >= 1 && (
            <i
              className="bx bx-lock"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "30px",
                color: "var(--bs-primary)",
                zIndex: 10,
              }}
            ></i>
          )}
      </div>

      <div class="modal fade" id="modalCenter" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalCenterTitle">
                Add New Child
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
                <div class="row ">
                  <div class="col mb-3">
                    <label for="fullName" class="form-label">
                      Full Name
                    </label>
                    <input
                      ref={fullNameRef}
                      type="text"
                      id="fullName"
                      class="form-control"
                      placeholder="Enter Child Name"
                      required
                    />
                  </div>
                </div>

                <div class="row g-2 mb-3">
                  <div class="col mb-0">
                    <label for="genderSelect" class="form-label">
                      Gender
                    </label>
                    <select
                      id="genderSelect"
                      class="form-select"
                      ref={genderRef}
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div class="col mb-0">
                    <label for="dobInput" class="form-label">
                      Date
                    </label>

                    <input
                      ref={dobRef}
                      class="form-control"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      id="dobInput"
                      max={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                </div>
                <div class="row g-2 mb-3">
                  <div class="col mb-0">
                    <label for="bloodTypeSelect" class="form-label">
                      Blood-type
                    </label>
                    <select
                      id="bloodTypeSelect"
                      class="form-select"
                      ref={bloodRef}
                      required
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="AB">AB</option>
                      <option value="O">O</option>
                    </select>
                  </div>
                  <div class="col mb-0">
                    <label for="allergies" class="form-label">
                      Allergies
                    </label>
                    <input
                      ref={allergiesRef}
                      type="text"
                      id="allergies"
                      class="form-control"
                      placeholder="Enter Allergy Ingredients"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col mb-3">
                    <label for="chronicCondition" class="form-label">
                      Chronic Conditions
                    </label>
                    <input
                      ref={chronicConditionRef}
                      type="text"
                      id="chronicCondition"
                      class="form-control"
                      placeholder="Enter Chronic Conditions"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="reset"
                  class="btn btn-outline-secondary"
                  id="closeAddNewChild"
                  data-bs-dismiss="modal"
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
    </>
  );
}
