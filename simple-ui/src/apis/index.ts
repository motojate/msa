import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3900/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
