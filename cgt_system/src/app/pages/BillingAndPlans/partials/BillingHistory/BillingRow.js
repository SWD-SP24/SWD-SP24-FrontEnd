import React from "react";

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
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <tr>
      <td>
        <div>#{index + 1}</div>
      </td>
      <td>
        <div class="d-flex justify-content-start align-items-center">
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
        <span
          class={`badge bg-label-${getStatusColor(
            billingItem.status
          )} text-capitalized`}
        >
          {billingItem.status.toUpperCase()}
        </span>
      </td>
    </tr>
  );
}
