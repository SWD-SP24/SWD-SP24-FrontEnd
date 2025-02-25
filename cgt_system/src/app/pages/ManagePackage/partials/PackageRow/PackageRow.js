import React from "react";
import PackageActions from "../PackageActions/PackageActions";

export default function PackageRow({ packageItem }) {
  return (
    <tr>
      <td className="sorting_1">
        <div className="d-flex justify-content-start align-items-center user-name">
          <div className="avatar-wrapper"></div>
          <div className="d-flex flex-column">
            <a
              href="app-user-view-account.html"
              className="text-heading text-truncate"
            >
              <span className="fw-medium">
                {packageItem.membershipPackageName}
              </span>
            </a>
          </div>
        </div>
      </td>
      <td>
        <span className="text-truncate d-flex align-items-center text-heading">
          {packageItem.price}
        </span>
      </td>
      <td>
        <span className="text-heading">{packageItem.validityPeriod}</span>
      </td>
      <td>
        <span className="text-truncate">
          <label className="switch switch-primary switch-sm">
            <input
              type="checkbox"
              className="switch-input"
              checked={packageItem.status === "active"}
              readOnly
            />
            <span className="switch-toggle-slider">
              <span className="switch-on"></span>
            </span>
          </label>
          <span className="d-none">In_Stock</span>
        </span>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <PackageActions packageId={packageItem.membershipPackageId} />
        </div>
      </td>
    </tr>
  );
}
