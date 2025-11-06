export const config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
    apiVersion: import.meta.env.VITE_API_VERSION || 'v1',
    appName: import.meta.env.VITE_APP_NAME || 'FerreMax',
    appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    apiTimeout: import.meta.env.VITE_API_TIMEOUT || 10000,
    environment: import.meta.MODE,
}