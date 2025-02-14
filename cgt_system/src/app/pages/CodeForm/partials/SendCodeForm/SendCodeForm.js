import React, { useRef, useState } from "react";
import styles from "./sendCodeForm.module.scss";
import classNames from "classnames/bind";
import Button from "../Button/Button";
import { Link } from "react-router";
import ResendCodeLink from "../ResendCodeLink/ResendCodeLink";

const cx = classNames.bind(styles);

export default function SendCodeForm() {
  const otpRefs = useRef([]);
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [error, setError] = useState("");

  const handleChange = (index, event) => {
    const value = event.target.value.replace(/\D/, "");
    if (!value) return;

    setOtpValues((prev) => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });

    if (index < 5 && value) otpRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      setOtpValues((prev) => {
        const newOtp = [...prev];
        if (newOtp[index]) {
          newOtp[index] = "";
        } else if (index > 0) {
          otpRefs.current[index - 1]?.focus();
        }
        return newOtp;
      });
    }
  };

  const handleSubmit = () => {
    const otpString = otpValues.join("");
    if (otpString.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    setError("");
  };

  return (
    <form id="twoStepsForm">
      <div
        className={cx("mb-6 form-control-validation", {
          "fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid": error,
        })}
      >
        <div
          className={cx("auth-input-wrapper", "d-flex justify-content-between")}
        >
          {otpValues.map((value, index) => (
            <input
              key={index}
              type="tel"
              className={cx(
                "auth-input",
                "form-control h-px-50 text-center numeral-mask mx-sm-1 my-2"
              )}
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (otpRefs.current[index] = el)}
              autoFocus={index === 0}
            />
          ))}
        </div>
        <input type="hidden" className={error ? "is-invalid" : ""} />
        {error && (
          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
            <div data-field="otp" data-validator="notEmpty">
              {error}
            </div>
          </div>
        )}
      </div>
      <div className="d-flex flex-column align-items-center gap-2 mb-2">
        <Button
          buttonTag="Send reset code"
          otp={otpValues.join("")}
          onSubmit={handleSubmit}
        />
        <ResendCodeLink />
      </div>
    </form>
  );
}
