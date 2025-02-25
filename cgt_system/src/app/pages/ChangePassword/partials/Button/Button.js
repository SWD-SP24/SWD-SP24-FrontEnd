import React, { useEffect } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import { sFormData, sFormError } from "../../changePasswordStore";
import { useNavigate } from "react-router";
import { validateField } from "../../schemas/changePasswordSchema";
import showToast from "../../../../util/showToast";

export default function Button({ buttonTag, onReset, user }) {
  const formData = sFormData.use();
  const navigate = useNavigate();
  const isReset = buttonTag === "Reset";
  const redirectTo = user?.role === "member" ? "/login" : "/admin-doctor/login";

  const { isLoading, response, error, callApi } = useApi({
    url: `${API_URLS.USER.CHANGE_PASSWORD}`,
    method: "POST",
    body: {
      oldPassword: formData.oldPassword,
      newPassword: formData.password,
    },
  });

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "successful") {
        showToast({
          icon: "success",
          title: "Password Changed Successful",
          text: "Please log in with your new password.",
          showButtons: true,
          confirmText: "Go to Login",
          cancelText: "",
          onConfirm: () => navigate(redirectTo),
          onCancle: null,
          disableOutsideClick: true,
          targetElement: document.body,
        });
      }
    };

    const handleError = () => {
      if (error?.message) {
        const targetElement = document.querySelector(".card");
        showToast({
          icon: "error",
          text: error.message,
          targetElement: targetElement,
        });
      }
    };

    try {
      handleApiResponse();
      handleError();
    } catch (err) {
      console.error("Error handling API response:", err);
    }
  }, [response, error]);

  const handleSaveChange = (e) => {
    e.preventDefault();

    const oldPasswordError = validateField("oldPassword", formData.oldPassword);
    const passwordError = validateField("password", formData.password);
    const confirmPasswordError = validateField(
      "confirmPassword",
      formData.confirmPassword,
      formData.password
    );

    if (oldPasswordError || passwordError || confirmPasswordError) {
      sFormError.set({
        oldPassword: oldPasswordError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    callApi();
  };

  const handleReset = (e) => {
    e.preventDefault();

    onReset();
  };

  return (
    <button
      className={`btn ${isReset ? "btn-label-secondary" : "btn-primary me-3"}`}
      onClick={(e) => (isReset ? handleReset(e) : handleSaveChange(e))}
    >
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
