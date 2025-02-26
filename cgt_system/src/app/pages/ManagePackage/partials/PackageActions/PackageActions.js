import React, { useEffect } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import showToast from "../../../../util/showToast";
import { sPackages, sPagination } from "../../managePackageStore";
import PackageActionsSkeleton from "./PackageActionSkeleton";

export default function PackageActions({ packageId }) {
  const pagination = sPagination.use();
  const { isLoading, response, error, callApi } = useApi({
    method: "DELETE",
  });

  const {
    isLoading: getPackagesLoading,
    response: getPackageResponse,
    error: getPackageError,
    callApi: getPackageCallApi,
  } = useApi({
    url: `${API_URLS.MEMBERSHIP_PACKAGE.GET}?pageNumber=${pagination.currentPage}&pageSize=${pagination.itemsPerPage}`,
    method: "GET",
  });

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "success") {
        showToast({
          icon: "success",
          text: "Package deleted successfully",
          targetElement: document.querySelector(".card"),
        });
        getPackageCallApi();
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
    const handleApiResponse = () => {
      if (getPackageResponse?.status === "successful") {
        const packages = getPackageResponse.data || {};
        const pagination = getPackageResponse.pagination || {};
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
      if (getPackageError?.message) {
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
  }, [getPackageResponse, getPackageError]);

  const handleDelete = (id) => {
    const customUrl = `${API_URLS.MEMBERSHIP_PACKAGE.DELETE}/${id}`;
    callApi(null, customUrl);
  };

  return (
    <>
      {isLoading || getPackagesLoading ? (
        <PackageActionsSkeleton />
      ) : (
        <>
          <button
            className="btn btn-icon me-1"
            data-bs-target="#editPermissionModal"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
          >
            <i className="icon-base bx bx-edit icon-md"></i>
          </button>
          <i
            className="btn btn-icon delete-record"
            onClick={() => handleDelete(packageId)}
          >
            <i className="icon-base bx bx-trash icon-md"></i>
          </i>
        </>
      )}
    </>
  );
}
