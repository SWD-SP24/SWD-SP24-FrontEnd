import React, { useCallback, useEffect, useState } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import showToast from "../../../../util/showToast";
import Button from "../Button/Button";
import { sFormData, sFormError } from "../../managePackageStore";
import { validateField } from "../../schemas/managePackageSchema";
import InputField from "../InputField/InputField";

export default function EditPackageModal() {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [isReset, setIsReset] = useState(false);
  const permissionsError = sFormError.use((formData) => formData.permissions);

  const { isLoading, response, error, callApi } = useApi({
    url: `${API_URLS.PERMISSION.GET}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response?.status === "success") {
      setPermissions(response.data || []);
    }
  }, [response]);

  useEffect(() => {
    if (error?.message) {
      showToast({
        icon: "error",
        text: error?.message,
        targetElement: document.querySelector(".card"),
      });
    }
  }, [error]);

  const handlePermissionChange = (id) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((permId) => permId !== id) : [...prev, id]
    );
  };

  const resetForm = () => {
    setSelectedPermissions([]);
    setIsReset((prev) => !prev);
    sFormData.reset();
    sFormError.reset();
  };

  useEffect(() => {
    const modalElement = document.getElementById("addRoleModal");
    if (modalElement) {
      modalElement.addEventListener("hidden.bs.modal", resetForm);
    }
    return () => {
      if (modalElement) {
        modalElement.removeEventListener("hidden.bs.modal", resetForm);
      }
    };
  }, []);

  const handleFieldChange = useCallback((name, value) => {
    sFormData.set((prev) => {
      prev.value[name] = value;
    });
  }, []);

  return (
    <div
      className="modal fade"
      id="addRoleModal"
      tabIndex="-1"
      aria-modal="true"
      role="dialog"
      style={{ display: "none" }}
    >
      <div className="modal-dialog modal-lg modal-simple modal-dialog-centered modal-add-new-role">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center mb-6">
              <h4 className="role-title mb-2">Add New Membership Package</h4>
              <p>Set package benefits and permissions</p>
            </div>
            <form
              id="addRoleForm"
              className="row g-6 fv-plugins-bootstrap5 fv-plugins-framework"
              noValidate="novalidate"
            >
              <div className="col-12 form-control-validation fv-plugins-icon-container">
                <InputField
                  label={"Package Name"}
                  name={"packageName"}
                  type={"text"}
                  placeholder={"Enter a membership package name"}
                  validate={validateField}
                  onFieldChange={handleFieldChange}
                  reset={isReset}
                />
              </div>
              <div className="col-md-6 form-control-validation fv-plugins-icon-container">
                <InputField
                  label={"Price"}
                  name={"price"}
                  type={"number"}
                  placeholder={"Enter price"}
                  validate={validateField}
                  onFieldChange={handleFieldChange}
                  reset={isReset}
                />
              </div>
              <div className="col-md-6 form-control-validation fv-plugins-icon-container">
                <InputField
                  label={"Validity Period"}
                  name={"validityPeriod"}
                  type={"number"}
                  placeholder={"Enter validity period"}
                  validate={validateField}
                  onFieldChange={handleFieldChange}
                  reset={isReset}
                />
              </div>
              <div className="col-12">
                <h5 className="mb-6">Permissions</h5>
                <input
                  type="hidden"
                  className={`${permissionsError && "is-invalid"}`}
                />
                {permissionsError && (
                  <div className="p-1 fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                    <div>{permissionsError}</div>
                  </div>
                )}
                <div className="table-responsive">
                  <table className="table table-flush-spacing mb-0 border-top">
                    <tbody>
                      {permissions.map((permission) => (
                        <tr key={permission.permissionId}>
                          <td className="text-nowrap fw-medium text-heading">
                            {permission.description}
                          </td>
                          <td>
                            <div className="d-flex justify-content-end">
                              <div className="form-check mb-0 me-4 me-lg-12">
                                <input
                                  className={`form-check-input ${
                                    permissionsError && "is-invalid"
                                  }`}
                                  type="checkbox"
                                  id={`permission-${permission.permissionId}`}
                                  checked={selectedPermissions.includes(
                                    permission.permissionId
                                  )}
                                  onChange={() =>
                                    handlePermissionChange(
                                      permission.permissionId
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-12 text-center">
                <Button
                  buttonTag={"Submit"}
                  selectedPermissions={selectedPermissions}
                />
                <button
                  type="reset"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
