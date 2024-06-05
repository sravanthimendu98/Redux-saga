import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3002', 
});

const token = 'dummy_token';
localStorage.setItem('token', token);

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("enter token");
    if (token) {
      
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
