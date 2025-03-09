import React, { useEffect, useState } from "react";
import "./managePackage.scss";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import showToast from "../../util/showToast";
import PackageFilters from "./partials/PackageFilters/PackageFilters";
import PackageTable from "./partials/PackageTable/PackageTable";
import Pagination from "./partials/Pagination/Pagination";
import { sPackages, sPagination } from "./managePackageStore";
import PackageTableSkeleton from "./partials/PackageTable/PackageTableSkeleton";
import AddPackageModal from "./partials/AddPackageModal/AddPackageModal";
import EditPackageModal from "./partials/EditPackageModal/EditPackageModal";
import PackageList from "./partials/PackageList/PackageList";

export default function ManagePackages() {
  const packages = sPackages.use();
  const pagination = sPagination.use();
  const [users, setUsers] = useState([]);

  const { isLoading, response, error, callApi } = useApi({
    method: "GET",
  });

  const {
    isLoading: getUsersLoading,
    response: getUsersResponse,
    error: getUsersError,
    callApi: getUsersCallApi,
  } = useApi({
    url: API_URLS.USER.GET_USERS_LIST,
    method: "GET",
  });

  useEffect(() => {
    getUsersCallApi();
    fetchPackages(pagination.currentPage, pagination.itemsPerPage);
    return () => {
      sPagination.reset();
    };
  }, []);

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "successful") {
        const packages = response.data || {};
        const pagination = response.pagination || {};
        if (packages) {
          sPackages.set(packages);
          sPagination.set((prev) => {
            prev.value.totalPages = pagination.lastVisiblePage;
            prev.value.totalItems = pagination.total;
          });
        }
      }
    };

    const handleError = () => {
      if (error?.message) {
        showToast({
          icon: "error",
          text: error?.message,
          targetElement: document.querySelector(".card"),
        });
      }
    };

    try {
      handleApiResponse();
      handleError();
    } catch (err) {
      console.error("Error handling API response:", err);
    }
  }, [response, error]);

  useEffect(() => {
    if (getUsersResponse?.status === "successful") {
      const users = getUsersResponse.data || [];

      if (users) {
        setUsers(users);
      }
    }
  }, [getUsersResponse]);

  const fetchPackages = (page, pageSize) => {
    const customUrl = `${API_URLS.MEMBERSHIP_PACKAGE.GET}?pageNumber=${page}&pageSize=${pageSize}`;
    callApi(null, customUrl);
  };

  const handlePageChange = (page) => {
    sPagination.set((prev) => {
      prev.value.currentPage = page;
    });
    fetchPackages(page, pagination.itemsPerPage);
  };

  return (
    <>
      <h4 class="mb-1">Membership Package List</h4>
      <p class="mb-6">
        Each membership package provides access to different features and
        services. Depending on the selected package, users will have access to
        functionalities that suit their needs.
      </p>

      <div className="row g-6">
        <PackageList
          packages={packages}
          users={users}
          onFetchPackages={fetchPackages}
        />
        <div class="col-12">
          <h4 class="mt-6 mb-1">Total users with their membership packages</h4>
          <p class="mb-0">
            View all users and the membership packages they are currently
            subscribed to.
          </p>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-datatable">
              <div
                id="DataTables_Table_0_wrapper"
                className="dt-container dt-bootstrap5 dt-empty-footer"
              >
                <PackageFilters onFetchPackages={fetchPackages} />
                {isLoading ? (
                  <>
                    <PackageTableSkeleton />
                  </>
                ) : (
                  <>
                    <PackageTable
                      packages={packages}
                      onFetchPackages={fetchPackages}
                    />
                  </>
                )}
                <Pagination
                  currentPage={pagination.currentPage}
                  itemsPerPage={pagination.itemsPerPage}
                  totalItems={pagination.totalItems}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
        <AddPackageModal />
        <EditPackageModal />
      </div>
    </>
  );
}
