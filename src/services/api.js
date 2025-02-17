import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_FOODICS_API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
