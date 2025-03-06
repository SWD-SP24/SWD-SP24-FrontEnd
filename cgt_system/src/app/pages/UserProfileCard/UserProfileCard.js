import React from "react";
import UserProfile from "./partials/UserProfile/UserProfile";
import SubscriptionPlan from "./partials/SubscriptionPlan/SubscriptionPlan";

export default function UserProfileCard({ user }) {
  return (
    <div className="col-xl-4 col-lg-5 order-1 order-md-0">
      <UserProfile user={user} />
      <SubscriptionPlan />
    </div>
  );
}
