import React, { useRef } from "react";
import API_URLS from "../../../config/apiUrls";
import { ages } from "../../../constants/ages.js";
import useApi from "../../../hooks/useApi";
export default function AddChildButton({ refetch }) {
  const fullNameRef = useRef(null);
  const ageRef = useRef(null);
  const avatarRef = useRef(null);
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
      avatar: avatarRef.current.value,
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
  };

  return (
    <>
      <button
        className="btn add-new btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalCenter"
      >
        <span>
          <i className="icon-base bx bx-plus icon-sm me-0 me-sm-2"></i>
          <span className="d-none d-sm-inline-block">Add New Child</span>
        </span>
      </button>
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
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col mb-3">
                    <label for="avatarUrl" class="form-label">
                      Avatar
                    </label>
                    <input
                      ref={avatarRef}
                      type="text"
                      id="avatarUrl"
                      class="form-control"
                      placeholder="Enter Avatar Link"
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
                      defaultValue="2021-06-18"
                      id="dobInput"
                      max={new Date().toISOString().split("T")[0]}
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
