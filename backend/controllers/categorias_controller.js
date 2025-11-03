import CategoriaService from '../services/categorias_service.js'
import { sendOk } from '../utils/ResponseHelper.js';
import logger from '../config/logger.js';
import { ApiError } from '../utils/ApiError.js';

export default {

    async listar(req, res, next) {
        try {
            const categorias = await CategoriaService.findAll();

            if(!categorias) throw ApiError.notFound('No se encontraron registros')

            sendOk(res, 'Categoría(s) obtenida(s) correctamente', categorias);
            
        } catch (error) {
            logger.error('Error al listar categorias', { error });
            next(error)
        }
    },
}