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

export default function ManagePackages() {
  const packages = sPackages.use();
  const pagination = sPagination.use();

  const { isLoading, response, error, callApi } = useApi({
    method: "GET",
  });

  useEffect(() => {
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
      <AddPackageModal />
      <EditPackageModal />
    </>
  );
}
