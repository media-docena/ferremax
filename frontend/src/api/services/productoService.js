import axiosInstance from '../axiosConfig';
import { endpoints } from '../endpoints';
import logger from '../../../config/logger';
import { extractFilenameFromHeader } from '../../helpers/productsHelper';

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
      const response = await axiosInstance.post(
        endpoints.productos,
        productoData
      );
      return response.data;
    } catch (error) {
      logger.error('Error al crear un producto:', error);
      throw error;
    }
  },

  update: async (id, productoData) => {
    try {
      const response = await axiosInstance.put(
        endpoints.productosById(id),
        productoData
      );
      return response.data;
    } catch (error) {
      logger.error('Error al actualizar el producto:', error);
      throw error;
    }
  },

  // Permite dar de baja un producto o activarlo nuevamente
  changeStatus: async (id, estado) => {
    try {
      const response = await axiosInstance.patch(
        endpoints.productoEstado(id),
        estado
      );
      return response.data;
    } catch (error) {
      logger.error('Error al cambiar el estado del producto:', error);
      throw error;
    }
  },

  exportToCSV: async () => {
    try {
      const response = await axiosInstance.get(endpoints.productosExportarCSV, {
        responseType: 'blob',
      });

      return {
        blob: response.data,
        filename:
          extractFilenameFromHeader(response.headers['content-disposition']) ||
          `productos_${new Date().toISOString().split('T')[0]}.csv`,
      };
    } catch (error) {
      logger.error('Error al exportar productos a CSV:', error);
      throw error;
    }
  },

  getFormData: async () => {
    try {
      const [marcas, proveedores, categorias, unidades] = await Promise.all([
        axiosInstance.get(endpoints.marcas),
        axiosInstance.get(endpoints.proveedores),
        axiosInstance.get(endpoints.categorias),
        axiosInstance.get(endpoints.unidades),
      ]);

      return {
        marcas: marcas.data.data,
        proveedores: proveedores.data.data,
        categorias: categorias.data.data,
        unidades: unidades.data.data,
      };
    } catch (error) {
      logger.error('Error fetching form data:', error);
      throw error;
    }
  },
};
