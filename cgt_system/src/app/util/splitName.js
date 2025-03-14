const splitName = (fullName) => {
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return [firstName, lastName];
};
export default splitName;
