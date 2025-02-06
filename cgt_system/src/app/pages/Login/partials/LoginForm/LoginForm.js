import React, { useCallback, useRef } from "react";
import styles from "./loginForm.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import classNames from "classnames/bind";
import { validateField } from "../../schemas/loginSchema";
import InputField from "../../../../components/InputField/InputField";
import RememberMe from "../RememberMe/RememberMe";
import Button from "../Button/Button";
import { sFormData } from "../../loginStore";

const cx = classNames.bind(styles);

export default function LoginForm() {
  const rememberMeRef = useRef(false);

  const handleFieldChange = useCallback((name, value) => {
    sFormData.set((prev) => {
      prev.value[name] = value;
    });
  }, []);

  const handleRememberMeChange = useCallback((value) => {
    rememberMeRef.current = value;
  }, []);

  return (
    <form className={cx("mb-6")}>
      <div
        className={cx(
          "mb-6",
          "form-control-validation",
          "fv-plugins-icon-container"
        )}
      >
        <InputField
          label={"Email"}
          name={"email"}
          type={"text"}
          placeholder={"Enter your email"}
          validate={validateField}
          onFieldChange={handleFieldChange}
        />
      </div>
      <div
        className={cx(
          "form-password-toggle",
          "form-control-validation",
          "fv-plugins-icon-container"
        )}
      >
        <InputField
          label={"Password"}
          name={"password"}
          type={"password"}
          placeholder={"••••••••"}
          validate={validateField}
          onFieldChange={handleFieldChange}
        />
      </div>
      <div className={cx("my-7", "d-flex", "justify-content-between")}>
        <RememberMe onRememberMeChange={handleRememberMeChange} />
        <a href="/auth-forgot-password-cover.html">
          <p className={cx("mb-0")}>Forgot Password?</p>
        </a>
      </div>
      <Button data={{ rememberMe: rememberMeRef }} buttonTag={"Sign in"} />
    </form>
  );
}
