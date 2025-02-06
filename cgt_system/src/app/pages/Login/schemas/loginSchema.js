export const validateField = (name, value) => {
  let error = "";

  if (name === "email") {
    if (!value) {
      error = "Please enter email";
    }
    // } else if (!value.endsWith("@gmail.com")) {
    //   error = "Email must include @gmail.com";
    // }
  }

  if (name === "password") {
    if (!value) {
      error = "Please enter password";
    } else if (value.length < 8) {
      error = "Password must be more than 8 characters";
    }
  }

  return error;
};
