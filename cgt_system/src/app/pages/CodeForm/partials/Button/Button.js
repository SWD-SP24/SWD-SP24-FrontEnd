import React, { useEffect } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import { sCode, sEmail } from "../../codeFormStore";
import { useNavigate } from "react-router";
import showToast from "../../../../util/showToast";

export default function Button({ buttonTag, otp, onSubmit }) {
  const { isLoading, response, error, callApi } = useApi({
    url: `${API_URLS.USER.FORGOT_PASSWORD.VALIDATE_RESET_CODE}`,
    method: "POST",
    body: { email: sEmail.value, code: otp },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "successful") {
        sCode.reset();
        navigate("/forgot-password/reset-password", {
          state: { email: sEmail.value, code: otp },
        });
      }
    };

    const handleError = () => {
      if (error?.message) {
        showToast("error", "", error?.message);
      }
    };

    try {
      handleApiResponse();
      handleError();
    } catch (err) {
      console.error("Error handling API response:", err);
    }
  }, [response, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit();

    if (otp.length < 6) return;

    callApi();
  };

  return (
    <button className="btn btn-primary d-grid w-100" onClick={handleSubmit}>
      {isLoading ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </>
      ) : (
        buttonTag
      )}
    </button>
  );
}
