import React, { useEffect } from "react";
import default_avt from "../../../../assets/img/avatars/default-avatar.jpg";
import { Link } from "react-router";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import showToast from "../../../../util/showToast";

export default function UserProfile({ user, callApiGetUser }) {
  const { isLoading, response, callApi } = useApi({
    url: `${API_URLS.USER.VERIFY_EMAIL}`,
    method: "POST",
  });

  useEffect(() => {
    if (response?.status === "successful") {
      showToast({
        icon: "success",
        title: "Verification email sent",
        text: "Please check your email for the activation link or contact support if you need help.",
        showButtons: true,
        confirmText: "Continue",
        cancelText: "",
        onConfirm: () => callApiGetUser(),
        onCancle: null,
        disableOutsideClick: true,
        targetElement: document.body,
      });
    }
  }, [response]);

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
            <h5 className="mb-1">{user.fullName}</h5>
            <span
              className={`d-flex align-items-center badge ${
                user.emailActivation === "unactivated"
                  ? "bg-label-secondary"
                  : "bg-label-success"
              }`}
            >
              <span
                class={`badge badge-center rounded-pill ${
                  user.emailActivation === "unactivated"
                    ? "text-bg-secondary"
                    : "text-bg-success"
                } me-1`}
                style={{ width: "13px", height: "13px" }}
              >
                <i
                  class={`icon-base bx ${
                    user.emailActivation === "unactivated" ? "bx-x" : "bx-check"
                  } `}
                ></i>
              </span>
              <p className="mb-0">
                {user.emailActivation === "unactivated"
                  ? "Not verified"
                  : "Verified"}
              </p>
            </span>
            {isLoading ? (
              <span
                className="spinner-border text-primary spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              user.emailActivation === "unactivated" && (
                <Link onClick={() => callApi()}>
                  <p className="mb-0 mt-1" style={{ fontSize: "13px" }}>
                    Verify now
                  </p>
                </Link>
              )
            )}
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
              <span className="h6">Address:</span>
              <span> {user.address || "Updating..."}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
