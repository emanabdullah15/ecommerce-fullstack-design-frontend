import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",
});

// Add JWT token automatically if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;