import axios from 'axios';
import { config } from './config';

const axiosInstance = axios.create({
    baseURL: config.apiUrl,
    timeout: config.apiTimeout,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token en cada petición
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores globalmente
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Redirigimos al login si el token expiró o es inválido
            localStorage.removeItem('token');
            localStorage.removeItem('userSession');
            // Utlizamos router para redireccionar
            const currentPath = window.location.pathname;
            window.location.href = `/login?redirectTo=${encodeURIComponent(currentPath)}`;
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;