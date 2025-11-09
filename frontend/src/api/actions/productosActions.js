import { productoService } from '../services/productoService';
import logger from '../../../config/logger';

export const changeProductoStatusAction = async ({ request, params }) => {
  try {
    const formData = await request.formData();
    const nuevoEstado = formData.get('estado');

    if (!['activo', 'inactivo'].includes(nuevoEstado)) {
      return {
        error: 'Estado inválido',
      };
    }

    return await productoService.changeStatus(params.productoId, {
      estado: nuevoEstado,
    });
  } catch (error) {
    logger.error('Error al cambiar el estado del producto:', error);
    return {
      error:
        error.response?.data?.message ||
        'Error al cambiar el estado del producto',
    };
  }
};
