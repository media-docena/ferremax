import MarcaService from '../services/marcas_service.js'
import { sendOk } from '../utils/ResponseHelper.js';
import logger from '../config/logger.js';
import { ApiError } from '../utils/ApiError.js';

export default {

    async listar(req, res, next) {
        try {
            const marcas = await MarcaService.findAll();

            if(!marcas) throw ApiError.notFound('No se encontraron registros')

            sendOk(res, 'Marca(s) obtenida(s) correctamente', marcas);
            
        } catch (error) {
            logger.error('Error al listar marcas', { error });
            next(error)
        }
    },
}