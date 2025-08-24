// src/api/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5180/api", // 👈 servidor backend
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
