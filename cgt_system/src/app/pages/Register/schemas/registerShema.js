export const validateField = (name, value, password) => {
  let error = "";

  if (name === "email") {
    if (!value) {
      error = "Please enter email";
    } else if (!value.includes("@")) {
      error = "Email must be valid";
    }
  }

  if (name === "password") {
    if (!value) {
      error = "Please enter password";
    } else if (value.length < 8) {
      error = "Password must be more than 8 characters";
    }
  }

  if (name === "confirmPassword") {
    if (!value) {
      error = "Please enter confirm password";
    } else if (value.length < 8) {
      error = "Confirm password must be more than 8 characters";
    } else if (value !== password) {
      error = "Confirm password does not match";
    }
  }

  if (name === "isAgree") {
    if (value === false) {
      error = "Please agree to terms & conditions";
    }
  }

  return error;
};
