import axios from 'axios';

// Create an axios instance
const instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include authentication token from localStorage
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
instance.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response || {};
    
    if (status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
    }
    
    return Promise.reject(error);
  }
);

export default instance;