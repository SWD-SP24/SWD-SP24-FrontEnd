import React, { useEffect } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import { sFormData, sFormError } from "../../managePackageStore";
import { validateField } from "../../schemas/managePackageSchema";
import showToast from "../../../../util/showToast";
import { Modal } from "bootstrap";
import { toast } from "react-toastify";

export default function Button({
  buttonTag,
  data,
  image,
  selectedPermissions,
  onFetchPackages,
}) {
  const formData = sFormData.use();

  const { isLoading, response, error, callApi } = useApi({
    method: buttonTag === "Submit" ? "POST" : "PUT",
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
    const handleApiResponse = async () => {
      if (response?.status === "success") {
        closeModal();
        onFetchPackages();
        toast.success("Membership Package Has Updated Successful!", {
          position: "top-right", // Vị trí hiển thị
          autoClose: 5000, // Đóng sau 5s
          hideProgressBar: false, // Hiển thị thanh tiến trình
          closeOnClick: true, // Đóng khi click vào
          pauseOnHover: true, // Tạm dừng khi hover
          draggable: true, // Có thể kéo được
          theme: "colored", // Chủ đề màu sắc
        });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const packageNameError = validateField("packageName", formData.packageName);
    const priceError = validateField("price", formData.price);
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
      permissionsError ||
      summaryError ||
      imageError
    ) {
      sFormError.set({
        packageName: packageNameError,
        price: priceError,
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
      validityPeriod: 30,
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
      {isLoading || getImageUrlLoading ? (
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
