const getMembershipPackages = async () => {
  const url =
    "https://swd39220250217220816.azurewebsites.net/api/MembershipPackages";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.data;
};

export default getMembershipPackages;
