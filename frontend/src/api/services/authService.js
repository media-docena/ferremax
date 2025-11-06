import axiosInstance from '../axiosConfig';
import { endpoints } from '../endpoints';
import logger from '../../../config/logger';

export const authService = {
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post(endpoints.login, credentials);
            return response.data;
        } catch (error) {
            logger.error('Error al iniciar sesión:', error);
            throw error;
        }
    },
};