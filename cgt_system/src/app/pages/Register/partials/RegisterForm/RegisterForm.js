import React, { useCallback, useRef } from "react";
import Button from "../Button/Button";
import styles from "./registerForm.module.scss";
import classNames from "classnames/bind";
import { validateField } from "../../schemas/registerShema";
import { sFormData } from "../../registerStore";
import InputField from "../InputField/InputField";
import Terms from "../Terms/Terms";

const cx = classNames.bind(styles);

export default function RegisterForm() {
  const isAgreeRef = useRef(false);

  const handleFieldChange = useCallback((name, value) => {
    sFormData.set((prev) => {
      prev.value[name] = value;
    });
  }, []);

  const handleIsAgreeChange = useCallback((value) => {
    isAgreeRef.current = value;
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

      <div
        className={cx(
          "form-password-toggle",
          "form-control-validation",
          "fv-plugins-icon-container"
        )}
      >
        <InputField
          label={"Confirm Password"}
          name={"confirmPassword"}
          type={"password"}
          placeholder={"••••••••"}
          validate={validateField}
          onFieldChange={handleFieldChange}
        />
      </div>
      <div className={cx("my-7", "d-flex", "justify-content-between")}>
        <Terms onIsAgreeChange={handleIsAgreeChange} />
      </div>

      <Button data={{ isAgree: isAgreeRef }} buttonTag={"Sign up"} />
    </form>
  );
}
