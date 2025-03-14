import React from "react";
import styles from "./notAuthorized.module.scss";
import { Link, useNavigate } from "react-router";
import image from "../../assets/img/illustrations/girl-with-laptop-light.png";

export default function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <div className="container-xxl container-p-y">
      <div className={styles.misc_wrapper}>
        <h1 className="mb-2 mx-2">401</h1>
        <h4 className="mb-2 mx-2">You are not authorized! 🔐</h4>
        <p className="mb-6 mx-2">
          You don’t have permission to access this page.
        </p>
        <button onClick={() => navigate(-2)} className="btn btn-primary">
          Back
        </button>
        <div className="mt-6">
          <img
            src={image}
            alt="page-misc-not-authorized-light"
            width="500"
            className="img-fluid"
            data-app-light-img="illustrations/girl-with-laptop-light.png"
            data-app-dark-img="illustrations/girl-with-laptop-dark.png"
          />
        </div>
      </div>
    </div>
  );
}
