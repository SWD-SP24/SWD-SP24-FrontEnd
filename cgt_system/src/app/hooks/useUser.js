import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
      }
    }
  }, []);

  return user;
};

export default useUser;
