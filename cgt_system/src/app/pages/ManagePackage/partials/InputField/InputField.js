import React, { useEffect, useState } from "react";
import bxHide from "@iconify/icons-bx/bx-hide";
import bxShow from "@iconify/icons-bx/bx-show";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./inputField.module.scss";
import classNames from "classnames/bind";
import debounce from "lodash.debounce";
import { sFormData, sFormError } from "../../managePackageStore";

const cx = classNames.bind(styles);
const InputField = React.memo(
  ({
    label,
    name,
    type,
    placeholder,
    value = "",
    onFieldChange,
    validate,
    reset,
  }) => {
    const [fieldValue, setFieldValue] = useState(value);
    const error = sFormError.use((formError) => formError[name]);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = name === "password" || name === "oldPassword";
    const isConfirmPassword = name === "confirmPassword";
    const password = isConfirmPassword
      ? sFormData.use((formData) => formData.password)
      : "";

    const debouceValidateField = debounce((name, value) => {
      const fieldError = validate(
        name,
        value,
        isConfirmPassword ? password : ""
      );

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
      let { name, value } = e.target;

      if (
        name === "price" ||
        name === "validityPeriod" ||
        name === "percentDiscount"
      ) {
        // Loại bỏ dấu phẩy để tránh lỗi khi nhập tiếp
        const rawValue = value.replace(/,/g, "");

        // Nếu không phải số hợp lệ, thoát (cho phép dấu chấm ở giữa số)
        if (!/^\d*\.?\d*$/.test(rawValue)) return;

        // Tách phần nguyên và phần thập phân
        let [integerPart, decimalPart] = rawValue.split(".");

        // Định dạng phần nguyên với dấu phẩy ngăn cách hàng nghìn
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // Gộp lại với phần thập phân (nếu có)
        const formattedValue =
          decimalPart !== undefined
            ? `${integerPart}.${decimalPart}`
            : integerPart;

        setFieldValue(formattedValue);

        if (validate) {
          const valueToNumber = Number(rawValue); // Chuyển thành số không có dấu phẩy

          debouceValidateField(name, valueToNumber);
        }
      } else {
        setFieldValue(value);

        if (validate) {
          debouceValidateField(name, value);
        }
      }
    };

    useEffect(() => {
      setFieldValue(value);
    }, [reset]);

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
          autoFocus={name === "packageName"}
          autoComplete={isPassword ? "current-password" : ""}
        />
        {(isPassword || isConfirmPassword) && (
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
      // <div className="mb-6 form-control-validation fv-plugins-icon-container">
      <>
        <label htmlFor={name} className={"form-label"}>
          {label}
        </label>
        {isPassword || isConfirmPassword ? (
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
      </>
      // </div>
    );
  }
);

export default InputField;
