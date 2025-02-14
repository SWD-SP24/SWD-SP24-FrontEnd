import { signify } from "react-signify";

export const sFormData = signify({
  email: "",
  code: "",
  password: "",
  confirmPassword: "",
});

export const sFormError = signify({
  password: "",
  confirmPassword: "",
});
