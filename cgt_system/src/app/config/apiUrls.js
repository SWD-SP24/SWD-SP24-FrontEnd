const API_URLS = {
  BASE_URL: "https://swd39220250217220816.azurewebsites.net",
  AUTH: {
    LOGIN: "/api/Users/login",
    REGISTER: "/api/Users/register",
    ADMIN_LOGIN: "/api/AdminAuth/loginAdmin",
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
    CHANGE_PASSWORD: "/api/Users/change-password",
    GET_USERS_LIST: "/api/Users",
    USER_WITH_ID: "/api/Users/",
  },
  ADMIN: {
    CREATE_DOCTOR: "/api/AdminAuth/registerDoctor",
  },
  CHILDREN: {
    GET_CHILDREN_LIST: "/api/Children",
    ADD_CHILD: "/api/Children/add",
    DELETE_CHILD: "/api/Children/",
  },
};

export default API_URLS;
