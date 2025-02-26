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
export const sPagination = signify({
  currentPage: 1,
  totalItems: 0,
  totalPages: 0,
  itemsPerPage: 10,
});

export const sRolePagination = signify({
  currentPage: 1,
  totalItems: 0,
  totalPages: 0,
  itemsPerPage: 10,
});
