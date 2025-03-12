import React, { useEffect } from "react";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";

export default function TotalUsers() {
  const { response, callApi } = useApi({
    url: `${API_URLS.USER.GET_USERS_LIST}`,
    method: "GET",
  });

  const { response: membershipPkg, callApi: callApiMP } = useApi({
    url: `${API_URLS.MEMBERSHIP_PACKAGE.GET}`,
    method: "GET",
  });
  useEffect(() => {
    callApi();
    callApiMP();
  }, []);
  useEffect(() => {
    if (response != null && membershipPkg != null) {
      console.log(response);
      console.log(membershipPkg);
    }
  }, [response, membershipPkg]);

  if (response === null || membershipPkg === null) {
    return <div>Loading</div>;
  }
  const countUsersByMembership = (users, packages) => {
    // Create a mapping of membership ID to name
    const packageMap = packages.reduce((acc, pkg) => {
      acc[pkg.membershipPackageId] = pkg.membershipPackageName;
      return acc;
    }, {});

    // Count users by membership package ID
    const membershipCounts = users.reduce((acc, user) => {
      const packageName = packageMap[user.membershipPackageId] || "Unknown";
      acc[packageName] = (acc[packageName] || 0) + 1;
      return acc;
    }, {});

    return membershipCounts;
  };

  const result = countUsersByMembership(response.data, membershipPkg.data);
  console.log(result);
  return (
    <div class="col-4 order-2 mb-4 h-100">
      <div class="card h-100">
        <div class="card-header d-flex align-items-center justify-content-between pb-0">
          <div class="card-title mb-0">
            <h5 class="m-0 me-2">Total Users</h5>
          </div>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex flex-column align-items-center gap-1">
              <h2 class="mb-2">{response && response.data.length}</h2>
              <span>Subcriptions</span>
            </div>
            <div id="orderStatisticsChart"></div>
          </div>
          <ul class="p-0 m-0">
            <li class="d-flex mb-4 pb-1">
              <div class="avatar flex-shrink-0 me-3">
                <span class="avatar-initial rounded bg-label-primary">
                  <i class="bx bx-paper-plane"></i>{" "}
                </span>
              </div>
              <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                  <h6 class="mb-0">Basic</h6>
                  <small class="text-muted">Basic Features</small>
                </div>
                <div class="user-progress">
                  <small class="fw-semibold">{result.Basic}</small>
                </div>
              </div>
            </li>
            <li class="d-flex mb-4 pb-1">
              <div class="avatar flex-shrink-0 me-3">
                <span class="avatar-initial rounded bg-label-success">
                  <i class="bx bxs-plane-alt"></i>
                </span>
              </div>
              <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                  <h6 class="mb-0">Standard</h6>
                  <small class="text-muted">Necessary features contained</small>
                </div>
                <div class="user-progress">
                  <small class="fw-semibold">{result.Standard}</small>
                </div>
              </div>
            </li>
            <li class="d-flex mb-4 pb-1">
              <div class="avatar flex-shrink-0 me-3">
                <span class="avatar-initial rounded bg-label-info">
                  <i class="bx bx-rocket"></i>
                </span>
              </div>
              <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                  <h6 class="mb-0">Enterprise</h6>
                  <small class="text-muted">
                    Premium with special features
                  </small>
                </div>
                <div class="user-progress">
                  <small class="fw-semibold">{result.Enterprise}</small>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
