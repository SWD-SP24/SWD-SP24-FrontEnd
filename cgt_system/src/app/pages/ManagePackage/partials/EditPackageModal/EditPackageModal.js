import React, { useCallback, useEffect, useState } from "react";
import useApi from "../../../../hooks/useApi";
import API_URLS from "../../../../config/apiUrls";
import showToast from "../../../../util/showToast";
import Button from "../Button/Button";
import {
  sFormData,
  sFormError,
  sPackageIdToEdit,
  sPermissionsPagination,
} from "../../managePackageStore";
import { validateField } from "../../schemas/managePackageSchema";
import InputField from "../InputField/InputField";
import Skeleton from "react-loading-skeleton";
import Pagination from "../Pagination/Pagination";

export default function EditPackageModal() {
  const packageId = sPackageIdToEdit.use();
  const pagination = sPermissionsPagination.use();
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [membershipPackage, setMembershipPackage] = useState(null);
  const [isReset, setIsReset] = useState(false);
  const permissionsError = sFormError.use((formData) => formData.permissions);

  const { isLoading, response, error, callApi } = useApi({
    method: "GET",
  });

  const {
    isLoading: getPackageLoading,
    response: getPackageResponse,
    error: getPackageError,
    callApi: callApiGetPackage,
  } = useApi({
    method: "GET",
  });

  const fetchPermissions = (currentPage, itemsPerPage) => {
    const customUrl = `${API_URLS.PERMISSION.GET}?pageNumber=${currentPage}&pageSize=${itemsPerPage}`;
    callApi(null, customUrl);
  };

  const fetchPackageById = () => {
    const customUrl = `${API_URLS.MEMBERSHIP_PACKAGE.GET}/${packageId}`;
    callApiGetPackage(null, customUrl);
  };

  const resetForm = () => {
    setMembershipPackage(null);
    setSelectedPermissions([]);
    sFormError.reset();
    sPermissionsPagination.reset();
  };

  useEffect(() => {
    const modalElement = document.getElementById("editPackageModal");
    if (modalElement) {
      modalElement.addEventListener("shown.bs.modal", () => {
        fetchPermissions(pagination.currentPage, pagination.itemsPerPage);
      });
      modalElement.addEventListener("hidden.bs.modal", resetForm);
    }
    return () => {
      if (modalElement) {
        modalElement.removeEventListener("shown.bs.modal", fetchPermissions);
        modalElement.removeEventListener("hidden.bs.modal", resetForm);
      }
    };
  }, []);

  useEffect(() => {
    const modalElement = document.getElementById("editPackageModal");
    if (modalElement) {
      modalElement.addEventListener("shown.bs.modal", fetchPackageById);
    }
    return () => {
      if (modalElement) {
        modalElement.removeEventListener("shown.bs.modal", fetchPackageById);
      }
    };
  }, [packageId]);

  useEffect(() => {
    if (response?.status === "successful") {
      setPermissions(response.data || []);
      sPermissionsPagination.set((prev) => {
        prev.value.totalPages = response.pagination?.lastVisiblePage;
        prev.value.totalItems = response.pagination?.total;
      });
    } else if (error?.message) {
      showToast({
        icon: "error",
        text: error.message,
        targetElement: document.querySelector(".card"),
      });
    }
  }, [response, error]);

  useEffect(() => {
    if (getPackageResponse?.status === "successfully") {
      setMembershipPackage(getPackageResponse.data || {});
      sFormData.set((prev) => {
        prev.value.packageName = getPackageResponse.data.membershipPackageName;
        prev.value.price = getPackageResponse.data.price;
        prev.value.validityPeriod = getPackageResponse.data.validityPeriod;
      });
      setSelectedPermissions(
        getPackageResponse.data.permissions.map((perm) => perm.permissionId)
      );
    } else if (getPackageError?.message) {
      showToast({
        icon: "error",
        text: getPackageError.message,
        targetElement: document.querySelector(".card"),
      });
    }
  }, [getPackageResponse, getPackageError]);

  const handleFieldChange = useCallback((name, value) => {
    sFormData.set((prev) => {
      prev.value[name] = value;
    });
  }, []);

  const handlePermissionChange = (id) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((permId) => permId !== id) : [...prev, id]
    );
  };

  const handlePageChange = (page) => {
    sPermissionsPagination.set((prev) => {
      prev.value.currentPage = page;
    });
    fetchPermissions(page, pagination.itemsPerPage);
  };

  return (
    <div
      className="modal fade"
      id="editPackageModal"
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
              <h4 className="role-title mb-2">Edit Membership Package</h4>
              <p>Modify package benefits and permissions</p>
            </div>
            <form
              id="addRoleForm"
              className="row g-6 fv-plugins-bootstrap5 fv-plugins-framework"
              noValidate="novalidate"
            >
              {getPackageLoading || !membershipPackage ? (
                <>
                  <div className="col-12 form-control-validation fv-plugins-icon-container">
                    <Skeleton width={90} height={14} />
                    <Skeleton height={38} />
                  </div>
                  <div className="col-md-6 form-control-validation fv-plugins-icon-container">
                    <Skeleton width={90} height={14} />
                    <Skeleton height={38} />
                  </div>
                  <div className="col-md-6 form-control-validation fv-plugins-icon-container">
                    <Skeleton width={90} height={14} />
                    <Skeleton height={38} />
                  </div>
                  <div className="col-12">
                    <Skeleton width={90} height={14} />
                    <div
                      id="DataTables_Table_0_wrapper"
                      className="dt-container dt-bootstrap5 dt-empty-footer"
                    >
                      <table className="table table-responsive">
                        <tbody>
                          {Array(5)
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
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-12 form-control-validation fv-plugins-icon-container">
                    <InputField
                      label={"Package Name"}
                      name={"packageName"}
                      type={"text"}
                      placeholder={"Enter a membership package name"}
                      value={membershipPackage?.membershipPackageName}
                      validate={validateField}
                      onFieldChange={handleFieldChange}
                      reset={isReset}
                    />
                  </div>
                  <div className="col-md-6 form-control-validation fv-plugins-icon-container">
                    <InputField
                      label={"Price"}
                      name={"price"}
                      type={"text"}
                      placeholder={"Enter price"}
                      value={membershipPackage?.price}
                      validate={validateField}
                      onFieldChange={handleFieldChange}
                      reset={isReset}
                    />
                  </div>
                  <div className="col-md-6 form-control-validation fv-plugins-icon-container">
                    <InputField
                      label={"Validity Period"}
                      name={"validityPeriod"}
                      type={"text"}
                      placeholder={"Enter validity period"}
                      value={membershipPackage?.validityPeriod}
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
                    <div
                      id="DataTables_Table_0_wrapper"
                      className="dt-container dt-bootstrap5 dt-empty-footer"
                    >
                      <table className="table table-responsive">
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
                      buttonTag={"Update"}
                      data={membershipPackage}
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
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
