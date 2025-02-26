import React, { useEffect, useState } from "react";
import "./managePackage.scss";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import showToast from "../../util/showToast";
import PackageFilters from "./partials/PackageFilters/PackageFilters";
import PackageTable from "./partials/PackageTable/PackageTable";
import Pagination from "./partials/Pagination/Pagination";
import { sPackages, sPagination } from "./managePackageStore";
import PackageFiltersSkeleton from "./partials/PackageFilters/PackageFilterSkeleton";
import PackageTableSkeleton from "./partials/PackageTable/PackageTableSkeleton";
import PaginationSkeleton from "./partials/Pagination/PaginationSkeleton";
import AddPackageModal from "./partials/AddPackageModal/AddPackageModal";

export default function ManagePackages() {
  const packages = sPackages.use();
  const pagination = sPagination.use();

  const { isLoading, response, error, callApi } = useApi({
    method: "GET",
  });

  useEffect(() => {
    const customUrl = `${API_URLS.MEMBERSHIP_PACKAGE.GET}?pageNumber=${pagination.currentPage}&pageSize=${pagination.itemsPerPage}`;
    callApi(null, customUrl);

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
          sPagination.set((prev) => {
            prev.value.totalPages = response.pagination.lastVisiblePage;
            prev.value.totalItems = response.pagination.total;
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

  const handlePageChange = (page) => {
    sPagination.set((prev) => {
      prev.value.currentPage = page;
    });
    const customUrl = `${API_URLS.MEMBERSHIP_PACKAGE.GET}?pageNumber=${page}&pageSize=${pagination.itemsPerPage}`;
    callApi(null, customUrl);
  };

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
                <Pagination
                  currentPage={pagination.currentPage}
                  itemsPerPage={pagination.itemsPerPage}
                  totalItems={pagination.totalItems}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <AddPackageModal />
    </>
  );
}
