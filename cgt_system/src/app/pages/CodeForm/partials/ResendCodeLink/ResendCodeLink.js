import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { sEmail } from "../../codeFormStore";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import showToast from "../../../../util/showToast";

export default function ResendCodeLink() {
  const [countdown, setCountdown] = useState(60);
  const { isLoading, response, error, callApi } = useApi({
    url: `${API_URLS.USER.FORGOT_PASSWORD.SEND_RESET_CODE}`,
    method: "POST",
    body: { email: sEmail.value },
  });

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    const handleApiResponse = () => {
      if (response?.status === "successful") {
        setCountdown(60);
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

    if (countdown > 0) return;

    callApi();
  };

  return (
    <div className="text-center">
      Didn't get the code?
      <Link
        onClick={handleSubmit}
        className="ms-1 text-primary text-decoration-none"
      >
        {isLoading
          ? "Resending..."
          : countdown > 0
          ? `Resend in ${countdown}s`
          : "Resend"}
      </Link>
    </div>
  );
}
