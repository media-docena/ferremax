import CarritoVentaService from '../services/carrito_venta_service.js';
import { sendOk, sendCreated } from '../utils/ResponseHelper.js';
import { ApiError } from '../utils/ApiError.js';
import logger from '../config/logger.js';

export default{
    async getProductosDisponibles(req, res, next) {
        try{
            // Obtenemos los productos disponibles con el metodo del service
            const productos = await CarritoVentaService.getProductosDisponibles(req.query.search || '')
            // Verificamos que productos contenga registros
            if (!productos || productos?.length===0) throw ApiError.notFound('No se encontraron productos disponibles');
            sendOk(res, 'Producto(s) obtenido(s) correctamente', productos);
        }
        catch (error) {
            logger.error('Error al listar productos disponibles', { error });
            next(error);
        }
    },

    async createVenta(req, res, next) {
        try {
            const venta = await CarritoVentaService.createVenta(req.body);
            if (!venta) throw ApiError.notFound('No se pudo crear la venta');
            sendCreated(res, 'Venta registrada correctamente', venta);
        }
        catch (error) {
            logger.error('Error al crear la venta', { error });
            next(error);
        }
    },

    async getVentaById(req, res, next) {
        try {
            const { id } = req.params;
            const venta = await CarritoVentaService.getVentaById(parseInt(id));
            if (!venta) throw ApiError.notFound('No se pudo obtener la venta');
            sendOk(res, 'Venta obtenida correctamente', venta);
        }
        catch (error) {
            logger.error('Error al obtener la venta por ID', { error });
            next(error);
        }
    }
}