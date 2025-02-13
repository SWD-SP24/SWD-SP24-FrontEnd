import React from "react";
import styles from "./register.module.scss";
import classNames from "classnames/bind";
import RegisterHeader from "./partials/RegisterHeader/RegisterHeader";
import register_image from "../../assets/img/illustrations/mom-and-children.png";
import { Link } from "react-router";
import RegisterForm from "./partials/RegisterForm/RegisterForm";

const cx = classNames.bind(styles);

export default function Register() {
  return (
    <div
      className={cx(
        "authentication-wrapper",
        "authentication-cover",
        "fade-in"
      )}
    >
      <RegisterHeader />
      <div className={cx("authentication-inner", "row", "m-0")}>
        <div
          className={cx(
            "d-none",
            "d-lg-flex",
            "col-lg-7",
            "col-xl-8",
            "align-items-center",
            "p-5"
          )}
        >
          <div className={cx("w-100", "d-flex", "justify-content-center")}>
            <img
              src={register_image}
              className={cx("img-fluid")}
              alt="Login image"
              width="1000"
              data-app-dark-img="illustrations/boy-with-rocket-dark.png"
              data-app-light-img="illustrations/boy-with-rocket-light.png"
            />
          </div>
        </div>
        <div
          className={cx(
            "d-flex",
            "col-12",
            "col-lg-5",
            "col-xl-4",
            "align-items-center",
            "authentication-bg",
            "p-sm-12",
            "p-6",
            "slide-in-right"
          )}
        >
          <div className={cx("w-px-400", "mx-auto", "mt-sm-12", "mt-8")}>
            <h4 className={cx("mb-1")}>A Journey Begins Here 🌱</h4>
            <p className={cx("mb-6")}>
              Effortless and fun way to monitor your child's development!
            </p>
            <RegisterForm />
            <p className={cx("text-center")}>
              <span>Already have an account?</span>
              <Link to={"/login"}>
                <span> Sign in instead</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
