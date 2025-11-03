import ProveedorService from '../services/proveedores_service.js'
import { sendOk } from '../utils/ResponseHelper.js';
import logger from '../config/logger.js';
import { ApiError } from '../utils/ApiError.js';

export default {

    async listar(req, res, next) {
        try {
            const proveedores = await ProveedorService.findAll();

            if(!proveedores) throw ApiError.notFound('No se encontraron registros')

            sendOk(res, 'Proveedor(es) obtenido(s) correctamente', proveedores);
            
        } catch (error) {
            logger.error('Error al listar proveedores', { error });
            next(error)
        }
    },
}