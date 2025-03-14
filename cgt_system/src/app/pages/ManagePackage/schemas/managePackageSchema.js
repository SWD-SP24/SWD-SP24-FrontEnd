export const validateField = (name, value) => {
  let error = "";

  if (name === "packageName" && !value) {
    error = "Please enter package name";
  }

  if (name === "summary" && !value) {
    error = "Please enter summary";
  }

  if (name === "price" && (value === "" || value === null || value < 0)) {
    error = "Please enter a valid price";
  }

  if (
    name === "percentDiscount" &&
    (value === "" || value === null || value < 0)
  ) {
    error = "Please enter a valid percent discount";
  }

  if (name === "image" && !value) {
    error = "Please upload an image";
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
