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

export const getShortMonthName = (monthNumber) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[monthNumber - 1] || "Invalid Month";
};

export function convertToISOString(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);

  // Create a Date object (UTC time zone)
  const date = new Date(Date.UTC(year, month - 1, day));

  return date.toISOString().split("T")[0];
}
