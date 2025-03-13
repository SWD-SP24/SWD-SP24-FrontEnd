import React from "react";
import styles from "./welcome.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router";
import image from "../../assets/img/illustrations/mother-hugging-child.png";

const cx = classNames.bind(styles);

export default function Welcome() {
  return (
    <div className="container-xxl container-p-y">
      <div className={cx("misc-wrapper")}>
        <div className={cx("welcome-text")}>
          <h3 className="mb-2 mx-2">Welcome! 👋</h3>
          <p className="mb-6 mx-2">
            We're excited to help you track your child's growth and milestones
          </p>
          <p className="mb-6 mx-2">Let's make every step memorable! 🎉</p>
          <Link
            to={"/member/children"}
            className={cx("btn", "btn-primary", "btn-animated")}
          >
            Start Exploring
          </Link>
        </div>
        <div className={cx("mt-6", "welcome-image")}>
          <img
            src={image}
            alt="mother-hugging-child"
            width="700"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}
