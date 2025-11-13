import { carritoVentaService } from '../services/carritoVentaService';
import logger from '../../../config/logger';

export const productosDisponiblesLoader = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const params = Object.fromEntries(url.searchParams);
        const productosResponse = await carritoVentaService.getProductosDisponibles(params);
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
        logger.error('Error al cargar productos disponibles:', error);
        throw error;
    }
};

export const ventaByIdLoader = async ({ params }) => {
    try {
        const response = await carritoVentaService.getVentaById(params.idVenta);
        return { venta: response.data };
    } catch (error) {
        if (error.response?.status === 404) {
          return {
            venta: null,
            status: 404,
            message: 
                error.response.data?.message || 'No se encontró la venta',
          };
        }
        logger.error('Error al cargar venta por ID:', error);
        throw error;
    }
};