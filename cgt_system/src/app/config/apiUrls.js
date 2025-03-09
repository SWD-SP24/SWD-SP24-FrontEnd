const API_URLS = {
  BASE_URL: "https://swd39220250217220816.azurewebsites.net",
  AUTH: {
    LOGIN: "/api/Users/login",
    REGISTER: "/api/Users/register",
    ADMIN_LOGIN: "/api/AdminAuth/loginAdmin",
  },
  MEMBERSHIP_PACKAGE: {
    GET: "/api/MembershipPackages",
    POST: "/api/MembershipPackages",
    PUT: "/api/MembershipPackages",
    DELETE: "/api/MembershipPackages",
    PATCH: "/api/MembershipPackages",
    GET_PRICING_PLAN: "api/MembershipPackages/PricingPlan",
  },
  UPGRADE_MEMBERSHIP_PACKAGE: {
    CHECKOUT: "/api/BuyMembershipPackage",
    PROCEED_PAYMENT: "/api/BuyMembershipPackage/BuyMembershipPackage",
  },
  PERMISSION: {
    GET: "/api/Permissions",
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
    MEMBERSHIP_PACKAGE: {
      CURRENT: "api/UserMemberships/CurrentPackage",
    },
    GET_DOCTORS_LIST: "/api/Users/doctors",
  },
  ADMIN: {
    CREATE_DOCTOR: "/api/AdminAuth/registerDoctor",
  },
  CHILDREN: {
    GET_CHILDREN_LIST: "/api/Children",
    ADD_CHILD: "/api/Children/add",
    DELETE_CHILD: "/api/Children/",
    GET_CHILDREN_WITH_ID: "/api/Children/child/",
    EDIT_CHILD: "/api/Children/edit/",
  },
  INDICATORS: {
    INDICATORS: "/api/GrowthIndicators",
    LATEST_RECORD: "/api/GrowthIndicators/latest",
  },

  IMAGE: {
    GET_URL: "/Utilities/UploadImage",
  },
  TEETH: {
    TEETH: "/api/Teeth",
  },
  TEETH_RECORD: {
    TEETH_RECORD: "/api/TeethingRecords",
  },
  VACCINATIONS: {
    VACCINATIONS_SCHEDULE: "api/VaccinationSchedules",
    VACCINE: "/api/Vaccines",
  },
  VACCINE_RECORD: {
    VACCINE_RECORD: "/api/VaccineRecords",
  },
};

export default API_URLS;
