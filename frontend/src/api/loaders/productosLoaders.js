import { productoService } from '../services/productoService';
import logger from '../../../config/logger';

export const productosLoader = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const params = Object.fromEntries(url.searchParams);
        const productosResponse = await productoService.getAll(params);
        return {
            productos: productosResponse.data || [],
        };
    } catch (error) {
        if (error.response?.status === 404) {
          return {
            productos: [],
            status: 404,
            message:
              error.response.data?.message || 'No se encontraron registros',
            filters: {},
          };
        }
        logger.error('Error al obtener listado de productos:', error);
        throw error;
    }
};