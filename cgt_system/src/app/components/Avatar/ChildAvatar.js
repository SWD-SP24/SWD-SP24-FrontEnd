import { use, useEffect, useRef, useState } from "react";
import API_URLS from "../../config/apiUrls";
import showToast from "../../util/showToast";
import useApi from "../../hooks/useApi";
import { useParams } from "react-router";
import bby_boy from "../../assets/img/illustrations/baby_boy.jpg";
import bby_girl from "../../assets/img/illustrations/baby_girl.jpg";
const ChildAvatar = ({ childData, refetch, src, alt, className }) => {
  const id = useParams().childId;
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const selectedImageRef = useRef(null);

  const { isLoading, response, callApi } = useApi({
    url: `${API_URLS.CHILDREN.EDIT_CHILD}${id}`,
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

  // Clear image preview when API updates successfully
  useEffect(() => {
    if (response) {
      setImage(null);
      refetch(); // Now refetch runs only when response updates
    }
  }, [response]);

  // Handle image URL response
  useEffect(() => {
    if (getImageUrlResponse?.status === "successful") {
      const imageUrl = getImageUrlResponse.data.url;
      if (imageUrl) {
        callApi({ avatar: imageUrl });
      }
    }
  }, [getImageUrlResponse]);

  // Show error toast on API error
  useEffect(() => {
    if (getImageUrlError?.message) {
      showToast({
        icon: "error",
        text: getImageUrlError.message,
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
    if (!selectedFile) return;

    const data = new FormData();
    data.append("file", selectedFile);
    getImageUrlCallApi(data);
  };

  // Default Avatar Image
  let imageSrc =
    "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3396.jpg?w=900";
  if (src) {
    imageSrc = src;
  } else {
    if (childData.gender === "male") {
      imageSrc = bby_boy;
    } else {
      imageSrc = bby_girl;
    }
  }

  return (
    <div className="d-flex align-items-center flex-column">
      <img
        src={image || imageSrc}
        alt={alt}
        className={className}
        height="100"
        width="100"
        id="uploadedAvatar"
        style={{ border: 0 }}
      />
      <div className="user-info text-center">
        <h4 className="text-data">{childData.fullName}</h4>
        <div className="button-wrapper">
          {image ? (
            <button
              type="button"
              className="btn btn-primary account-image-reset mb-4 me-4"
              onClick={handleGetImageUrl}
              disabled={isLoading || getImageUrlLoading}
            >
              {isLoading || getImageUrlLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Save"
              )}
            </button>
          ) : (
            <label htmlFor="upload" className="btn btn-primary me-3 mb-4">
              <span className="d-none d-sm-block">Upload</span>
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
        </div>
      </div>
    </div>
  );
};

export default ChildAvatar;
