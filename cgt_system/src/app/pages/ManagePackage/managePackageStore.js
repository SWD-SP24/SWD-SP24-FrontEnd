import { signify } from "react-signify";

export const sPackages = signify([]);
export const sPermissions = signify([]);
export const sFormData = signify({
  packageName: "",
  price: 0,
  validityPeriod: 0,
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

export const sPermissionsPagination = signify({
  currentPage: 1,
  totalItems: 0,
  totalPages: 0,
  itemsPerPage: 10,
});
export const sPackageIdToEdit = signify("");
