import React, { useCallback } from "react";
import styles from "./sendNewPassword.module.scss";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import classNames from "classnames/bind";
import { sFormData } from "../../resetPasswordStore";
import { validateField } from "../../schemas/resetPasswordFormSchema";

const cx = classNames.bind(styles);

export default function SendNewPassword() {
  const handleFieldChange = useCallback((name, value) => {
    sFormData.set((prev) => {
      prev.value[name] = value;
    });
  }, []);

  return (
    <form className={cx("mb-6")}>
      <div
        className={cx(
          "form-password-toggle",
          "form-control-validation",
          "fv-plugins-icon-container"
        )}
      >
        <InputField
          label={"New Password"}
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
      <Button buttonTag={"Set new password"} />
    </form>
  );
}
