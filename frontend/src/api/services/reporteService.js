import axiosInstance from '../axiosConfig';
import { endpoints } from '../endpoints';
import logger from '../../../config/logger';

export const reporteService = {
    getAll: async (params = {}) => {
        try {
            const response = await axiosInstance.get(endpoints.ventas, { params });
            return response.data;
        } catch (error) {
            logger.error('Error al obtener ventas:', error);
            throw error;
        }
    },

    getVentasTopProductos: async () => {
        try {
            const response = await axiosInstance.get(endpoints.ventasTopProductos);
            return response.data;
        } catch (error) {
            logger.error('Error al obtener ventas:', error);
            throw error;
        }
    },
}