import axiosInstance from '../axiosConfig';
import { endpoints } from '../endpoints';
import logger from '../../../config/logger';

export const docService = {
    getDocs: async () => {
        try {
            const response = await axiosInstance.get(endpoints.documentacion);
            return response.data;
        } catch (error) {
            logger.error('Error al obtener listado de documentos:', error);
            throw error;
        }
    },
};