import React, { useEffect } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import showToast from "../../../../util/showToast";
import { sPackages } from "../../managePackageStore";
import PackageActionsSkeleton from "./PackageActionSkeleton";

export default function PackageActions({ packageId }) {
  const { isLoading, response, error, callApi } = useApi({
    method: "DELETE",
  });

  const {
    isLoading: getPackagesLoading,
    response: getPackageResponse,
    error: getPackageError,
    callApi: getPackageCallApi,
  } = useApi({
    url: API_URLS.MEMBERSHIP_PACKAGE.GET,
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
      if (getPackageResponse?.status === "success") {
        const packages = getPackageResponse.data || {};
        if (packages) {
          sPackages.set(packages);
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
          <i
            className="btn btn-icon delete-record"
            onClick={() => handleDelete(packageId)}
          >
            <i className="icon-base bx bx-trash icon-md"></i>
          </i>
          <a href="app-user-view-account.html" className="btn btn-icon">
            <i className="icon-base bx bx-show icon-md"></i>
          </a>
          <a
            href="javascript:;"
            className="btn btn-icon dropdown-toggle hide-arrow"
            data-bs-toggle="dropdown"
          >
            <i className="icon-base bx bx-dots-vertical-rounded icon-md"></i>
          </a>
        </>
      )}
      <div className="dropdown-menu dropdown-menu-end m-0">
        <a href="javascript:;" className="dropdown-item">
          Edit
        </a>
        <a href="javascript:;" className="dropdown-item">
          Suspend
        </a>
      </div>
    </>
  );
}
