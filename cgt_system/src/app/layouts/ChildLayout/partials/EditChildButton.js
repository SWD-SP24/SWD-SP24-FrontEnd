import React, { useEffect, useRef } from "react";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";

export default function EditChildButton({ childData, refetch }) {
  const { response, callApi } = useApi({
    url: `${API_URLS.CHILDREN.EDIT_CHILD}${childData.childrenId}`,
    method: "PUT",
  });

  const fullNameRef = useRef(null);
  const avatarRef = useRef(null);
  const genderRef = useRef(null);
  const dobRef = useRef(null);
  const allergiesRef = useRef(null);
  const chronicConditionsRef = useRef(null);
  const bloodTypeRef = useRef(null);

  useEffect(() => {
    fullNameRef.current.value = childData.fullName;
    avatarRef.current.value = childData.avatar;
    genderRef.current.value = childData.gender;
    dobRef.current.value = childData.dob;
    allergiesRef.current.value = childData.allergies;
    chronicConditionsRef.current.value = childData.chronicConditions;
    bloodTypeRef.current.value = childData.bloodType;
  }, [childData]);

  useEffect(() => {
    console.log(response);
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullName: fullNameRef.current.value,
      avatar: avatarRef.current.value,
      gender: genderRef.current.value,
      dob: dobRef.current.value,
      allergies: allergiesRef.current.value,
      chronicConditions: chronicConditionsRef.current.value,
      bloodType: bloodTypeRef.current.value,
    };
    console.log(data);
    await callApi(data);
    refetch();
  };

  return (
    <>
      <button
        className="btn btn-primary me-4"
        data-bs-toggle="modal"
        data-bs-target="#editChildModal"
      >
        Edit
      </button>

      {/* Modal Edit */}
      <div
        className="modal fade"
        id="editChildModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editChildModalTitle">
                Edit Child
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Full Name
                    </label>
                    <input
                      ref={fullNameRef}
                      type="text"
                      id="fullName"
                      className="form-control"
                      placeholder="Enter Child Name"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="avatarUrl" className="form-label">
                      Avatar
                    </label>
                    <input
                      ref={avatarRef}
                      type="text"
                      id="avatarUrl"
                      className="form-control"
                      placeholder="Enter Avatar Link"
                    />
                  </div>
                </div>
                <div className="row g-2 mb-3">
                  <div className="col mb-0">
                    <label htmlFor="genderSelect" className="form-label">
                      Gender
                    </label>
                    <select
                      id="genderSelect"
                      className="form-select"
                      ref={genderRef}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="col mb-0">
                    <label htmlFor="dobInput" className="form-label">
                      Date
                    </label>
                    <input
                      ref={dobRef}
                      className="form-control"
                      type="date"
                      defaultValue="2021-06-18"
                      id="dobInput"
                    />
                  </div>
                </div>
                <div className="row g-2 mb-3">
                  <div className="col mb-0">
                    <label htmlFor="bloodTypeSelect" className="form-label">
                      Blood-type
                    </label>
                    <select
                      id="bloodTypeSelect"
                      className="form-select"
                      ref={bloodTypeRef}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="AB">AB</option>
                      <option value="O">O</option>
                    </select>
                  </div>
                  <div className="col mb-0">
                    <label htmlFor="allergies" className="form-label">
                      Allergies
                    </label>
                    <input
                      ref={allergiesRef}
                      type="text"
                      id="allergies"
                      className="form-control"
                      placeholder="Enter Allergy Ingredients"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="chronicCondition" className="form-label">
                      Chronic Conditions
                    </label>
                    <input
                      ref={chronicConditionsRef}
                      type="text"
                      id="chronicCondition"
                      className="form-control"
                      placeholder="Enter Chronic Conditions"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="reset"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
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
