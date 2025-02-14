// import React from "react";
// import Avatar from "../../../../components/Avatar/Avatar";

// export default function AvatarForm({ userData }) {
//   return (
//     <div class="d-flex align-items-start align-items-sm-center gap-4">
//       <Avatar
//         src={userData?.data?.avatar || ""}
//         alt="User"
//         className={"d-block rounded"}
//       />
//       <div class="button-wrapper">
//         <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
//           <span class="d-none d-sm-block">Upload new photo</span>
//           <i class="bx bx-upload d-block d-sm-none"></i>
//           <input
//             type="file"
//             id="upload"
//             class="account-file-input"
//             hidden
//             accept="image/png, image/jpeg"
//           />
//         </label>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../../../components/Avatar/Avatar";
import API_URLS from "../../../../config/apiUrls";
import useApi from "../../../../hooks/useApi";

export default function AvatarForm({ userData, refetch }) {
  const imageUrlRef = useRef();
  const { response, callApi } = useApi({
    url: `${API_URLS.USER.UPDATE_CURRENT_USER}`,
    method: "PUT",
  });

  useEffect(() => {
    if (response) {
      console.log("response: ", response);
    }
  }, [response]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = { avatar: imageUrlRef.current.value };
    console.log("Image URL: ", data);
    await callApi(data);

    refetch();
  };
  return (
    <div className="d-flex align-items-start align-items-sm-center gap-4">
      <Avatar
        src={userData?.data?.avatar || ""}
        alt="User"
        className="d-block rounded"
      />
      <div className="button-wrapper">
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary me-2 mb-4"
          data-bs-toggle="modal"
          data-bs-target="#uploadModal"
        >
          Upload new photo
        </button>
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
                  defaultValue={userData?.data?.avatar || ""}
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
