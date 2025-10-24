import ProductService from '../services/productos_service.js';
import { sendOk } from '../utils/ResponseHelper.js';
import { ApiError } from '../utils/ApiError.js';
import logger from '../config/logger.js';

export default {
    // Listar productos del inventario con filtro opcional
    async listar(req, res, next) {
        try {
            const productos = await ProductService.findAll(req.query.search || '');

            if (!productos || productos?.length === 0) throw ApiError.notFound('No se encontraron registros');

            sendOk(res,'Producto(s) obtenido(s) correctamente', productos);

        } catch (error) {
            logger.error('Error al listar productos', { error });
            next(error);
        }
    },
    // Obtener detalle un producto por ID
    async obtenerPorId(req, res, next) {
        try {
            
            const producto = await ProductService.findById(req.params.id);

            if (!producto) throw ApiError.notFound('Producto no encontrado');

            sendOk(res,'Producto obtenido correctamente', producto);

        } catch (error) {
            logger.error('Error al obtener detalle un producto por ID', { error });
            next(error);
        }
    }

};