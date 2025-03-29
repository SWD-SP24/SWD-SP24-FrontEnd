import React, { useCallback, useEffect, useState } from "react";
import "./managePackage.scss";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import showToast from "../../util/showToast";
import PackageFilters from "./partials/PackageFilters/PackageFilters";
import PackageTable from "./partials/PackageTable/PackageTable";
import Pagination from "./partials/Pagination/Pagination";
import { sPackages, sPagination, sUserAndPackages } from "./managePackageStore";
import PackageTableSkeleton from "./partials/PackageTable/PackageTableSkeleton";
import AddPackageModal from "./partials/AddPackageModal/AddPackageModal";
import EditPackageModal from "./partials/EditPackageModal/EditPackageModal";
import PackageList from "./partials/PackageList/PackageList";
import debounce from "lodash.debounce";

export default function ManagePackages() {
  const packages = sPackages.use();
  const usersAndPackages = sUserAndPackages.use();
  const pagination = sPagination.use();
  const [users, setUsers] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  const { isLoading, response, error, callApi } = useApi({
    method: "GET",
  });

  const {
    isLoading: getUserAndPackageLoading,
    response: getUserAndPackageResponse,
    error: getUserAndPackageError,
    callApi: getUserAndPackageCallApi,
  } = useApi({
    method: "GET",
  });

  const { response: getUsersResponse, callApi: getUsersCallApi } = useApi({
    url: API_URLS.USER.GET_USERS_LIST,
    method: "GET",
  });

  useEffect(() => {
    getUsersCallApi();
    fetchPackages();
    fetchUsersAndPackages(pagination.currentPage, pagination.itemsPerPage);
    return () => {
      sPagination.reset();
    };
  }, []);

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "successful") {
        const packages = response.data || {};
        if (packages) {
          sPackages.set(packages);
        }
      }
    };

    const handleError = () => {
      if (error?.message) {
        showToast({
          icon: "error",
          text: error?.message,
          targetElement: document.querySelector(".content-wrapper"),
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
    const handleApiResponse = () => {
      if (getUserAndPackageResponse?.status === "successful") {
        const usersAndPackages = getUserAndPackageResponse.data || {};
        const pagination = getUserAndPackageResponse.pagination || {};
        if (usersAndPackages) {
          sUserAndPackages.set(usersAndPackages);
          sPagination.set((prev) => {
            prev.value.totalPages = pagination.lastVisiblePage;
            prev.value.totalItems = pagination.total;
          });
        }
      }
    };

    const handleError = () => {
      if (getUserAndPackageError?.message) {
        showToast({
          icon: "error",
          text: getUserAndPackageError?.message,
          targetElement: document.querySelector(".content-wrapper"),
        });
      }
    };

    try {
      handleApiResponse();
      handleError();
    } catch (err) {
      console.error("Error handling API response:", err);
    }
  }, [getUserAndPackageResponse, getUserAndPackageError]);

  useEffect(() => {
    if (getUsersResponse?.status === "successful") {
      const users = getUsersResponse.data || [];

      if (users) {
        setUsers(users);
      }
    }
  }, [getUsersResponse]);

  const fetchPackages = () => {
    const customUrl = `${
      API_URLS.MEMBERSHIP_PACKAGE.GET
    }?pageNumber=${1}&pageSize=${999}`;
    callApi(null, customUrl);
  };

  const fetchUsersAndPackages = (
    page,
    pageSize,
    search = searchValue,
    packageId = selectedPackage
  ) => {
    let customUrl = `${API_URLS.USER.USERS_AND_MEMBERSHIP}?pageNumber=${page}&pageSize=${pageSize}`;

    if (search) {
      customUrl += `&userName=${encodeURIComponent(search)}`;
    }

    if (packageId) {
      customUrl += `&membershipPackageId=${packageId}`;
    }

    getUserAndPackageCallApi(null, customUrl);
  };

  const handlePageChange = (page) => {
    sPagination.set((prev) => {
      prev.value.currentPage = page;
    });

    fetchUsersAndPackages(page, pagination.itemsPerPage);
  };

  const debouncedSearch = useCallback(
    debounce((search) => {
      fetchUsersAndPackages(
        pagination.currentPage,
        pagination.itemsPerPage,
        search
      );
    }, 500),
    []
  );

  useEffect(() => {
    if (searchValue) {
      debouncedSearch(searchValue);
    } else {
      fetchUsersAndPackages(pagination.currentPage, pagination.itemsPerPage);
    }
  }, [searchValue, selectedPackage]);

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
          usersAndPackages={usersAndPackages}
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
                <PackageFilters
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  selectedPackage={selectedPackage}
                  setSelectedPackage={setSelectedPackage}
                  packages={packages}
                  onFetchUsersAndPackages={fetchUsersAndPackages}
                />
                {getUserAndPackageLoading ? (
                  <>
                    <PackageTableSkeleton />
                  </>
                ) : (
                  <>
                    <PackageTable
                      usersAndPackages={usersAndPackages}
                      onFetchUsersAndPackages={fetchUsersAndPackages}
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
        <EditPackageModal users={users} onFetchPackages={fetchPackages} />
      </div>
    </>
  );
}
