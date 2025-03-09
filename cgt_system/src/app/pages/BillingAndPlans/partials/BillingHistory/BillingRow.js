import React from "react";
import { Link } from "react-router";
import default_avatar from "../../../../assets/img/avatars/default-avatar.jpg";

export default function BillingRow({ index, billingItem }) {
  console.log(billingItem);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
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
        <span class="badge bg-label-success text-capitalized"> Paid </span>
      </td>
    </tr>
  );
}
