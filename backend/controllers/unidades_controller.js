import UnidadeService from '../services/unidades_service.js'
import { sendOk } from '../utils/ResponseHelper.js';
import logger from '../config/logger.js';
import { ApiError } from '../utils/ApiError.js';

export default {

    async listar(req, res, next) {
        try {
            const unidades = await UnidadeService.findAll();

            if(!unidades) throw ApiError.notFound('No se encontraron registros')

            sendOk(res, 'Unidad(es) obtenida(s) correctamente', unidades);
            
        } catch (error) {
            logger.error('Error al listar unidades', { error });
            next(error)
        }
    },
}