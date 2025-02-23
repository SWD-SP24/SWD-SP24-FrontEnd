import React from "react";
import UpdateForm from "../UpdateForm";
import AvatarForm from "../AvatarForm/AvatarForm";

export default function ProfileContent({
  response,
  refetch,
  nameParts,
  apiUrl,
}) {
  return (
    <div class="content-wrapper">
      {/* <!-- Content --> */}

      <div class="container-xxl flex-grow-1 container-p-y ">
        <h4 class="fw-bold py-3 mb-4">
          <span class="text-muted fw-light">Account Settings /</span> Account
        </h4>

        <div class="row">
          <div class="col-md-12">
            <ul class="nav nav-pills flex-column flex-md-row mb-3">
              <li class="nav-item">
                <a class="nav-link active" href="javascript:void(0);">
                  <i class="bx bx-user me-1"></i> Account
                </a>
              </li>
            </ul>
            <div class="card mb-4">
              <h5 class="card-header">Profile Details</h5>
              {/* <!-- Account --> */}
              <div class="card-body">
                <AvatarForm
                  userData={response}
                  refetch={refetch}
                  apiUrl={apiUrl}
                />
              </div>
              <hr class="my-0" />
              <div class="card-body">
                <UpdateForm
                  userData={response}
                  refetch={refetch}
                  nameParts={nameParts}
                  apiUrl={apiUrl}
                />
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
        </div>
      </div>
      {/* <!-- / Content --> */}

      <div class="content-backdrop fade"></div>
    </div>
  );
}
