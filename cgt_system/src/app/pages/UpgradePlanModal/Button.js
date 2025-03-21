import React from "react";
import { useNavigate } from "react-router";
import showToast from "../../util/showToast";

export default function Button({
  pendingBillings,
  activePlanIndex,
  index,
  user,
  pricingPlan,
  isAnnually,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (pendingBillings && pendingBillings.length > 0) {
      const pendingBillingId = pendingBillings[0]?.membershipPackageId;
      const isYearlyResponse = pendingBillings[0]?.paymentType === "yearly";

      // Kiểm tra xem nếu không phải gói đang chọn thì return
      if (
        pendingBillingId !== Number(pricingPlan.membershipPackageId) ||
        isYearlyResponse !== isAnnually
      ) {
        showToast({
          icon: "warning",
          title: "Pending Plan",
          text: "You have an ongoing plan upgrade that has not been paid yet. Please complete the payment before selecting a new plan.",
          showButtons: true,
          confirmText: "View Pending Plan",
          cancelText: "Cancel",
          onConfirm: () => {
            navigate(
              `/member/upgrade-plan/checkout?planId=${pendingBillingId}&isYearly=${isYearlyResponse}`
            );
          },
          onCancel: null,
          targetElement: document.getElementById("root"),
        });
        return;
      }
    }

    navigate(
      `/member/upgrade-plan/checkout?planId=${pricingPlan.membershipPackageId}&isYearly=${isAnnually}`
    );
  };

  return (
    <>
      <button
        type="button"
        className="d-grid btn btn-label-primary w-100"
        data-bs-dismiss="modal"
        disabled={
          (activePlanIndex !== -1 && index < activePlanIndex) ||
          user?.emailActivation === "unactivated"
        }
        onClick={
          activePlanIndex !== -1 && index < activePlanIndex
            ? undefined
            : () => handleClick()
        }
      >
        {pricingPlan.isActive ? "Your Current Plan" : "Upgrade"}
      </button>
    </>
  );
}
