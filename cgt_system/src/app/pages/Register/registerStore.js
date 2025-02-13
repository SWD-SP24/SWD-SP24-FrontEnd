import { signify } from "react-signify";

export const sFormData = signify({
  email: "",
  password: "",
  confirmPassword: "",
});
export const sFormError = signify({
  email: "",
  password: "",
  confirmPassword: "",
  terms: "",
});
