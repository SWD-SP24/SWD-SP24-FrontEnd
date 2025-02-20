import React from "react";
import styles from "./loading.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Loading() {
  return (
    <div className={cx("loading-container")}>
      <div className={cx("loading-circle")}></div>
      <p className={cx("loading-text")}>Loading...</p>
    </div>
  );
}
