import React, { useEffect } from "react";
import PackageActions from "../PackageActions/PackageActions";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import showToast from "../../../../util/showToast";
import { sPagination } from "../../managePackageStore";
import Skeleton from "react-loading-skeleton";

export default function PackageRow({ packageItem, onFetchPackages }) {
  const pagination = sPagination.use();
  const { isLoading, response, error, callApi } = useApi({
    method: "PATCH",
  });

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "success") {
        onFetchPackages(pagination.currentPage, pagination.itemsPerPage);
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

  const handleChangeStatus = () => {
    const customUrl = `${API_URLS.MEMBERSHIP_PACKAGE.PATCH}/${packageItem.membershipPackageId}/status`;
    const customBody = {
      status: packageItem.status === "active" ? "inactive" : "active",
    };
    callApi(customBody, customUrl);
  };

  return (
    <tr>
      <td class="sorting_1">
        <div class="d-flex justify-content-left align-items-center">
          <div class="avatar-wrapper">
            <div class="avatar avatar-sm me-4">
              <img
                src={packageItem.image}
                alt="Avatar"
                class="rounded-circle"
              />
            </div>
          </div>
          <div class="d-flex flex-column">
            <a
              href="app-user-view-account.html"
              class="text-heading text-truncate"
            >
              <span class="fw-medium">{packageItem.membershipPackageName}</span>
            </a>
          </div>
        </div>
      </td>
      <td className="dt-type-numeric">
        <span className="text-truncate d-flex align-items-center text-heading">
          $
          {packageItem.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </td>
      <td>
        <span className="text-heading">
          {packageItem.validityPeriod.toLocaleString("en-US")} days
        </span>
      </td>
      {isLoading ? (
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
          <PackageActions
            packageId={packageItem.membershipPackageId}
            onFetchPackages={onFetchPackages}
          />
        </div>
      </td>
    </tr>
  );
}
