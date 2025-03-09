import React from "react";
import useApi from "../../../hooks/useApi";
import API_URLS from "../../../config/apiUrls";
import { useNavigate } from "react-router";

export default function ActionButton({ childId, refetch }) {
  const apiUrl = `${API_URLS.CHILDREN.EDIT_CHILD}${childId}`;
  const { response, callApi } = useApi({
    url: apiUrl,
    method: "PUT",
  });

  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`${childId}`);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    const data = {
      status: 0,
    };
    await callApi(data);
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
      <i
        className="btn btn-icon delete-record"
        onClick={(e) => handleDelete(e)}
      >
        <i
          className="icon-base bx bx-trash icon-md"
          style={{ color: "#B22222" }}
        ></i>
      </i>
    </div>
  );
}
