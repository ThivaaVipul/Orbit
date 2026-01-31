import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the auth token if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Using Basic Auth as we implemented "username:password" base64 token
            config.headers.Authorization = `Basic ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
