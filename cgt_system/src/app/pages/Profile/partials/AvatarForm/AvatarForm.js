import React, { useEffect, useRef } from "react";
import Avatar from "../../../../components/Avatar/Avatar";
import useApi from "../../../../hooks/useApi";
import Cookies from "js-cookie";

export default function AvatarForm({ userData, setUser, apiUrl }) {
  const imageUrlRef = useRef();
  const { response, callApi } = useApi({
    url: apiUrl,
    method: "PUT",
  });

  const storedUser = Cookies.get("user");
  const mainUser = JSON.parse(storedUser);

  useEffect(() => {
    if (response) {
      setUser(response.data);
      console.log("response: ", response);
    }
  }, [response]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = { avatar: imageUrlRef.current.value };
    console.log("Image URL: ", data);
    await callApi(data);
    imageUrlRef.current.value = "";
  };
  return (
    <div className="d-flex align-items-start align-items-sm-center gap-4">
      <Avatar
        src={userData?.avatar || ""}
        alt="User"
        className="d-block rounded"
      />
      <div className="button-wrapper">
        {/* Button trigger modal */}
        {mainUser.role === "admin" ? (
          <div>
            <h2>{userData.fullName}</h2>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary me-2 mb-4"
            data-bs-toggle="modal"
            data-bs-target="#uploadModal"
          >
            Upload new photo
          </button>
        )}
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="uploadModal"
        tabIndex="-1"
        aria-labelledby="uploadModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={handleUpdate}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="uploadModalLabel">
                  Enter Image URL
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  ref={imageUrlRef}
                  type="text"
                  className="form-control"
                  placeholder="Paste image URL here..."
                />
              </div>
              <div className="modal-footer">
                <button
                  type="reset"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
