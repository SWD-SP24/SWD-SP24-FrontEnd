import React from "react";
import useApi from "../../../hooks/useApi";
import API_URLS from "../../../config/apiUrls";
import { useNavigate } from "react-router";

export default function ActionButton({ childId, refetch }) {
  const apiUrl = `${API_URLS.CHILDREN.DELETE_CHILD}${childId}`;
  const { response, callApi } = useApi({
    url: apiUrl,
    method: "DELETE",
  });

  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`${childId}`);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(apiUrl);
    console.log("del");
    await callApi();
    refetch();
  };
  return (
    <div className="d-flex align-items-center">
      <a
        className="btn btn-icon"
        style={{ color: "#4C9AFF" }}
        onClick={() => handleViewDetail()}
      >
        <i className="icon-base bx bx-show icon-md"></i>
      </a>
      <i className="btn btn-icon delete-record" onClick={() => handleDelete()}>
        <i
          className="icon-base bx bx-trash icon-md"
          style={{ color: "#B22222" }}
        ></i>
      </i>
    </div>
  );
}
