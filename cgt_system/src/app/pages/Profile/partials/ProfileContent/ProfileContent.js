import React from "react";
import UpdateForm from "../UpdateForm";
import AvatarForm from "../AvatarForm/AvatarForm";

export default function ProfileContent({ user, setUser, apiUrl }) {
  return (
    <div className="content-wrapper">
      {/* <!-- Content --> */}

      <div className="col-md-12">
        <div className="card mb-4">
          <h5 className="card-header">Profile Details</h5>
          {/* <!-- Account --> */}
          <div className="card-body">
            <AvatarForm userData={user} setUser={setUser} apiUrl={apiUrl} />
          </div>
          <hr className="my-0" />
          <div className="card-body">
            <UpdateForm userData={user} setUser={setUser} apiUrl={apiUrl} />
          </div>
          {/* <!-- /Account --> */}
        </div>
        {/* <!-- Delete Acc --> */}
        {/* <div className="card">
                          <h5 className="card-header">Delete Account</h5>
                          <div className="card-body">
                            <div className="mb-3 col-12 mb-0">
                              <div className="alert alert-warning">
                                <h6 className="alert-heading fw-bold mb-1">
                                  Are you sure you want to delete your account?
                                </h6>
                                <p className="mb-0">
                                  Once you delete your account, there is no going
                                  back. Please be certain.
                                </p>
                              </div>
                            </div>
                            <form
                              id="formAccountDeactivation"
                              onsubmit="return false"
                            >
                              <div className="form-check mb-3">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="accountActivation"
                                  id="accountActivation"
                                />
                                <label
                                  className="form-check-label"
                                  for="accountActivation"
                                >
                                  I confirm my account deactivation
                                </label>
                              </div>
                              <button
                                type="submit"
                                className="btn btn-danger deactivate-account"
                              >
                                Deactivate Account
                              </button>
                            </form>
                          </div>
                        </div> */}
      </div>

      {/* <!-- / Content --> */}

      <div className="content-backdrop fade"></div>
    </div>
  );
}
