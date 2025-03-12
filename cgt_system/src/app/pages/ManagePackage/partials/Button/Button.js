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

export default function Button({
  buttonTag,
  data,
  image,
  selectedPermissions,
  users,
}) {
  const pagination = sPagination.use();
  const formData = sFormData.use();
  const usersUse = users?.filter(
    (user) => user.membershipPackageId === data?.membershipPackageId
  );

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

  const {
    isLoading: getImageUrlLoading,
    response: getImageUrlResponse,
    error: getImageUrlError,
    callApi: getImageUrlCallApi,
  } = useApi({
    url: API_URLS.IMAGE.GET_URL,
    method: "POST",
  });

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "success") {
        closeModal();
        getPackageCallApi();
      }
    };

    const handleError = () => {
      if (error?.message) {
        showToast({
          icon: "error",
          text: error.message,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usersUse && usersUse.length > 0) {
      showToast({
        icon: "warning",
        text: "This package is currently in use and cannot be deleted.",
        targetElement: document.querySelector(".content-wrapper"),
      });
      return;
    }

    const packageNameError = validateField("packageName", formData.packageName);
    const priceError = validateField("price", formData.price);
    const validityPeriodError = validateField(
      "validityPeriod",
      formData.validityPeriod
    );
    const summaryError = validateField("summary", formData.summary);

    const permissionsError = validateField(
      "selectedPermissions",
      selectedPermissions
    );

    const imageError =
      buttonTag === "Submit" ? validateField("image", image) : "";

    if (
      packageNameError ||
      priceError ||
      validityPeriodError ||
      permissionsError ||
      summaryError ||
      imageError
    ) {
      sFormError.set({
        packageName: packageNameError,
        price: priceError,
        validityPeriod: validityPeriodError,
        permissions: permissionsError,
        summary: summaryError,
        image: imageError,
      });
      return;
    }

    if (image === null) {
      handleUpdate(formData.image);
      return;
    }

    const data = new FormData();
    data.append("file", image);

    await getImageUrlCallApi(data);
  };

  useEffect(() => {
    if (getImageUrlResponse?.status === "successful") {
      const imageUrl = getImageUrlResponse.data.url || {};

      handleUpdate(imageUrl);
    }
  }, [getImageUrlResponse]);

  useEffect(() => {
    if (getImageUrlCallApi?.message) {
      showToast({
        icon: "error",
        text: getImageUrlError?.message,
        targetElement: document.querySelector(".card"),
      });
    }
  }, [getImageUrlError]);

  const handleUpdate = (imageUrl) => {
    const customUrl =
      buttonTag === "Submit"
        ? `${API_URLS.MEMBERSHIP_PACKAGE.POST}`
        : `${API_URLS.MEMBERSHIP_PACKAGE.PUT}/${data?.membershipPackageId}`;

    const customBody = {
      membershipPackageName: formData.packageName,
      summary: formData.summary,
      percentDiscount: formData.percentDiscount,
      image: imageUrl,
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
      {isLoading || getPackagesLoading || getImageUrlLoading ? (
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
