import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      Cookies.remove("auth_token");
      Cookies.remove("user");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
