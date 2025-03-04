export const validateField = (name, value) => {
  let error = "";

  if (name === "packageName" && !value) {
    error = "Please enter package name";
  }

  if (name === "price" && (value === "" || value === null || value < 0)) {
    error = "Please enter a valid price";
  }

  if (
    name === "validityPeriod" &&
    (value === "" || value === null || value <= 0)
  ) {
    error = "Please enter a valid validity period";
  }

  if (
    name === "selectedPermissions" &&
    (!Array.isArray(value) || value.length === 0)
  ) {
    error = "Please select at least one permission";
  }

  return error;
};
