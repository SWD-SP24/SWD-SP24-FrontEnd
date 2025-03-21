import React, { useEffect } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import { useNavigate } from "react-router";
import showToast from "../../../../util/showToast";

export default function CancelButton({ paymentTransactionId }) {
  // API hủy nâng cấp gói
  const { isLoading, response, error, callApi } = useApi({
    url: `${API_URLS.USER.CANCEL_BILLING}`,
    body: { paymentTransactionId: paymentTransactionId },
    method: "PATCH",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (response?.message === "Transaction canceled successfully") {
      showToast({
        icon: "success",
        title: "Plan Upgrade Cancellation Successful",
        text: "Your upgrade request has been canceled successfully.",
        showButtons: true,
        confirmText: "Back",
        cancelText: "",
        onConfirm: () => {
          navigate("/account-setting/billing-and-plans");
        },
        onCancle: null,
        disableOutsideClick: true,
        targetElement: document.getElementById("root"),
      });
    }
  }, [response]);

  useEffect(() => {
    if (error?.message) {
      showToast({
        icon: "error",
        text: error?.message,
        targetElement: document.querySelector(".card"),
      });
    }
  }, [error]);

  return (
    <button
      class="btn btn-label-danger cancel-upgrade"
      onClick={() => callApi()}
    >
      {isLoading ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </>
      ) : (
        "Cancel Upgrade"
      )}
    </button>
  );
}
