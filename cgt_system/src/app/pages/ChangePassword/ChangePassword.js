import React from "react";
import ChangePasswordForm from "./partials/ChangePasswordForm/ChangePasswordForm";
import { useOutletContext } from "react-router";

export default function ChangePassword() {
  const { user } = useOutletContext();

  return (
    <div className="card mb-6">
      <h5 className="card-header">Change Password</h5>
      <div className="card-body pt-1">
        <ChangePasswordForm user={user} />
      </div>
    </div>
  );
}
