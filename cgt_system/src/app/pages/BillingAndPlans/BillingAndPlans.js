import React, { useEffect, useState } from "react";
import CurrentPlanInfo from "./partials/CurrentPlanInfo/CurrentPlanInfo";
import useApi from "../../hooks/useApi";
import API_URLS from "../../config/apiUrls";
import showToast from "../../util/showToast";
import CurrentPlanInfoSkeleton from "./partials/CurrentPlanInfo/CurrentPlanInfoSkeleton";
import BillingFilters from "./partials/BillingHistory/BillingFilters";
import PackageTableSkeleton from "../ManagePackage/partials/PackageTable/PackageTableSkeleton";
import BillingTable from "./partials/BillingHistory/BillingTable";
import Pagination from "./partials/Pagination/Pagination";
import { sBillings, sPagination } from "./billingAndPlansStore";

export default function BillingAndPlans() {
  const billings = sBillings.use();
  const pagination = sPagination.use();

  const [currentPlan, setCurrentPlan] = useState(null);
  const { isLoading, response, error, callApi } = useApi({
    url: API_URLS.USER.MEMBERSHIP_PACKAGE.CURRENT,
    method: "GET",
  });

  const {
    isLoading: getPaymentHistoryLoading,
    response: getPaymentHistoryResponse,
    callApi: getPaymentHistoryCallApi,
  } = useApi({
    method: "GET",
  });

  useEffect(() => {
    callApi();
    fetchBillings(pagination.currentPage, pagination.itemsPerPage);
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

  useEffect(() => {
    const handleApiResponse = () => {
      if (getPaymentHistoryResponse?.status === "successful") {
        const billings = getPaymentHistoryResponse.data || {};
        const pagination = getPaymentHistoryResponse.pagination || {};
        if (billings) {
          sBillings.set(billings);
          sPagination.set((prev) => {
            prev.value.totalPages = pagination.lastVisiblePage;
            prev.value.totalItems = pagination.total;
          });
        }
      }
    };

    try {
      handleApiResponse();
    } catch (err) {
      console.error("Error handling API response:", err);
    }
  }, [getPaymentHistoryResponse]);

  const fetchBillings = (page, pageSize) => {
    const customUrl = `${API_URLS.USER.PAYMENT_HISTORY}?pageNumber=${page}&pageSize=${pageSize}`;
    getPaymentHistoryCallApi(null, customUrl);
  };

  const handlePageChange = (page) => {
    sPagination.set((prev) => {
      prev.value.currentPage = page;
    });
    fetchBillings(page, pagination.itemsPerPage);
  };

  return (
    <>
      {isLoading ? (
        <CurrentPlanInfoSkeleton />
      ) : (
        <>
          <CurrentPlanInfo currentPlan={currentPlan} />
          <div className="col-12">
            <div className="card">
              <div className="card-datatable">
                <div
                  id="DataTables_Table_0_wrapper"
                  className="dt-container dt-bootstrap5 dt-empty-footer"
                >
                  <BillingFilters onFetchBillings={fetchBillings} />
                  {getPaymentHistoryLoading ? (
                    <>
                      <PackageTableSkeleton />
                    </>
                  ) : (
                    <>
                      <BillingTable
                        billings={billings}
                        onFetchBillings={fetchBillings}
                      />
                    </>
                  )}
                  <Pagination
                    currentPage={pagination.currentPage}
                    itemsPerPage={pagination.itemsPerPage}
                    totalItems={pagination.totalItems}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
