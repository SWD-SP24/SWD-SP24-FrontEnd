import axios from "axios";
import Cookies from "js-cookie";
import API_URLS from "./apiUrls";

const axiosInstance = axios.create({
  baseURL: API_URLS.BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const whiteList = [API_URLS.AUTH.LOGIN, API_URLS.AUTH.REGISTER];

    const noTokenRequired = whiteList.includes(config.url);

    if (!noTokenRequired) {
      const token = Cookies.get("auth_token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Xử lý lỗi 401 - Token hết hạn hoặc không hợp lệ
      // Xử lý các lỗi khác ở đây
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
