import React from "react";

import { useOutletContext } from "react-router";
import splitName from "../../util/splitName";
import ProfileContent from "./partials/ProfileContent/ProfileContent";
import API_URLS from "../../config/apiUrls";

export default function Profile() {
  const { response, callApi } = useOutletContext();
  const nameParts = [];

  if (response != null) {
    nameParts.push(...splitName(response.data.fullName));

    console.log(nameParts);
  }

  return (
    <>
      <ProfileContent
        response={response}
        callApi={callApi}
        nameParts={nameParts}
        apiUrl={API_URLS.USER.UPDATE_CURRENT_USER}
      />
    </>
  );
}
