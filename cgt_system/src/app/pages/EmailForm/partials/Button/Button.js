import React, { useEffect } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import { useNavigate } from "react-router";
import { validateField } from "../../schemas/emailFormSchema";
import { sEmail, sEmailError } from "../../emailFormStore";
import showToast from "../../../../util/showToast";

export default function Button({ buttonTag }) {
  const email = sEmail.use();

  const { isLoading, response, error, callApi } = useApi({
    url: `${API_URLS.FORGOT_PASSWORD.SEND_RESET_CODE}`,
    method: "POST",
    body: { email: email },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "successful") {
        sEmail.reset();
        sEmailError.reset();
        navigate("/forgot-password/code", { state: { email } });
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

    const emailError = validateField("email", email);

    if (emailError) {
      sEmailError.set(emailError);
      return;
    }

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
