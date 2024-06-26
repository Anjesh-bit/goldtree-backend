import axios from "axios";
import { getCookies, setCookies } from "./cookies";
import { getLocalStorage, setLocalStorage } from "./localStorage";
import { getNewAccessToken } from "../services/auth/login";


const auth = (token, user, exp) => {
  setCookies("token", token, exp);
  setLocalStorage("loginData", user);
};
const url = "http://localhost:5000/goldtree/";
const axiosInstance = axios.create({ baseURL: url, withCredentials: true });

const isAuthenticated = async () => {
  // Mark the function as async

  const loginData = getLocalStorage("loginData");
  const accessToken = getCookies("token");

  if (loginData && accessToken) {
    return loginData;
  } else if (!accessToken) {
    try {
      const newAccessToken = await getNewAccessToken(axiosInstance);
      if (newAccessToken) {
        return loginData;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      return false;
    }
  } else {
    return false;
  }
};

export { auth, isAuthenticated };
