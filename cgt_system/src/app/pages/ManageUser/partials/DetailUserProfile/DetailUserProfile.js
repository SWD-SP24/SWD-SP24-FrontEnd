import React, { useEffect } from "react";
import { useParams } from "react-router";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import ProfileContent from "../../../Profile/partials/ProfileContent/ProfileContent";
import splitName from "../../../../util/splitName.js";
export default function DetailUserProfile() {
  const id = useParams().id;
  const apiUrl = `${API_URLS.USER.USER_WITH_ID}${id}`;
  const { isLoading, response, callApi } = useApi({
    url: apiUrl,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);

  if (isLoading) {
    return (
      <div
        className="container-xxl flex-grow-1 container-p-y d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <span
          className="spinner-border spinner-border-lg text-primary"
          role="status"
          style={{
            width: "3rem",
            height: "3rem",
            borderWidth: "0.5rem",
          }}
        ></span>
      </div>
    );
  }

  const nameParts = [];

  if (response != null) {
    nameParts.push(...splitName(response.data.fullName));

    console.log(nameParts);
  }

  return (
    <ProfileContent
      response={response}
      nameParts={nameParts}
      refetch={callApi}
      apiUrl={apiUrl}
    />
  );
}
