import { useEffect, useState } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import showToast from "../../../../util/showToast";
import { useNavigate } from "react-router";
import { Modal } from "bootstrap";

const CancelUpgradeModal = ({ paymentTransactionId }) => {
  // API hủy nâng cấp gói
  const { isLoading, response, error, callApi } = useApi({
    url: `${API_URLS.USER.CANCEL_BILLING}`,
    body: { paymentTransactionId: paymentTransactionId },
    method: "PATCH",
  });

  const navigate = useNavigate();
  const reasons = [
    "Too expensive",
    "Found a better alternative",
    "Not needed anymore",
    "Upgrading later",
    "Other (please specify)",
  ];
  const [selectedReason, setSelectedReason] = useState(reasons[0]);

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

  const handleCancel = async () => {
    await callApi();

    const modalElement = document.getElementById("cancelModal");
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  return (
    <div
      className="modal fade"
      id="cancelModal"
      tabIndex="-1"
      aria-modal="true"
      role="dialog"
      style={{ display: "none" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-pricing modal-simple modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>

            <h4 className="text-center mb-2">Cancel Upgrade Plan</h4>
            <p>Please let us know why you are canceling your upgrade:</p>
            <div className="mb-3">
              {reasons.map((reason, index) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={`reason-${index}`}
                    name="cancelReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`reason-${index}`}
                  >
                    {reason}
                  </label>
                </div>
              ))}
            </div>
            {selectedReason === "Other (please specify)" && (
              <textarea
                className="form-control mt-2"
                placeholder="Please specify your reason"
                onChange={(e) => setSelectedReason(e.target.value)}
              ></textarea>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-label-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              id="cancelButton"
              type="button"
              className="btn btn-danger"
              onClick={() => handleCancel()}
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
                "Confirm Cancellation"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelUpgradeModal;
