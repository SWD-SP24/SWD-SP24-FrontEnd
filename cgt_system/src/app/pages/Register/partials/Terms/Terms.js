import React, { useEffect, useState } from "react";
import { sFormError } from "../../registerStore";
import debounce from "lodash.debounce";
import { validateField } from "../../schemas/registerShema";

export default function Terms({ onIsAgreeChange }) {
  const [isAgree, setIsAgree] = useState(false);
  const error = sFormError.use((formError) => formError.terms);

  const debouceValidateField = debounce((value) => {
    const fieldError = validateField("isAgree", value);
    sFormError.set((prev) => {
      prev.value["terms"] = fieldError;
    });
  }, 500);

  const handleChange = () => {
    const newIsAgree = !isAgree;
    setIsAgree(newIsAgree);
    debouceValidateField(newIsAgree);
    onIsAgreeChange(newIsAgree);
  };

  return (
    <div className="form-check mb-0">
      <input
        className={`form-check-input ${error ? "is-invalid" : ""}`}
        type="checkbox"
        name="terms"
        checked={isAgree}
        onChange={handleChange}
        id="terms-conditions"
      />
      <label className="form-check-label" htmlFor="terms-conditions">
        I agree to
        <a href="javascript:void(0);"> privacy policy & terms</a>
      </label>
      {error && (
        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
          <div>{error}</div>
        </div>
      )}
    </div>
  );
}
