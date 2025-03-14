import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { create } from "zustand";

const useUserStore = create((set) => {
  const storedUser = Cookies.get("user");
  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  console.log("User in hook: ", user);

  return {
    user,
    setUser: (user) => {
      set({ user });
      Cookies.set("user", JSON.stringify(user));
    },
    clearUser: () => {
      set({ user: null });
      Cookies.remove("user");
      Cookies.remove("auth_token");
      Cookies.remove("permissions");
    },
  };
});

const useUser = () => {
  const navigate = useNavigate();
  const store = useUserStore();
  const clearUser = () => {
    store.clearUser();
    navigate("/");
  };

  return { ...store, clearUser };
};

export default useUser;
