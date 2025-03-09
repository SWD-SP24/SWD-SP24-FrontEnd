import React, { useEffect, useState } from "react";
import default_avatar from "../../../../assets/img/avatars/default-avatar.jpg";
import { Link } from "react-router";
import { sPackageIdToEdit, sPagination } from "../../managePackageStore";
import Skeleton from "react-loading-skeleton";
import API_URLS from "../../../../config/apiUrls";
import useApi from "../../../../hooks/useApi";
import showToast from "../../../../util/showToast";

export default function PackageItem({
  packageItem,
  totalUserUse,
  displayedUsers,
  remainingUsers,
  onFetchPackages,
}) {
  const [showDelete, setShowDelete] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const pagination = sPagination.use();
  const { isLoading, response, error, callApi } = useApi({ method: "PATCH" });

  const {
    response: responseDelete,
    error: errorDelete,
    callApi: deleteCallApi,
  } = useApi({
    method: "DELETE",
  });

  useEffect(() => {
    const handleApiResponse = () => {
      if (responseDelete?.status === "success") {
        onFetchPackages(pagination.currentPage, pagination.itemsPerPage);
      }
    };

    const handleError = () => {
      if (errorDelete?.message) {
        showToast({
          icon: "error",
          text: error?.message,
          targetElement: document.querySelector(".content-wrapper"),
        });
      }
    };

    try {
      handleApiResponse();
      handleError();
    } catch (err) {
      console.error("Error handling API response:", err);
    }
  }, [responseDelete, errorDelete]);

  useEffect(() => {
    if (response?.status === "success") {
      onFetchPackages(pagination.currentPage, pagination.itemsPerPage);
    }
    if (error?.message) {
      showToast({
        icon: "warning",
        text: error?.message,
        targetElement: document.querySelector(".content-wrapper"),
      });
    }
  }, [response, error]);

  const handleChangeStatus = () => {
    const customUrl = `${API_URLS.MEMBERSHIP_PACKAGE.PATCH}/${packageItem.membershipPackageId}/status`;
    callApi(
      { status: packageItem.status === "active" ? "inactive" : "active" },
      customUrl
    );
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("packageId", packageItem.membershipPackageId);
  };

  const handleDrop = (e) => {
    const packageId = e.dataTransfer.getData("packageId");
    if (packageId === String(packageItem.membershipPackageId)) {
      handleDelete(packageItem.membershipPackageId);
    }
  };

  const handleDelete = (id) => {
    if (totalUserUse > 0 && packageItem.status === "active") {
      showToast({
        icon: "warning",
        text: "This package is active and currently in use. Deletion is not allowed.",
        targetElement: document.querySelector(".content-wrapper"),
      });
      return;
    }

    if (totalUserUse > 0) {
      showToast({
        icon: "warning",
        text: "This package is currently in use and cannot be deleted.",
        targetElement: document.querySelector(".content-wrapper"),
      });
      return;
    }

    if (packageItem.status === "active") {
      showToast({
        icon: "warning",
        text: "This package is active and cannot be deleted.",
        targetElement: document.querySelector(".content-wrapper"),
      });
      return;
    }

    const customUrl = `${API_URLS.MEMBERSHIP_PACKAGE.DELETE}/${id}`;
    deleteCallApi(null, customUrl);
  };

  return (
    <>
      {showDelete && (
        <div
          className={`delete-icon alert ${
            isDraggingOver ? "alert-outline-danger" : "alert-outline-secondary"
          }`}
          style={{
            position: "fixed",
            bottom: "10%",
            left: "55%",
            transform: "translate(-50%, 50%)",
            zIndex: 1,
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.8,
            transition: "opacity 0.3s ease, background-color 0.3s ease",
          }}
          onDrop={(e) => {
            setIsDraggingOver(false);
            handleDrop(e);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingOver(true);
          }}
          onDragEnter={() => setIsDraggingOver(true)}
          onDragLeave={() => setIsDraggingOver(false)}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
        >
          <i
            className="bx bx-trash"
            style={{ fontSize: "50px", color: isDraggingOver ? "red" : "grey" }}
          ></i>
        </div>
      )}

      <div
        className="col-xl-4 col-lg-6 col-md-6"
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        <div
          className="card"
          style={{
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
          draggable="true"
          onDragStart={handleDragStart}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-normal mb-0 text-body">
                Total {totalUserUse} users
              </h6>
              <ul className="list-unstyled d-flex align-items-center avatar-group mb-0">
                {displayedUsers.map((user, index) => (
                  <li key={index} className="avatar pull-up">
                    <img
                      className="rounded-circle"
                      src={user.image || default_avatar}
                      alt="Avatar"
                    />
                  </li>
                ))}
                {remainingUsers > 0 && (
                  <li className="avatar">
                    <span className="avatar-initial rounded-circle pull-up">
                      +{remainingUsers}
                    </span>
                  </li>
                )}
              </ul>
            </div>
            <div className="d-flex justify-content-between align-items-end">
              <div className="role-heading">
                <h5 className="mb-1">{packageItem.membershipPackageName}</h5>
                <Link
                  data-bs-toggle="modal"
                  data-bs-target="#editPackageModal"
                  className="role-edit-modal me-2"
                  onClick={() =>
                    sPackageIdToEdit.set(packageItem.membershipPackageId)
                  }
                >
                  <span>Edit</span>
                </Link>
              </div>
              {isLoading ? (
                <Skeleton height={16.4} width={28.4} borderRadius={30} />
              ) : (
                <div className="me-5">
                  <label className="switch switch-primary switch-sm">
                    <input
                      type="checkbox"
                      className="switch-input"
                      checked={packageItem.status === "active"}
                      onChange={handleChangeStatus}
                    />
                    <span className="switch-toggle-slider">
                      <span className="switch-on"></span>
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
