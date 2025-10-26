import config from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
})

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: attach token
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Axios Response:", response);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized globally
      // e.g., redirect to login
    }
    return Promise.reject(error);
  }
);
