import React from "react";
import styles from "./comingSoon.module.scss";
import image from "../../assets/img/illustrations/boy-with-rocket-light.png";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function ComingSoon() {
  return (
    <div className={cx("misc-wrapper")}>
      <h3 className="mb-2 mx-2">We are launching soon 🚀</h3>
      <p className="mb-6 mx-2">Our website is opening soon.</p>
      <div className="mt-12">
        <img
          src={image}
          alt="boy-with-rocket-light"
          width="500"
          className="img-fluid"
          data-app-light-img="illustrations/boy-with-rocket-light.png"
          data-app-dark-img="illustrations/boy-with-rocket-dark.png"
        />
      </div>
    </div>
  );
}
