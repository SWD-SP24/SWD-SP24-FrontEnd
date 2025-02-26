import React, { useEffect } from "react";
import PackageActions from "../PackageActions/PackageActions";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import showToast from "../../../../util/showToast";
import { sPackages, sPagination } from "../../managePackageStore";
import Skeleton from "react-loading-skeleton";

export default function PackageRow({ packageItem }) {
  const pagination = sPagination.use();
  const { isLoading, response, error, callApi } = useApi({
    method: "PATCH",
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
        getPackageCallApi();
      }
    };

    const handleError = () => {
      if (error?.message) {
        showToast({
          icon: "warning",
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

  const handleChangeStatus = () => {
    const customUrl = `${API_URLS.MEMBERSHIP_PACKAGE.PATCH}/${packageItem.membershipPackageId}/status`;
    const customBody = {
      status: packageItem.status === "active" ? "inactive" : "active",
    };
    callApi(customBody, customUrl);
  };

  return (
    <tr>
      <td className="sorting_1">
        <div className="d-flex justify-content-start align-items-center user-name">
          <div className="avatar-wrapper"></div>
          <div className="d-flex flex-column">
            <a
              href="app-user-view-account.html"
              className="text-heading text-truncate"
            >
              <span className="fw-medium">
                {packageItem.membershipPackageName}
              </span>
            </a>
          </div>
        </div>
      </td>
      <td>
        <span className="text-truncate d-flex align-items-center text-heading">
          {packageItem.price}
        </span>
      </td>
      <td>
        <span className="text-heading">{packageItem.validityPeriod}</span>
      </td>
      {isLoading || getPackagesLoading ? (
        <td>
          <Skeleton height={16.4} width={28.4} borderRadius={30} />
        </td>
      ) : (
        <td>
          <span className="text-truncate">
            <label className="switch switch-primary switch-sm">
              <input
                type="checkbox"
                className="switch-input"
                checked={packageItem.status === "active"}
                onChange={() => handleChangeStatus()}
              />
              <span className="switch-toggle-slider">
                <span className="switch-on"></span>
              </span>
            </label>
          </span>
        </td>
      )}
      <td>
        <div className="d-flex align-items-center">
          <PackageActions packageId={packageItem.membershipPackageId} />
        </div>
      </td>
    </tr>
  );
}
