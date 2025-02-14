import { useState } from "react";
import axiosInstance from "../config/axiosInstance";

const useApi = ({ url, method = "POST", body = null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const callApi = async (customBody = body) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const config = {
        method,
        url,
        data: customBody,
      };

      const result = await axiosInstance(config);
      setResponse(result.data);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, response, error, callApi };
};

export default useApi;
