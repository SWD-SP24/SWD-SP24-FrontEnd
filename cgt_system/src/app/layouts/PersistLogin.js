import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";
import Cookies from "js-cookie";

const PersistLogin = () => {
  const [auth, setAuth] = useState(() => Cookies.get("auth_token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    setAuth(token || "");
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PersistLogin;
