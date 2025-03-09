export const formatDate = (dateString) => {
  if (!dateString) return "";

  // Expecting input format "dd/MM/YYYY"
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`; // Convert to "YYYY-MM-DD"
};

export const toDMY = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString); // Convert ISO string to Date object

  const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getYear = (dateString) => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("/");
  return year;
};

export const getMonth = (dateString) => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("/");
  return month;
};

export const getDate = (dateString) => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("/");
  return day;
};
