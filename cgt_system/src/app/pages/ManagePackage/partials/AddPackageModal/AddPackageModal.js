import React, { useCallback, useEffect, useState } from "react";
import "./addPackageModal.css";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import showToast from "../../../../util/showToast";
import Button from "../Button/Button";
import {
  sFormData,
  sFormError,
  sPermissionsPagination,
} from "../../managePackageStore";
import { validateField } from "../../schemas/managePackageSchema";
import InputField from "../InputField/InputField";
import Pagination from "../Pagination/Pagination";
import Skeleton from "react-loading-skeleton";
import PackageImage from "../PackageImage/PackageImage";
import no_image from "../../../../assets/img/illustrations/no_image.jpg";

export default function AddPackageModal() {
  const pagination = sPermissionsPagination.use();
  const [permissions, setPermissions] = useState([]);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const [isReset, setIsReset] = useState(false);
  const permissionsError = sFormError.use((formData) => formData.permissions);

  const { isLoading, response, error, callApi } = useApi({
    method: "GET",
  });

  const fetchPermissions = () => {
    const customUrl = `${API_URLS.PERMISSION.GET}?pageNumber=${pagination.currentPage}&pageSize=${pagination.itemsPerPage}`;
    callApi(null, customUrl);
  };

  useEffect(() => {
    if (response?.status === "successful") {
      const permissions = response.data || {};
      const pagination = response.pagination || {};
      if (permissions) {
        setPermissions(response.data || []);
      }
      if (pagination) {
        sPermissionsPagination.set((prev) => {
          prev.value.totalPages = pagination.lastVisiblePage;
          prev.value.totalItems = pagination.total;
        });
      }
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
    sPermissionsPagination.reset();
    sFormError.reset();
    setImage(null);
  };

  useEffect(() => {
    const modalElement = document.getElementById("addRoleModal");
    if (modalElement) {
      modalElement.addEventListener("shown.bs.modal", fetchPermissions);
      modalElement.addEventListener("hidden.bs.modal", resetForm);
    }
    return () => {
      if (modalElement) {
        modalElement.removeEventListener("shown.bs.modal", fetchPermissions);
        modalElement.removeEventListener("hidden.bs.modal", resetForm);
      }
    };
  }, []);

  const handleFieldChange = useCallback((name, value) => {
    sFormData.set((prev) => {
      prev.value[name] = value;
    });
  }, []);

  const handlePageChange = (page) => {
    sPermissionsPagination.set((prev) => {
      prev.value.currentPage = page;
    });
    const customUrl = `${API_URLS.PERMISSION.GET}?pageNumber=${page}&pageSize=${pagination.itemsPerPage}`;
    callApi(null, customUrl);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

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
              <div className="p-0 mt-10">
                <div className="d-flex gap-4 w-100 align-items-center">
                  <img
                    src={image ? image : no_image}
                    height="100"
                    className="rounded"
                    width="100"
                    id="uploadedAvatar"
                  />
                  <div className="button-wrapper col-md-9">
                    <label
                      htmlFor="upload"
                      className="btn btn-primary me-3 mb-4"
                    >
                      <span className="d-none d-sm-block">
                        Upload new photo
                      </span>
                      <i className="icon-base bx bx-upload d-block d-sm-none"></i>
                      <input
                        type="file"
                        id="upload"
                        className="account-file-input"
                        onChange={handleImageChange}
                        hidden
                        accept="image/*"
                      />
                    </label>
                    <button
                      type="button"
                      className="btn btn-label-secondary account-image-reset mb-4"
                      onClick={() => {
                        setImage(null);
                      }}
                    >
                      <i className="icon-base bx bx-reset d-block d-sm-none"></i>
                      <span className="d-none d-sm-block">Reset</span>
                    </button>
                    <div>Allowed JPG, GIF or PNG. Max size of 800K</div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="col-12 g-2">
                <div className="row">
                  <div className="col-md-6 p-2 form-control-validation fv-plugins-icon-container">
                    <InputField
                      label={"Package Name"}
                      name={"packageName"}
                      type={"text"}
                      placeholder={"Enter name"}
                      validate={validateField}
                      onFieldChange={handleFieldChange}
                      reset={isReset}
                    />
                  </div>
                  <div className="col-md-6 p-2 form-control-validation fv-plugins-icon-container">
                    <InputField
                      label={"Validity Period"}
                      name={"validityPeriod"}
                      type={"text"}
                      placeholder={"Enter validity period"}
                      validate={validateField}
                      onFieldChange={handleFieldChange}
                      reset={isReset}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 p-2 form-control-validation fv-plugins-icon-container">
                    <InputField
                      label={"Price"}
                      name={"price"}
                      type={"text"}
                      placeholder={"Enter price"}
                      validate={validateField}
                      onFieldChange={handleFieldChange}
                      reset={isReset}
                    />
                  </div>
                  <div className="col-md-6 p-2 form-control-validation fv-plugins-icon-container">
                    <InputField
                      label={"Percent Discount (%)"}
                      name={"percentDiscount"}
                      type={"text"}
                      placeholder={"Enter percent discount"}
                      validate={validateField}
                      onFieldChange={handleFieldChange}
                      reset={isReset}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="p-2 form-control-validation fv-plugins-icon-container">
                    <InputField
                      label={"Summary"}
                      name={"summary"}
                      type={"text"}
                      placeholder={"Enter summary"}
                      validate={validateField}
                      onFieldChange={handleFieldChange}
                      reset={isReset}
                    />
                  </div>
                </div>
              </div>
              <hr />

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
                <div
                  id="DataTables_Table_0_wrapper"
                  className="dt-container dt-bootstrap5 dt-empty-footer"
                >
                  <table className="table table-responsive">
                    <tbody>
                      {isLoading
                        ? Array(5)
                            .fill(0)
                            .map((_, index) => (
                              <tr key={index}>
                                <td>
                                  <Skeleton height={18} width={250} />
                                </td>
                                <td>
                                  <Skeleton height={18} width={18} />
                                </td>
                              </tr>
                            ))
                        : permissions.map((permission) => (
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
                  <Pagination
                    currentPage={pagination.currentPage}
                    itemsPerPage={pagination.itemsPerPage}
                    totalItems={pagination.totalItems}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
              <div className="col-12 text-center">
                <Button
                  buttonTag={"Submit"}
                  selectedPermissions={selectedPermissions}
                  image={file}
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
