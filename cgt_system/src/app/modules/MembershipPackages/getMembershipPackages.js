const getMembershipPackages = async () => {
  const url = "https://localhost:7067/api/MembershipPackages";
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
