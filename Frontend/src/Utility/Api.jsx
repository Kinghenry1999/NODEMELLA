import axios from "axios";

const api = axios.create({
  baseURL: "https://nodemella-3.onrender.com/api/auth/register/login",
  withCredentials: true,
});

export default api;