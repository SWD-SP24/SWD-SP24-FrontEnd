import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import showToast from "../../util/showToast";
import UpgradePlan from "./partials/UpgradePlan/UpgradePlan";
import UpgradePlanSkeleton from "./partials/UpgradePlan/UpgradePlanSkeleton";
import Summary from "./partials/Summary/Summary";
import SummarySkeleton from "./partials/Summary/SummarySkeleton";
import useUser from "../../hooks/useUser";
import CancelUpgradeModal from "./partials/CancelUpgradeModal/CancelUpgradeModal";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const { user } = useUser();
  const navigate = useNavigate();

  // Lấy id gói và loại gói theo tháng hoặc năm từ URL
  const planId = searchParams.get("planId");
  const isYearly = searchParams.get("isYearly") === "true";

  const [checkoutInfo, setCheckoutInfo] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [pendingInfo, setPendingInfo] = useState(null);

  // Danh sách các planId hợp lệ
  const validPlanIds = [1, 2, 3];

  // API lấy thông tin checkout
  const { isLoading, response, error, callApi } = useApi({
    url: `${
      API_URLS.UPGRADE_MEMBERSHIP_PACKAGE.CHECKOUT
    }/${planId}?paymentType=${isYearly ? "yearly" : "monthly"}`,
    method: "GET",
  });

  // API lấy thông tin các gói đang chờ thanh toán
  const {
    response: pendingOrderResponse,
    error: pendingOrderError,
    callApi: checkPendingOrder,
  } = useApi({
    url: API_URLS.USER.GET_PENDING_BILLING,
    method: "GET",
  });

  // Kiểm tra điều kiện hợp lệ trước khi tiến hành checkout
  useEffect(() => {
    if (
      !planId ||
      isNaN(planId) ||
      !validPlanIds.includes(Number(planId)) ||
      (searchParams.get("isYearly") !== "true" &&
        searchParams.get("isYearly") !== "false")
    ) {
      navigate(-1);
      return;
    }

    const currentPlanId = user?.membershipPackageId;

    if (planId <= currentPlanId) {
      navigate(-1);
      return;
    }
    // Nếu hợp lệ gọi api lấy thông tin các gói đang chờ thanh toán
    setIsValid(false);
    checkPendingOrder();
  }, [planId, isYearly, user, navigate]);

  useEffect(() => {
    // Nếu có gói đang chờ thanh toán
    if (pendingOrderResponse && pendingOrderResponse?.length > 0) {
      const pendingBillingId = pendingOrderResponse[0]?.membershipPackageId;
      const isYearlyResponse =
        pendingOrderResponse[0]?.paymentType === "yearly";

      // Kiểm tra xem nếu không phải gói đang chọn thì return
      if (
        pendingBillingId !== Number(planId) ||
        isYearlyResponse !== isYearly
      ) {
        navigate(-1);
        return;
      }
    }

    // Nếu là gói đang chọn thì hợp lệ
    setPendingInfo(pendingOrderResponse);
    setIsValid(true);
  }, [pendingOrderResponse]);

  useEffect(() => {
    setIsValid(true);
  }, [pendingOrderError]);

  // Nếu hợp lệ thì gọi api lấy thông tin checkout
  useEffect(() => {
    if (isValid) {
      callApi();
    }
  }, [isValid]);

  // Set thông tin checkout
  useEffect(() => {
    if (response) {
      const checkoutInfo = response || {};
      if (checkoutInfo) {
        setCheckoutInfo(checkoutInfo || {});
      }
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

  function formatDate(isoString) {
    const date = new Date(isoString + "Z");
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Ho_Chi_Minh",
    });
  }

  // Nếu không hợp lệ thì không render UI
  if (!isValid) return null;

  return (
    <>
      <div className="row p-3">
        {isLoading ? (
          <>
            <UpgradePlanSkeleton />
            <SummarySkeleton />
          </>
        ) : (
          checkoutInfo && (
            <>
              {pendingInfo && (
                <div
                  class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 row-gap-4"
                  style={{ padding: "22px 14px 12px 14px" }}
                >
                  <div class="d-flex flex-column justify-content-center">
                    <div class="mb-1">
                      <span class="h5">
                        Upgrade #{pendingInfo[0].paymentTransactionId}
                      </span>
                      <span class="badge bg-label-warning me-1 ms-2">
                        Pending
                      </span>
                      <span class="badge bg-label-info">Ready to Activate</span>
                    </div>
                    <p class="mb-0">
                      Requested on: {formatDate(pendingInfo[0].transactionDate)}
                    </p>
                  </div>
                  <div class="d-flex align-content-center flex-wrap gap-2">
                    <button
                      class="btn btn-label-danger cancel-upgrade"
                      data-bs-toggle="modal"
                      data-bs-target="#cancelModal"
                    >
                      Cancel Upgrade
                    </button>
                  </div>
                </div>
              )}

              <div className="d-flex gap-6">
                <UpgradePlan checkoutInfo={checkoutInfo} isYearly={isYearly} />
                <Summary checkoutInfo={checkoutInfo} isYearly={isYearly} />
              </div>
            </>
          )
        )}
      </div>
      {pendingInfo && (
        <CancelUpgradeModal
          paymentTransactionId={pendingInfo[0].paymentTransactionId}
        />
      )}
    </>
  );
}
