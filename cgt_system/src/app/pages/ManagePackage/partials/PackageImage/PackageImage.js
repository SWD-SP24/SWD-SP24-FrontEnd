import React, { useEffect, useState } from "react";
import no_image from "../../../../assets/img/illustrations/no_image.jpg";

export default function PackageImage({ onChange }) {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      onChange(file);
    }
  };

  return (
    <div className="d-flex gap-4 w-100 align-items-center">
      <img
        src={image ? image : no_image}
        height="100"
        className="rounded"
        width="100"
        id="uploadedAvatar"
      />
      <div className="button-wrapper col-md-9">
        <label htmlFor="upload" className="btn btn-primary me-3 mb-4">
          <span className="d-none d-sm-block">Upload new photo</span>
          <i className="icon-base bx bx-upload d-block d-sm-none"></i>
          <input
            type="file"
            id="upload"
            className="account-file-input"
            onChange={handleFileChange}
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
  );
}
