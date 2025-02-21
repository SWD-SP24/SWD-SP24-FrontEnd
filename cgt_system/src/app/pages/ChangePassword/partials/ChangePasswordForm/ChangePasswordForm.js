import React, { useCallback, useState } from "react";
import InputField from "../InputField/InputField";
import { sFormData, sFormError } from "../../changePasswordStore";
import { validateField } from "../../schemas/changePasswordSchema";
import Button from "../Button/Button";

export default function ChangePasswordForm({ user }) {
  const [isReset, setIsReset] = useState(false);
  const handleFieldChange = useCallback((name, value) => {
    sFormData.set((prev) => {
      prev.value[name] = value;
    });
  }, []);

  const handleReset = () => {
    setIsReset((prev) => !prev);
    sFormData.reset();
    sFormError.reset();
  };

  return (
    <form
      id="formAccountSettings"
      className="fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate="noalidate"
    >
      <div className="row">
        <div className="mb-6 col-md-6 form-password-toggle form-control-validation fv-plugins-icon-container">
          <InputField
            label={"Current Password"}
            name={"oldPassword"}
            type={"password"}
            placeholder={"••••••••"}
            validate={validateField}
            onFieldChange={handleFieldChange}
            reset={isReset}
          />
        </div>
      </div>
      <div className="row">
        <div className="mb-6 col-md-6 form-password-toggle form-control-validation fv-plugins-icon-container">
          <InputField
            label={"New Password"}
            name={"password"}
            type={"password"}
            placeholder={"••••••••"}
            validate={validateField}
            onFieldChange={handleFieldChange}
            reset={isReset}
          />
        </div>

        <div className="mb-6 col-md-6 form-password-toggle form-control-validation fv-plugins-icon-container">
          <InputField
            label={"Confirm Password"}
            name={"confirmPassword"}
            type={"password"}
            placeholder={"••••••••"}
            validate={validateField}
            onFieldChange={handleFieldChange}
            reset={isReset}
          />
        </div>
      </div>
      <h6 className="text-body">Password Requirements:</h6>
      <ul className="ps-4 mb-0">
        <li className="mb-4">
          Minimum 8 characters long - the more, the better
        </li>
        <li className="mb-4">At least one lowercase character</li>
        <li>At least one number, symbol, or whitespace character</li>
      </ul>
      <div className="mt-6">
        <Button buttonTag={"Save changes"} user={user} />
        <Button buttonTag={"Reset"} onReset={handleReset} />
      </div>
    </form>
  );
}
