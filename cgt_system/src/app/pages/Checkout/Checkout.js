import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import showToast from "../../util/showToast";
import UpgradePlan from "./partials/UpgradePlan/UpgradePlan";
import UpgradePlanSkeleton from "./partials/UpgradePlan/UpgradePlanSkeleton";
import Summary from "./partials/Summary/Summary";
import SummarySkeleton from "./partials/Summary/SummarySkeleton";

export default function Checkout() {
  const location = useLocation();
  const { planId, isYearly } = location.state || {};
  const [checkoutInfo, setCheckoutInfo] = useState(null);

  const { isLoading, response, error, callApi } = useApi({
    url: `${
      API_URLS.UPGRADE_MEMBERSHIP_PACKAGE.CHECKOUT
    }/${planId}?paymentType=${isYearly ? "yearly" : "monthly"}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    callApi();
  }, [isYearly]);

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

  if (isLoading)
    return (
      <>
        <div className="card px-3">
          <div className="row">
            <UpgradePlanSkeleton />
            <SummarySkeleton />
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="card px-3">
        <div className="row">
          <UpgradePlan checkoutInfo={checkoutInfo} isYearly={isYearly} />
          <Summary checkoutInfo={checkoutInfo} isYearly={isYearly} />
        </div>
      </div>
    </>
  );
}
