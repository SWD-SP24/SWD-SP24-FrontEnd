import React, { useEffect } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import showToast from "../../../../util/showToast";
import { sPackageIdToEdit, sPagination } from "../../managePackageStore";
import PackageActionsSkeleton from "./PackageActionSkeleton";

export default function PackageActions({ packageId, onFetchPackages }) {
  const pagination = sPagination.use();
  const { isLoading, response, error, callApi } = useApi({
    method: "DELETE",
  });

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "success") {
        showToast({
          icon: "success",
          text: "Package deleted successfully",
          targetElement: document.querySelector(".card"),
        });
        onFetchPackages(pagination.currentPage, pagination.itemsPerPage);
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

  const handleDelete = (id) => {
    const customUrl = `${API_URLS.MEMBERSHIP_PACKAGE.DELETE}/${id}`;
    callApi(null, customUrl);
  };

  return (
    <>
      {isLoading ? (
        <PackageActionsSkeleton />
      ) : (
        <>
          <button
            className="btn btn-icon me-1"
            data-bs-target="#editPackageModal"
            data-bs-toggle="modal"
            onClick={() => sPackageIdToEdit.set(packageId)}
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
