import { signify } from "react-signify";

export const sPackages = signify([]);
export const sFormData = signify({
  packageName: "",
  price: "",
  validityPeriod: "",
});
export const sFormError = signify({
  packageName: "",
  price: "",
  validityPeriod: "",
  permissions: "",
});
