import RolService from '../services/roles_service.js'
import { sendOk } from '../utils/ResponseHelper.js';
import logger from '../config/logger.js';
import { ApiError } from '../utils/ApiError.js';

export default {

    async listar(req, res, next) {
        try {
            const roles = await RolService.findAll();

            if(!roles) throw ApiError.notFound('No se encontraron registros')

            sendOk(res, 'Rol(es) obtenido(s) correctamente', roles);
            
        } catch (error) {
            logger.error('Error al listar roles', { error });
            next(error)
        }
    },
}