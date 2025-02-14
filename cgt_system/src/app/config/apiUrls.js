const API_URLS = {
  BASE_URL: "https://swd39220250111235725.azurewebsites.net",
  AUTH: {
    LOGIN: "/api/Users/login",
    REGISTER: "/api/Users/register",
  },
  MEMBERSHIP_PACKAGE: {
    GET: "/api/MembershipPackages",
  },
  USER: {
    CURRENT_USER: "/api/Users/self",
    UPDATE_CURRENT_USER: "/api/Users",
  },
};

export default API_URLS;
