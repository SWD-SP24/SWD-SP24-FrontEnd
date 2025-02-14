import React, { useEffect } from "react";
import Cookies from "js-cookie";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import { useNavigate } from "react-router";
import { sFormData, sFormError } from "../../loginStore";
import { validateField } from "../../schemas/loginSchema";
import showToast from "../../../../util/showToast";

export default function Button({ data, buttonTag }) {
  const formData = sFormData.use();
  const { isLoading, response, error, callApi } = useApi({
    url: `${API_URLS.AUTH.LOGIN}`,
    method: "POST",
    body: formData,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "successful") {
        const { token: authToken } = response.data || {};
        if (authToken) {
          Cookies.set("auth_token", authToken);
          navigate("/user-profile");
        }
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
  }, [response, error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);

    if (emailError || passwordError) {
      sFormError.set({ email: emailError, password: passwordError });
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
