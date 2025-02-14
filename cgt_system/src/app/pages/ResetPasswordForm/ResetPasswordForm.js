import React, { useEffect } from "react";
import styles from "./resetPasswordForm.module.scss";
import classNames from "classnames/bind";
import image from "../../assets/img/illustrations/boy-with-laptop-light.png";
import Button from "../ForgotPassword/partials/Button/Button";
import InputField from "../ForgotPassword/partials/InputField/InputField";
import { Link, useLocation } from "react-router";
import ResetPasswordFormHeader from "./partials/ResetPasswordFormHeader/ResetPasswordFormHeader";
import SendNewPassword from "./partials/SendNewPassword/SendNewPassword";
import { sFormData } from "./resetPasswordStore";

const cx = classNames.bind(styles);

export default function ResetPasswordForm() {
  const location = useLocation();
  const email = location.state?.email;
  const code = location.state?.code;

  useEffect(() => {
    sFormData.set((pre) => {
      pre.value.email = email;
      pre.value.code = code;
    });
  }, []);

  return (
    <div
      className={cx(
        "authentication-wrapper",
        "authentication-cover",
        "fade-in"
      )}
    >
      <ResetPasswordFormHeader />
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
              src={image}
              className={cx("img-fluid")}
              alt="Login image"
              width="700"
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
            <h4 className={cx("mb-1")}>Reset Password 🔒</h4>
            <p className={cx("mb-6")}>
              Your new password must be different from previously used passwords
            </p>
            <SendNewPassword />
            <div class="text-center">
              <Link
                to={"/login"}
                class="d-flex align-items-center justify-content-center"
              >
                <i class="bx bx-chevron-left icon-20px scaleX-n1-rtl me-1_5 align-top"></i>
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
