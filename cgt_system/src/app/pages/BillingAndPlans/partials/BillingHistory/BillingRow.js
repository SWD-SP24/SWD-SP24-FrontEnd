import React from "react";
import { Link } from "react-router";

export default function BillingRow({ index, billingItem }) {
  // Hàm format ngày, tháng, năm
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Hàm xác định màu sắc badge theo status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "success":
        return "success";
      case "cancel":
        return "secondary";
      case "failed":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <tr>
      <td>
        <div>#{billingItem.paymentTransactionId}</div>
      </td>
      <td>
        <div class="d-flex align-items-center justify-content-start">
          <td class="dt-type-numeric">
            <span class="d-none"></span>
            {billingItem.previousMembershipPackageName}
          </td>
        </div>
      </td>
      <td class="dt-type-numeric">
        <span class="d-none"></span>
        {billingItem.membershipPackage.membershipPackageName}
      </td>
      <td>
        <span class="d-none"></span>${billingItem.amount.toFixed(2)}
      </td>
      <td>
        <span class="d-none"></span>
        {formatDate(billingItem.transactionDate)}
      </td>
      <td>
        <h6
          class={`mb-0 align-items-center d-flex w-px-100 text-${getStatusColor(
            billingItem.status
          )}`}
        >
          <i class="icon-base bx bxs-circle icon-8px me-1"></i>
          {billingItem.status.charAt(0).toUpperCase() +
            billingItem.status.slice(1)}
        </h6>
      </td>
      {billingItem.status === "pending" ? (
        <td className="ps-0">
          <Link
            to={`/member/upgrade-plan/checkout?planId=${
              billingItem.membershipPackage.membershipPackageId
            }&isYearly=${
              billingItem.membershipPackage.price < billingItem.amount
            }`}
          >
            Pay now
          </Link>
        </td>
      ) : (
        <td></td>
      )}
    </tr>
  );
}
