// src/api/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL+"/api", // 👈 servidor backend
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
