import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3010/api/",
});

export default axiosInstance;