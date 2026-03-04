import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5001/api"
});

// Log the API URL being used
console.log('API Base URL:', api.defaults.baseURL);

export default api;
