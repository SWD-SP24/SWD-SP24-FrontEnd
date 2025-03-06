import React from "react";
import default_avt from "../../../../assets/img/avatars/default-avatar.jpg";

export default function UserProfile({ user }) {
  return (
    <div className="card mb-6">
      <div className="card-body pt-12">
        <div className="user-avatar-section d-flex align-items-center flex-column">
          <img
            className="img-fluid rounded mb-4"
            src={user.avatar ? user.avatar : default_avt}
            height="120"
            width="120"
            alt="User avatar"
          />
          <div className="user-info text-center">
            <h5>{user.fullName}</h5>
            <span className="badge bg-label-secondary">
              {{
                member: "Member",
                admin: "Admin",
                doctor: "Doctor",
              }[user.role] || ""}
            </span>
          </div>
        </div>
        <h5 className="pb-4 border-bottom mb-4">Details</h5>
        <div className="info-container">
          <ul className="list-unstyled mb-6">
            <li className="mb-2">
              <span className="h6">Email:</span>
              <span> {user.email || "Updating..."}</span>
            </li>
            <li className="mb-2">
              <span className="h6">Status:</span>
              <span>
                {" "}
                {{ active: "Active", inactive: "Inactive" }[user.status] ||
                  "Updating..."}
              </span>
            </li>
            <li className="mb-2">
              <span className="h6">Role:</span>
              <span>
                {" "}
                {{ member: "Member", admin: "Admin", doctor: "Doctor" }[
                  user.role
                ] || "Updating..."}
              </span>
            </li>
            <li className="mb-2">
              <span className="h6">Contact:</span>
              <span> {user.phoneNumber || "Updating..."}</span>
            </li>
            <li className="mb-2">
              <span className="h6">Country:</span>
              <span> {user.country || "Updating..."}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
