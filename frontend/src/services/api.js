import axios from "axios";

// Base URL switches automatically based on .env
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  withCredentials: true, // only needed if backend sends cookies
});

export default API;