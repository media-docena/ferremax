import axiosInstance from '../axiosConfig';
import { endpoints } from './endpoints';
import logger from '../config/logger';

export const productoService = {
  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get(endpoints.productos, { params });
      return response.data;
    } catch (error) {
      logger.error('Error al obtener listado de productos:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosInstance.get(endpoints.productosById(id));
      return response.data;
    } catch (error) {
      logger.error('Error al obtener un producto por ID:', error);
      throw error;
    }
  },

  create: async (productoData) => {
    try {
      const response = await axiosInstance.post(endpoints.productos, productoData);
      return response.data;
    } catch (error) {
      logger.error('Error al crear un producto:', error);
      throw error;
    }
  },

  update: async (id, productoData) => {
    try {
      const response = await axiosInstance.put(endpoints.productosById(id), productoData);
      return response.data;
    } catch (error) {
      logger.error('Error al actualizar el producto:', error);
      throw error;
    }
  },

  // Permite dar de baja un producto o activarlo nuevamente
  changeStatus: async (id, estado) => {
    try {
      const response = await axiosInstance.patch(endpoints.productoEstado(id), estado);
      return response.data;
    } catch (error) {
      logger.error('Error al cambiar el estado del producto:', error);
      throw error;
    }
  },
};
