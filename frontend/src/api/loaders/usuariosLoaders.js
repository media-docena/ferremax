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
export const usuarioByIdLoader = async ({ params }) => {
    try {
        const usuarioResponse = await usuarioService.getById(params.usuarioId);
        return {
          usuario: usuarioResponse.data || [],
        };

    } catch (error) {
        logger.error('Error al obtener el usuario:', error);
        if (error.response?.status === 404) {
          return {
            usuario: [],
            status: 404,
            message: error.response.data?.message || 'Usuario no encontrado',
          };
        }
        throw error;
    }
}