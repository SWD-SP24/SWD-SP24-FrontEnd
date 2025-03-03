import React, { useEffect } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import {
  sFormData,
  sFormError,
  sPackages,
  sPagination,
} from "../../managePackageStore";
import { validateField } from "../../schemas/managePackageSchema";
import showToast from "../../../../util/showToast";
import { Modal } from "bootstrap";

export default function Button({ buttonTag, data, selectedPermissions }) {
  const pagination = sPagination.use();
  const formData = sFormData.use();
  const { isLoading, response, error, callApi } = useApi({
    method: buttonTag === "Submit" ? "POST" : "PUT",
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
          text: "Membership package updated successfull !",
          targetElement: document.querySelector(".card"),
        });
        closeModal();
        getPackageCallApi();
      }
    };

    const handleError = () => {
      if (error?.message) {
        showToast({
          icon: "error",
          text: error.message,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const packageNameError = validateField("packageName", formData.packageName);
    const priceError = validateField("price", formData.price);
    const validityPeriodError = validateField(
      "validityPeriod",
      formData.validityPeriod
    );
    const permissionsError = validateField(
      "selectedPermissions",
      selectedPermissions
    );

    if (
      packageNameError ||
      priceError ||
      validityPeriodError ||
      permissionsError
    ) {
      sFormError.set({
        packageName: packageNameError,
        price: priceError,
        validityPeriod: validityPeriodError,
        permissions: permissionsError,
      });
      return;
    }

    const customUrl =
      buttonTag === "Submit"
        ? `${API_URLS.MEMBERSHIP_PACKAGE.POST}`
        : `${API_URLS.MEMBERSHIP_PACKAGE.PUT}/${data?.membershipPackageId}`;

    const customBody = {
      membershipPackageName: formData.packageName,
      price: formData.price,
      status: buttonTag === "Submit" ? "inactive" : data?.status,
      validityPeriod: formData.validityPeriod,
      permissions: selectedPermissions,
    };

    callApi(customBody, customUrl);
  };

  const closeModal = () => {
    const modalElement = document.getElementById(
      buttonTag === "Submit" ? "addRoleModal" : "editPackageModal"
    );
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        const newModalInstance = new Modal(modalElement);
        newModalInstance.hide();
      }
    }
  };

  return (
    <button className={"btn btn-primary me-sm-3 me-1"} onClick={handleSubmit}>
      {isLoading || getPackagesLoading ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </>
      ) : (
        buttonTag
      )}
    </button>
  );
}
