import React, { useEffect } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import { sFormData, sFormError } from "../../resetPasswordStore";
import { useNavigate } from "react-router";
import { validateField } from "../../schemas/resetPasswordFormSchema";
import showToast from "../../../../util/showToast";

export default function Button({ buttonTag }) {
  const formData = sFormData.use();
  const navigate = useNavigate();

  const { isLoading, response, error, callApi } = useApi({
    url: `${API_URLS.USER.FORGOT_PASSWORD.RESET_PASSWORD}`,
    method: "POST",
    body: {
      email: formData.email,
      code: formData.code,
      newPassword: formData.password,
    },
  });

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "successful") {
        showToast({
          icon: "success",
          title: "Password Reset Successful",
          text: "You can now log in with your new password.",
          showButtons: true,
          confirmText: "Go to Login",
          cancelText: "Cancel",
          onConfirm: () => navigate("/login"),
        });
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

    const passwordError = validateField("password", formData.password);
    const confirmPasswordError = validateField(
      "confirmPassword",
      formData.confirmPassword,
      formData.password
    );

    if (passwordError || confirmPasswordError) {
      sFormError.set({
        password: passwordError,
        confirmPassword: confirmPasswordError,
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
