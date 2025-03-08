import axios from "axios";
import Cookies from "js-cookie";
import API_URLS from "./apiUrls";
import showToast from "../util/showToast";

const axiosInstance = axios.create({
  baseURL: API_URLS.BASE_URL,
});

const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const whiteList = [API_URLS.AUTH.LOGIN, API_URLS.AUTH.REGISTER];

      if (!whiteList.includes(config.url)) {
        const token = Cookies.get("auth_token");
        if (token) {
          config.headers["Authorization"] = `${token}`;
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        showToast({
          icon: "warning",
          title: "Session Expired",
          text: "Your session has expired. Please log in again to continue.",
          showButtons: true,
          confirmText: "Log In",
          cancelText: "",
          onConfirm: () => (window.location.href = "/login"),
          onCancle: null,
          disableOutsideClick: true,
          targetElement: document.body,
        });
      }
      return Promise.reject(error);
    }
  );
};

export { axiosInstance, setupInterceptors };
