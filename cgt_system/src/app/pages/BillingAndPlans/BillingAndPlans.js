import React, { useEffect, useState } from "react";
import CurrentPlanInfo from "./partials/CurrentPlanInfo/CurrentPlanInfo";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import showToast from "../../util/showToast";

export default function BillingAndPlans() {
  const [currentPlan, setCurrentPlan] = useState(null);
  const { response, error, callApi } = useApi({
    url: API_URLS.USER.MEMBERSHIP_PACKAGE.CURRENT,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response) {
      const currentPlan = response || {};
      if (currentPlan) {
        setCurrentPlan(currentPlan || {});
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

  return (
    <>
      <CurrentPlanInfo currentPlan={currentPlan} />
    </>
  );
}
