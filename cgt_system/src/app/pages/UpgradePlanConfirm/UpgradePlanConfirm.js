import React from "react";
import styles from "../../pages/Welcome/welcome.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router";
import image from "../../assets/img/illustrations/mother-holding-baby.png";

const cx = classNames.bind(styles);

export default function UpgradePlanConfirm() {
  return (
    <div className={cx("misc-wrapper")}>
      <div className={cx("welcome-text")}>
        <h3 className="mb-2 mx-2">Congratulations! 🎉</h3>
        <p className="mb-6 mx-2">
          You’ve successfully upgraded your plan! Now enjoy all new features to
          track your child's growth even better.
        </p>
        <p className="mb-6 mx-2">Make every milestone even more special! 🚀</p>
        <Link
          to={"/member/children"}
          className={cx("btn", "btn-primary", "btn-animated")}
        >
          Explore New Features
        </Link>
      </div>
      <div className={cx("welcome-image")}>
        <img
          src={image}
          alt="mother-hugging-child"
          width="700"
          className="img-fluid"
        />
      </div>
    </div>
  );
}
