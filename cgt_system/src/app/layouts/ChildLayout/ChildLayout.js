import Cookies from "js-cookie";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import Avatar from "../../components/Avatar/Avatar";
import API_URLS from "../../config/apiUrls";
import useApi from "../../hooks/useApi";
import calculateAge from "../../util/calculateAge";
import EditChildButton from "./partials/EditChildButton";
import RemoveChildButton from "./partials/RemoveChildButton";
export default function ChildLayout() {
  const id = useParams().id;
  const storedUser = Cookies.get("user");
  const parent = JSON.parse(storedUser);
  const apiUrl = `${API_URLS.CHILDREN.GET_CHILDREN_WITH_ID}${id}`;

  const { response, callApi } = useApi({
    url: apiUrl,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);
  if (!response) {
    return <div> loading</div>;
  }
  return (
    <div className="row">
      <div class="col-xl-4 col-lg-5 order-1 order-md-0">
        {/* <!-- User Card --> */}
        <div class="card mb-6">
          <div class="card-body pt-12">
            <div class="user-avatar-section">
              <div class=" d-flex align-items-center flex-column">
                <Avatar
                  src={response.data.avatar}
                  className="img-fluid rounded mb-4"
                />
                <div class="user-info text-center">
                  <h5>{response.data.fullName}</h5>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-around flex-wrap my-6 gap-0 gap-md-3 gap-lg-4">
              <div class="d-flex align-items-center me-5 gap-4">
                <div class="avatar">
                  <div class="avatar-initial bg-label-primary rounded w-px-40 h-px-40">
                    <i class="icon-base bx bx-check icon-lg"></i>
                  </div>
                </div>
                <div>
                  <h5 class="mb-0">1.23k</h5>
                  <span>Task Done</span>
                </div>
              </div>
              <div class="d-flex align-items-center gap-4">
                <div class="avatar">
                  <div class="avatar-initial bg-label-primary rounded w-px-40 h-px-40">
                    <i class="icon-base bx bx-customize icon-lg"></i>
                  </div>
                </div>
                <div>
                  <h5 class="mb-0">568</h5>
                  <span>Project Done</span>
                </div>
              </div>
            </div>
            <h5 class="pb-4 border-bottom mb-4">Details</h5>
            <div class="info-container">
              <ul class="list-unstyled mb-6">
                <li class="mb-2">
                  <span class="h6">Full Name: </span>
                  <span>{response.data.fullName}</span>
                </li>
                <li class="mb-2">
                  <span class="h6">Parent Email: </span>
                  <span>{parent.email}</span>
                </li>

                <li class="mb-2">
                  <span class="h6">Age: </span>
                  <span>{calculateAge(response.data.dob)}</span>
                </li>
                <li class="mb-2">
                  <span class="h6">Gender: </span>
                  <span>
                    {response.data.gender === "male" ? "Male" : "Female"}
                  </span>
                </li>
                <li class="mb-2">
                  <span class="h6">Date of Birth: </span>
                  <span>{response.data.dob}</span>
                </li>
                <li class="mb-2">
                  <span class="h6">Blood Type: </span>
                  <span>{response.data.bloodType}</span>
                </li>
                <li class="mb-2">
                  <span class="h6">Allergies: </span>
                  <span>{response.data.allergies}</span>
                </li>
                <li class="mb-2">
                  <span class="h6">Chronic Condition: </span>
                  <span>{response.data.chronicConditions}</span>
                </li>
              </ul>
              <div class="d-flex justify-content-center">
                <EditChildButton childData={response.data} refetch={callApi} />
                <RemoveChildButton childId={response.data.childrenId} />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /User Card --> */}
      </div>
      <div class="col-xl-8 col-lg-7 order-0 order-md-1">
        {/* <!-- User Pills --> */}
        <div class="nav-align-top">
          <ul class="nav nav-pills flex-column flex-md-row mb-6 flex-wrap row-gap-2">
            <li class="nav-item">
              <a class="nav-link active" href="javascript:void(0);">
                <i class="icon-base bx bx-user icon-sm me-1_5"></i>Account
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="app-user-view-security.html">
                <i class="icon-base bx bx-lock-alt icon-sm me-1_5"></i>Security
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="app-user-view-billing.html">
                <i class="icon-base bx bx-detail icon-sm me-1_5"></i>Billing
                &amp; Plans
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="app-user-view-notifications.html">
                <i class="icon-base bx bx-bell icon-sm me-1_5"></i>Notifications
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="app-user-view-connections.html">
                <i class="icon-base bx bx-link icon-sm me-1_5"></i>Connections
              </a>
            </li>
          </ul>
        </div>
        {/* <!--/ User Pills --> */}
      </div>
    </div>
  );
}
