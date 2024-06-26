import axios from "axios";
import { getCookies, setCookies } from "../utils/cookies";
import { isAuthenticated } from "../utils/auth";
import { jwtDecode } from "jwt-decode";
import { getLocalStorage } from "../utils/localStorage";
import { getNewAccessToken } from "../services/auth/login";

let isRefreshing = false;
let refreshSubscribers = [];
const url = "http://localhost:5000/goldtree/";
const axiosInstance = axios.create({ baseURL: url, withCredentials: true });

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getCookies("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    const authStatus = await isAuthenticated();
    if (authStatus) {
      config.headers["Auth-Type"] = authStatus.type;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      getLocalStorage("loginData")
    ) {
      originalRequest._retry = true; // Mark the request as retried

      if (isRefreshing) {
        // Queue the request until the token refresh is done
        return new Promise((resolve) => {
          refreshSubscribers.push((accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        // Get a new access token using the refresh token

        const newAccessToken = await getNewAccessToken(axiosInstance);

        const decoded = jwtDecode(newAccessToken);

        setCookies("token", newAccessToken, decoded.exp);
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        const response = await axiosInstance(originalRequest);

        // Process all queued requests with the new token
        refreshSubscribers.forEach((subscriber) => subscriber(newAccessToken));
        refreshSubscribers = [];

        return response;
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
