import React from "react";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";

export default function RemoveIndicators({ refetch, indicatorId }) {
  const { callApi } = useApi({
    url: `${API_URLS.INDICATORS.INDICATORS}/${indicatorId}`,
    method: "DELETE",
  });

  const handleRemove = async (e) => {
    e.preventDefault();
    await callApi();
    refetch();
  };
  return (
    <i
      className="icon-base bx bx-trash icon-md"
      style={{ color: "#B22222" }}
      onClick={(e) => handleRemove(e)}
      role="button"
    ></i>
  );
}
