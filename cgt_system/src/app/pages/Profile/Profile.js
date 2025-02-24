import React from "react";

import { useOutletContext } from "react-router";
import API_URLS from "../../config/apiUrls";
import ProfileContent from "./partials/ProfileContent/ProfileContent";

export default function Profile() {
  const { user, setUser } = useOutletContext();

  return (
    <>
      <ProfileContent
        user={user}
        setUser={setUser}
        apiUrl={API_URLS.USER.UPDATE_CURRENT_USER}
      />
    </>
  );
}
