import React, { useEffect } from "react";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";
import { useNavigate } from "react-router";
import showToast from "../../../util/showToast";

export default function RemoveChildButton({ childId }) {
  const navigate = useNavigate();
  const { response, callApi } = useApi({
    url: `${API_URLS.CHILDREN.DELETE_CHILD}${childId}`,
    method: "DELETE",
  });

  useEffect(() => {
    console.log("Remove child successfully");
  }, [response]);

  const handleRemove = async (e) => {
    e.preventDefault();
    await callApi();
    let target = document.querySelector(".content-wrapper");
    showToast({
      icon: "success",
      text: "Remove Child successfully",
      targetElement: target,
    });
    navigate("/member/children");
  };
  return (
    <button
      class="btn btn-label-danger suspend-user"
      onClick={(e) => handleRemove(e)}
    >
      Remove
    </button>
  );
}
