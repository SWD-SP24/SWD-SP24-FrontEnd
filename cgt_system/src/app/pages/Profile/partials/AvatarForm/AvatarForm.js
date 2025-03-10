import React, { useEffect, useRef, useState } from "react";
import default_avatar from "../../../../assets/img/avatars/default-avatar.jpg";
import Avatar from "../../../../components/Avatar/Avatar";
import API_URLS from "../../../../config/apiUrls";
import useApi from "../../../../hooks/useApi";
import showToast from "../../../../util/showToast";

export default function AvatarForm({ userData, setUser, apiUrl }) {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const selectedImageRef = useRef(null);
  const { isLoading, response, callApi } = useApi({
    url: apiUrl,
    method: "PUT",
  });

  const {
    isLoading: getImageUrlLoading,
    response: getImageUrlResponse,
    error: getImageUrlError,
    callApi: getImageUrlCallApi,
  } = useApi({
    url: API_URLS.IMAGE.GET_URL,
    method: "POST",
  });

  useEffect(() => {
    if (response) {
      setUser(response.data);
      setImage(null);
    }
  }, [response]);

  useEffect(() => {
    if (getImageUrlResponse?.status === "successful") {
      const imageUrl = getImageUrlResponse.data.url || {};

      if (imageUrl) {
        const data = { avatar: imageUrl };
        callApi(data);
      }
    }
  }, [getImageUrlResponse]);

  useEffect(() => {
    if (getImageUrlCallApi?.message) {
      showToast({
        icon: "error",
        text: getImageUrlError?.message,
        targetElement: document.querySelector(".card"),
      });
    }
  }, [getImageUrlError]);

  const handleFileChange = () => {
    const file = selectedImageRef.current?.files[0];
    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleGetImageUrl = (e) => {
    e.preventDefault();
    const file = selectedFile;

    const data = new FormData();
    data.append("file", file);

    getImageUrlCallApi(data);
  };

  return (
    <div className="d-flex align-items-start align-items-sm-center gap-4">
      <Avatar
        src={image ? image : userData?.avatar || default_avatar}
        alt="User"
        className="d-block rounded"
      />
      <div className="button-wrapper">
        {image ? (
          <button
            type="button"
            className="btn btn-primary account-image-reset mb-4 me-4"
            onClick={(e) => handleGetImageUrl(e)}
          >
            <i className="icon-base bx bx-reset d-block d-sm-none"></i>
            <span className="d-none d-sm-block">
              {isLoading || getImageUrlLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : (
                "Save"
              )}
            </span>
          </button>
        ) : (
          <label
            for="upload"
            className="btn btn-primary me-3 mb-4"
            tabindex="0"
          >
            <span className="d-none d-sm-block">Upload new photo</span>
            <i className="icon-base bx bx-upload d-block d-sm-none"></i>
            <input
              ref={selectedImageRef}
              type="file"
              id="upload"
              className="account-file-input"
              onChange={handleFileChange}
              hidden
              accept="image/*"
            />
          </label>
        )}
        <button
          type="button"
          className="btn btn-label-secondary account-image-reset mb-4"
          onClick={() => setImage(null)}
        >
          <i className="icon-base bx bx-reset d-block d-sm-none"></i>
          <span className="d-none d-sm-block">Reset</span>
        </button>
        <div>Allowed JPG, GIF or PNG. Max size of 800K</div>
      </div>
    </div>
  );
}
