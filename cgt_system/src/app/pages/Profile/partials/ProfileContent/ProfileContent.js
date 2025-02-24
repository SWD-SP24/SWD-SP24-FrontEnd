import React from "react";
import UpdateForm from "../UpdateForm";
import AvatarForm from "../AvatarForm/AvatarForm";

export default function ProfileContent({ user, setUser, apiUrl }) {
  return (
    <div class="content-wrapper">
      {/* <!-- Content --> */}

      <div class="col-md-12">
        <div class="card mb-4">
          <h5 class="card-header">Profile Details</h5>
          {/* <!-- Account --> */}
          <div class="card-body">
            <AvatarForm userData={user} setUser={setUser} apiUrl={apiUrl} />
          </div>
          <hr class="my-0" />
          <div class="card-body">
            <UpdateForm userData={user} setUser={setUser} apiUrl={apiUrl} />
          </div>
          {/* <!-- /Account --> */}
        </div>
        {/* <!-- Delete Acc --> */}
        {/* <div class="card">
                          <h5 class="card-header">Delete Account</h5>
                          <div class="card-body">
                            <div class="mb-3 col-12 mb-0">
                              <div class="alert alert-warning">
                                <h6 class="alert-heading fw-bold mb-1">
                                  Are you sure you want to delete your account?
                                </h6>
                                <p class="mb-0">
                                  Once you delete your account, there is no going
                                  back. Please be certain.
                                </p>
                              </div>
                            </div>
                            <form
                              id="formAccountDeactivation"
                              onsubmit="return false"
                            >
                              <div class="form-check mb-3">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  name="accountActivation"
                                  id="accountActivation"
                                />
                                <label
                                  class="form-check-label"
                                  for="accountActivation"
                                >
                                  I confirm my account deactivation
                                </label>
                              </div>
                              <button
                                type="submit"
                                class="btn btn-danger deactivate-account"
                              >
                                Deactivate Account
                              </button>
                            </form>
                          </div>
                        </div> */}
      </div>

      {/* <!-- / Content --> */}

      <div class="content-backdrop fade"></div>
    </div>
  );
}
