// lib/api.ts
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      Cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

// API functions for each entity
export const authAPI = {
  login: (username: string, password: string) =>
    api.post("/auth/login", { username, password }),
  register: (userData: any) => api.post("/auth/register", userData),
  getProfile: () => api.get("/users/profile"),
};

export const feedbackAPI = {
  getAll: (params?: any) => api.get("/feedback", { params }),
  getById: (id: string) => api.get(`/feedback/${id}`),
  create: (data: any) => api.post("/feedback", data),
  update: (id: string, data: any) => api.patch(`/feedback/${id}`, data),
  delete: (id: string) => api.delete(`/feedback/${id}`),
  getStatistics: () => api.get("/feedback/statistics/summary"),
};

// Add other API functions for departments, categories, comments, etc.
