export const formatDate = (isoString) => {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(isoString));
};

export const toDMY = (isoString) => {
  if (!isoString) return ""; // Handle empty input gracefully

  // Ensure the date is in "yyyy-mm-dd" format first
  const formattedDate = formatDate(isoString).split("/").join("-");

  // Convert to "dd-mm-yyyy"
  const [year, month, day] = formattedDate.split("-");
  return `${day}/${month}/${year}`;
};

export const getYear = (isoString) => {
  if (!isoString) return "";
  const formattedDate = formatDate(isoString).split("/").join("-");

  // Convert to "dd-mm-yyyy"
  const [year, month, day] = formattedDate.split("-");
  return year;
};
export const getMonth = (isoString) => {
  if (!isoString) return "";
  const formattedDate = formatDate(isoString).split("/").join("-");

  // Convert to "dd-mm-yyyy"
  const [year, month, day] = formattedDate.split("-");
  return month;
};

export const getDate = (isoString) => {
  if (!isoString) return "";
  const formattedDate = formatDate(isoString).split("/").join("-");

  // Convert to "dd-mm-yyyy"
  const [year, month, day] = formattedDate.split("-");
  return day;
};
