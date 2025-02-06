import React, { useState } from "react";
import bxHide from "@iconify/icons-bx/bx-hide";
import bxShow from "@iconify/icons-bx/bx-show";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./inputField.module.scss";
import classNames from "classnames/bind";
import debounce from "lodash.debounce";
import { sFormError } from "../../pages/Login/loginStore";

const cx = classNames.bind(styles);
const InputField = React.memo(
  ({ label, name, type, placeholder, value = "", onFieldChange, validate }) => {
    const [fieldValue, setFieldValue] = useState(value);
    const error = sFormError.use((formError) => formError[name]);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = name === "password";

    const debouceValidateField = debounce((name, value) => {
      const fieldError = validate(name, value);
      if (error !== fieldError) {
        sFormError.set((prev) => {
          prev.value[name] = fieldError;
        });
      }

      if (onFieldChange) {
        onFieldChange(name, value);
      }
    }, 500);

    const handleChange = (e) => {
      const { value } = e.target;
      setFieldValue(value);

      if (validate) {
        debouceValidateField(name, value);
      }
    };

    const inputElement = (
      <>
        <input
          type={isPasswordVisible ? "text" : type}
          className={`form-control ${error ? "is-invalid" : ""}`}
          id={name}
          name={name}
          placeholder={placeholder}
          value={fieldValue}
          onChange={handleChange}
          autoFocus={!isPassword}
          autoComplete={isPassword ? "current-password" : ""}
        />
        {isPassword && (
          <span
            className={cx("input-group-text", "cursor-pointer")}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            <Icon
              icon={isPasswordVisible ? bxShow : bxHide}
              className={cx("icon-base")}
            />
          </span>
        )}
      </>
    );
    return (
      <div className="mb-6 form-control-validation fv-plugins-icon-container">
        <label htmlFor={name} className={"form-label"}>
          {label}
        </label>
        {isPassword ? (
          <div className="input-group input-group-merge has-validation">
            {inputElement}
          </div>
        ) : (
          inputElement
        )}
        {error && (
          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
            <div>{error}</div>
          </div>
        )}
      </div>
    );
  }
);

export default InputField;
