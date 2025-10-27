import VentaService from '../services/ventas_service.js';
import { sendOk } from '../utils/ResponseHelper.js';
import { ApiError } from '../utils/ApiError.js';
import logger from '../config/logger.js';

export default {
    // Listar ventas con filtros opcionales
    async listar(req, res, next) {
        try {
            const ventas = await VentaService.findAll(
              req.query.search || '',
              req.query.startDate,
              req.query.endDate,
              req.query.paymentMethod
            );

            if (!ventas || ventas?.length === 0) throw ApiError.notFound('No se encontraron registros');

            sendOk(res,'Venta(s) obtenida(s) correctamente', ventas);

        } catch (error) {
            logger.error('Error al listar ventas', { error });
            next(error);
        }
    },

    async obtenerTopProductos(req, res, next) {
        try {
            const limit = req.query.limit || 3; 
            const topProductos = await VentaService.getTopProductos(limit);

            if (!topProductos || topProductos.length === 0) throw ApiError.notFound('No se encontraron los productos más vendidos');

            sendOk(
              res,
              'Producto(s) más vendido(s) obtenido(s) correctamente',
              topProductos
            );
        } catch (error) {
            logger.error('Error al obtener top productos más vendidos', { error });
            next(error);
        }
    }

}