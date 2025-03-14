import React, { useEffect } from "react";
import styles from "./codeForm.module.scss";
import classNames from "classnames/bind";
import CodeFormHeader from "./partials/CodeFormHeader/CodeFormHeader";
import image from "../../assets/img/illustrations/girl-verify-password-light.png";
import { Link, useLocation } from "react-router";
import SendCodeForm from "./partials/SendCodeForm/SendCodeForm";
import { sCode, sEmail } from "./codeFormStore";
import { sIsParent } from "../Login/loginStore";

const cx = classNames.bind(styles);

export default function CodeForm() {
  const location = useLocation();
  const email = location.state?.email;
  const isParent = sIsParent.use();

  useEffect(() => {
    sEmail.set(email);
  }, []);

  const handleNavigate = () => {
    sCode.reset();
    sEmail.reset();
  };

  return (
    <div
      className={cx(
        "authentication-wrapper",
        "authentication-cover",
        "fade-in"
      )}
    >
      <CodeFormHeader />
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
            <h4 className={cx("mb-1")}>Reset Code Verification 💬</h4>
            <p className={cx("mb-6")}>
              We sent a verification code to your email. Enter the code from the
              email in the field below.
            </p>
            <p class="mb-0">Type your 6 digit security code</p>
            <SendCodeForm />
            <div class="text-center">
              <Link
                to={isParent ? "/login" : "/admin-doctor/login"}
                onClick={() => handleNavigate()}
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
