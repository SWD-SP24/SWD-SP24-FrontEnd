import React, { useEffect } from "react";
import styles from "./login.module.scss";
import classNames from "classnames/bind";
import "bootstrap/dist/css/bootstrap.min.css";
import login_image from "../../assets/img/illustrations/parent-and-child.png";
import admin_login_image from "../../assets/img/illustrations/automated-developer.png";
import LoginHeader from "./partials/LoginHeader/LoginHeader";
import LoginForm from "./partials/LoginForm/LoginForm";
import { Link, useLocation } from "react-router";
import { sFormData, sFormError, sIsParent } from "./loginStore";

const cx = classNames.bind(styles);

export default function Login() {
  const location = useLocation();

  const isParentLogin = location.pathname === "/login";

  useEffect(() => {
    sIsParent.set(isParentLogin);
  }, []);

  const handleNavigate = () => {
    sFormData.reset();
    sFormError.reset();
  };

  return (
    <div
      className={cx(
        "authentication-wrapper",
        "authentication-cover",
        "fade-in"
      )}
    >
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
              src={isParentLogin ? login_image : admin_login_image}
              className={cx("img-fluid")}
              alt="Login image"
              width="1000"
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
            <h4 className={cx("mb-1")}>Welcome to Grow+ 👋</h4>
            <p className={cx("mb-6")}>
              {isParentLogin
                ? "Please sign in to your account and start tracking your child's growth journey."
                : "Please sign-in to your account."}
            </p>
            <LoginForm />
            {isParentLogin && (
              <p className={cx("text-center")}>
                <span>New on our platform? </span>
                <Link to={"/register"} onClick={() => handleNavigate()}>
                  <span>Create an account</span>
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
