import React from "react";
import { Link } from "react-router";
import default_avatar from "../../../../assets/img/avatars/default-avatar.jpg";

export default function PackageRow({ userAndPackageItem }) {
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
        <div>#{userAndPackageItem.userId}</div>
      </td>
      <td>
        <div class="d-flex justify-content-start align-items-center">
          <div class="avatar-wrapper">
            <div class="avatar avatar-sm me-3">
              <span class="avatar-initial rounded-circle bg-label-info">
                <img
                  src={userAndPackageItem.avatar || default_avatar}
                  alt="Avatar"
                  class="rounded-circle"
                />
              </span>
            </div>
          </div>
          <div class="d-flex flex-column">
            <div class="text-heading text-truncate">
              <span class="fw-medium">{userAndPackageItem.fullName}</span>
            </div>
            <small class="text-truncate">{userAndPackageItem.email}</small>
          </div>
        </div>
      </td>
      <td class="dt-type-numeric">
        <span class="d-none"></span>
        {userAndPackageItem.membershipPackage.membershipPackageName}
      </td>
      <td>
        <span class="d-none"></span>
        {formatDate(userAndPackageItem.startDate)}
      </td>
      <td>
        <span class="d-none"></span>
        {formatDate(userAndPackageItem.endDate)}
      </td>
      <td>
        <span class="badge bg-label-success text-capitalized"> Paid </span>
      </td>
    </tr>
  );
}
