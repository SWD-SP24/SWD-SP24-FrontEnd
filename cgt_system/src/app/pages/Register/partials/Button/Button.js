import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { sFormData, sFormError } from "../../registerStore";
import { validateField } from "../../schemas/registerShema";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import showToast from "../../../../util/showToast";
import { useNavigate } from "react-router";

export default function Button({ data, buttonTag }) {
  const formData = sFormData.use();
  const navigate = useNavigate();

  const { isLoading, response, error, callApi } = useApi({
    url: `${API_URLS.AUTH.REGISTER}`,
    method: "POST",
    body: { email: formData.email, password: formData.password },
  });

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "successful") {
        const { token: authToken } = response.data || {};
        if (authToken) {
          console.log(authToken);
          Cookies.set("auth_token", authToken);
          navigate("/welcome");
        }
      }
    };

    const handleError = () => {
      if (error?.message) {
        showToast({ icon: "error", text: error.message });
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

    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);
    const confirmPasswordError = validateField(
      "confirmPassword",
      formData.confirmPassword,
      formData.password
    );
    const isAgreeError = validateField("isAgree", data.isAgree.current);

    if (emailError || passwordError || confirmPasswordError || isAgreeError) {
      sFormError.set({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        terms: isAgreeError,
      });
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
