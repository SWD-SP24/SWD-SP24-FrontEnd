import React, { useCallback } from "react";
import styles from "./sendMailForm.module.scss";
import classNames from "classnames/bind";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import { sEmail } from "../../emailFormStore";
import { validateField } from "../../schemas/emailFormSchema";

const cx = classNames.bind(styles);

export default function SendMailForm() {
  const handleFieldChange = useCallback((value) => {
    sEmail.set(value);
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
      <Button buttonTag={"Send reset code"} />
    </form>
  );
}
