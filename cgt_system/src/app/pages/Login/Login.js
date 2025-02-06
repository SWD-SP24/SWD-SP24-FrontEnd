import React from "react";
import styles from "./login.module.scss";
import classNames from "classnames/bind";
import "bootstrap/dist/css/bootstrap.min.css";
import login_image from "../../assets/img/illustrations/Remove-bg.ai_1736703114299.png";
import LoginHeader from "./partials/LoginHeader/LoginHeader";
import LoginForm from "./partials/LoginForm/LoginForm";
import { Link } from "react-router";

const cx = classNames.bind(styles);

export default function Login() {
  return (
    <div className={cx("authentication-wrapper", "authentication-cover")}>
      <LoginHeader />
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
              src={login_image}
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
            "p-6"
          )}
        >
          <div className={cx("w-px-400", "mx-auto", "mt-sm-12", "mt-8")}>
            <h4 className={cx("mb-1")}>Welcome to Grow+ 👋</h4>
            <p className={cx("mb-6")}>
              Please sign-in to your account and start tracking your child's
              growth journey
            </p>
            <LoginForm />
            <p className={cx("text-center")}>
              <span>New on our platform? </span>
              <Link to={"register"}>
                <span>Create an account</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
