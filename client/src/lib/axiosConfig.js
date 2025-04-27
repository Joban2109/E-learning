import axios from 'axios';
import { toast } from 'sonner';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true,
  timeout: 15000
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Check for undefined or invalid parameters in URL
    if (config.url.includes('undefined') || config.url.includes('null')) {
      console.error(`Invalid URL parameter detected in request to: ${config.url}`);
      // You could reject the request here if desired
      // return Promise.reject(new Error(`Invalid URL parameter in ${config.url}`));
    }
    
    // You could add logic here to add headers or modify the request
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      toast.error('Authentication failed. Please log in again.');
      
      // Could add redirect to login page here:
      // window.location.href = '/login';
    }
    
    // Handle server errors
    if (error.response && error.response.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    
    // Handle network errors
    if (error.code === 'ECONNABORTED' || !error.response) {
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

export default api; 