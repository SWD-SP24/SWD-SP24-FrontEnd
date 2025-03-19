const API_URLS = {
  BASE_URL: "https://localhost:7067",
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
    USERS_AND_MEMBERSHIP: "/api/Users/list-user-active-memberships",
    PAYMENT_HISTORY: "api/PaymentTransactions/history",
    VERIFY_EMAIL: "/api/Users/resend-verification-email",
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
    GET_CHILD: "/api/Children/",
  },
  INDICATORS: {
    INDICATORS: "/api/GrowthIndicators",
    LATEST_RECORD: "/api/GrowthIndicators/latest",
    INDICATOR_WITH_ID: "/api/GrowthIndicators/",
  },
  DASHBOARD: {
    TOTAL_CHILDREN: "/api/Dashboard/total-children",
    TOTAL_REVENUE: "/api/Dashboard/revenue",
    VACCINE_COMPLETE: "/api/Dashboard/vaccination-completion",
    MONTHLY_REVENUE: "/api/Dashboard/monthly-revenue",
    USER_GROWTH: "/api/Dashboard/user-growth-over-time",
    EXPIRED_MEMBERSHIP: "/api/Dashboard/expired-memberships",
    ABNORMAL_CHILDREN:
      "/api/Dashboard/children-with-abnormal-growth-deviations",
    VACCINATIONS_SCHEDULE_COMPLIANT_RATE:
      "/api/Dashboard/vaccination-schedule-compliance",
    AVERAGE_GROWTH_RATE: "/api/Dashboard/average-growth-rate-all",
    MISSED_DOSES: "/api/Dashboard/missed-vaccinations",
    ADMINISTERED_DOSES: "/api/Dashboard/doses-administered",
    VACCINE_COMPLETE: "/api/Dashboard/vaccination-completion",
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
