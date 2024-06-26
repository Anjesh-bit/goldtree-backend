import { useEffect, useState } from "react";
import { isAuthenticated } from "../utils/auth";

const useAuthHook = (init) => {
  const [isAuth, setIsAuth] = useState(init);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authStatus = await isAuthenticated();
        setIsAuth(authStatus);
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setIsAuth(false);
      }
    };
    checkAuthStatus();
  }, []);

  return isAuth;
};

export default useAuthHook;
