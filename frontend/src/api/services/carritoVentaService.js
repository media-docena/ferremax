import axiosInstance from '../axiosConfig';
import { endpoints } from '../endpoints';
import logger from '../../../config/logger';

export const carritoVentaService = {
  getProductosDisponibles: async (params = {}) => {
    try {
      const response = await axiosInstance.get(endpoints.carritoVenta, {
        params,
      });
      return response.data;
    } catch (error) {
      logger.error('Error al obtener listado de productos disponibles:', error);
      throw error;
    }
  },

  createVenta: async (ventaData) => {
    try {
      const response = await axiosInstance.post(
        endpoints.carritoVenta,
        ventaData
      );
      return response.data;
    } catch (error) {
      logger.error('Error al crear venta:', error);
      throw error;
    }
  },

  getVentaById: async (id) => {
    try {
      const response = await axiosInstance.get(endpoints.carritoVentaById(id));
      return response.data;
    } catch (error) {
      logger.error('Error al obtener venta por ID:', error);
      throw error;
    }
  },
};
