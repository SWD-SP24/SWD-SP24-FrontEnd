import React, { useEffect, useState } from "react";
import "./managePackage.scss";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import showToast from "../../util/showToast";
import PackageFilters from "./partials/PackageFilters/PackageFilters";
import PackageTable from "./partials/PackageTable/PackageTable";
import Pagination from "./partials/Pagination/Pagination";
import { sPackages } from "./managePackageStore";
import PackageFiltersSkeleton from "./partials/PackageFilters/PackageFilterSkeleton";
import PackageTableSkeleton from "./partials/PackageTable/PackageTableSkeleton";
import PaginationSkeleton from "./partials/Pagination/PaginationSkeleton";
import AddPackageModal from "./partials/AddPackageModal/AddPackageModal";

export default function ManagePackages() {
  const packages = sPackages.use();

  const { isLoading, response, error, callApi } = useApi({
    url: `${API_URLS.MEMBERSHIP_PACKAGE.GET}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "success") {
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

  return (
    <>
      <div className="card">
        <div className="card-datatable">
          <div
            id="DataTables_Table_0_wrapper"
            className="dt-container dt-bootstrap5 dt-empty-footer"
          >
            {isLoading ? (
              <>
                <PackageFiltersSkeleton />
                <PackageTableSkeleton />
                <PaginationSkeleton />
              </>
            ) : (
              <>
                <PackageFilters />
                <PackageTable packages={packages} />
                <Pagination />
              </>
            )}
          </div>
        </div>
      </div>
      <AddPackageModal />
    </>
  );
}
