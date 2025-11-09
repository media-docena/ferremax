import { usuarioService } from '../services/usuarioService';
import logger from '../../../config/logger';


// Loader para obtener todos los usuarios
export const usuariosLoader = async () => {
    try {
        return await usuarioService.getAll();   

    } catch (error) {
        logger.error('Error al obtener los usuarios:', error);
        if (error.response?.status === 404) {
          throw new Response('No se encontraron registros.', { status: 404 });
        }
        throw error;
    }
}
// Loader para obtener un usuario específico
export const usuarioLoader = async ({ params }) => {
    try {
        return await usuarioService.getById(params.id);

    } catch (error) {
        logger.error('Error al obtener el usuario:', error);
        if (error.response?.status === 404) {
          throw new Response('Usuario no encontrado.', { status: 404 });
        }
        throw error;
    }
}