import React, { useEffect } from "react";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";
import { useNavigate } from "react-router";
import showToast from "../../../util/showToast";

export default function RemoveChildButton({ childId }) {
  const navigate = useNavigate();
  const { response, callApi } = useApi({
    url: `${API_URLS.CHILDREN.EDIT_CHILD}${childId}`,
    method: "PUT",
  });

  useEffect(() => {
    console.log("Remove child successfully");
  }, [response]);

  const handleRemove = async (e) => {
    e.preventDefault();
    const data = { status: 0 };
    await callApi(data);
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
