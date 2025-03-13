import React, { use, useEffect, useRef, useState } from "react";
import styles from "../manageUser.module.scss";
import classNames from "classnames/bind";
import { validateField } from "../../Login/schemas/loginSchema";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";
import showToast from "../../../util/showToast.js";
const cx = classNames.bind(styles);
export default function AddUserButton({ refetch }) {
  const [role, setRole] = useState(1);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const passwordConfirm = useRef(null);

  const { response, callApi } = useApi({
    method: "POST",
  });

  useEffect(() => {
    if (response) {
      console.log("API Response:", response);
    }
  }, [response]);

  const handleRoleSelect = (e) => {
    e.preventDefault();
    setRole(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    const passConfirm = passwordConfirm.current.value;

    let hasError = false;
    const emailValidation = validateField("email", data.email);
    const passwordValidation = validateField("password", data.password);

    if (emailValidation !== "") {
      setEmailError(emailValidation);
      hasError = true;
    } else {
      setEmailError("");
    }

    if (passwordValidation !== "") {
      setPasswordError(passwordValidation);
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (passConfirm !== data.password) {
      setPasswordConfirmError("The password confirmation does not match");
      hasError = true;
    } else {
      setPasswordConfirmError("");
    }

    if (hasError) return; // Stop execution if there's an error

    const url =
      role == 1 ? API_URLS.AUTH.REGISTER : API_URLS.ADMIN.CREATE_DOCTOR;
    console.log(data);
    await callApi(data, url);
    await refetch();

    showToast({
      icon: "success",
      text: "Add user successfully",
      targetElement: document.querySelector(".content-wrapper"),
    });

    email.current.value = "";
    password.current.value = "";
    passwordConfirm.current.value = "";
    setEmailError("");
    setPasswordError("");
    setPasswordConfirmError("");
    let button = document.querySelector("#closeModalAddUser");
    console.log(button);
    button.click();
  };

  return (
    <>
      <button
        type="button"
        className={cx("btn", "btn-primary", "add-user-button")}
        data-bs-toggle="modal"
        data-bs-target="#basicModal"
      >
        Add User
      </button>
      <div class="modal fade" id="basicModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title"
                id="exampleModalLabel1"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.2px",
                  fontSize: "1.625rem",
                }}
              >
                Create New User
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div class="modal-body">
                <div class="row">
                  <div class="col mb-3">
                    <label for="newUserEmail" class="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      id="newUserEmail"
                      class="form-control"
                      placeholder="Enter Email"
                      ref={email}
                    />
                    {emailError && <div className="error">{emailError}</div>}
                  </div>
                </div>
                <div class="row">
                  <div class="col mb-3">
                    <label for="newUserPassword" class="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="newUserPassword"
                      class="form-control"
                      placeholder="Enter Password"
                      ref={password}
                    />
                    {passwordError && (
                      <div className="error">{passwordError}</div>
                    )}
                  </div>
                </div>
                <div class="row">
                  <div class="col mb-3">
                    <label for="newUserPassword" class="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="newUserPassword"
                      class="form-control"
                      placeholder="Enter Password"
                      ref={passwordConfirm}
                    />
                    {passwordConfirmError && (
                      <div className="error">{passwordConfirmError}</div>
                    )}
                  </div>
                </div>
                <div class="row">
                  <div class="col mb-3">
                    <label for="roleSelect" class="form-label">
                      Role
                    </label>
                    <select
                      class="form-select"
                      id="roleSelect"
                      onChange={handleRoleSelect}
                    >
                      <option value="1" selected>
                        Member
                      </option>
                      <option value="2">Doctor</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="reset"
                  class="btn btn-outline-secondary"
                  id="closeModalAddUser"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    console.log("click ne");
                  }}
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
