import axios from "axios";

// Determine API URL based on environment
const getApiUrl = () => {
  // Check if we're in production (Vercel)
  if (window.location.hostname !== 'localhost') {
    // Use environment variable or fallback to Render backend URL
    return process.env.REACT_APP_API_URL || 'https://collegeevent-management-system-o7vq.onrender.com/api';
  }
  // Local development
  return "http://localhost:5001/api";
};

const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    
    // Show user-friendly error messages
    if (!error.response) {
      alert('❌ Cannot connect to server. Please check if backend is running.');
    } else if (error.response.status === 404) {
      alert('❌ API endpoint not found. Please check backend URL.');
    }
    
    return Promise.reject(error);
  }
);

console.log('🌐 API Base URL:', api.defaults.baseURL);

export default api;
