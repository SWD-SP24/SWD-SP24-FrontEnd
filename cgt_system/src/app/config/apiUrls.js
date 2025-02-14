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
    FORGOT_PASSWORD: {
      SEND_RESET_CODE: "/api/Users/forgot-password",
      VALIDATE_RESET_CODE: "/api/Users/validate-reset-code",
      RESET_PASSWORD: "/api/Users/reset-password",
    },
  },
};

export default API_URLS;
