import { usuarioService } from '../services/usuarioService';
import { redirect } from 'react-router';
import logger from '../../../config/logger';

export const createUsuarioAction = async ({ request }) => {
    let formData;
    try {
        formData = await request.formData();
        const usuarioData = Object.fromEntries(formData);

        await usuarioService.create(usuarioData);

        return redirect('/usuarios');

    } catch (error) {
        return {
          error: error.response?.data?.message || 'Hubo un error al crear el usuario',
          formData: Object.fromEntries(formData),
        };
    }
}

// Actions para el manejo de edición/actualización de un usuario
export const updateUsuarioAction = async ({ request, params }) => {
    let formData;
    try {
        formData = await request.formData();
        const usuarioData = Object.fromEntries(formData);

        // Solo incluimos password si se proporciona
        const password = formData.get('password');
        if (password && password.trim() !== '') {
            usuarioData.password = password;
        }
        await usuarioService.update(params.id, usuarioData);
        return redirect(`/usuarios/${params.id}`);

        
    } catch (error) {
        return {
          error: error.response?.data?.message || 'Hubo un error al actualizar el usuario',
          formData: Object.fromEntries(formData),
        };
    }
}

// Action para cambiar estado del usuario
export const changeUsuarioStatusAction = async ({ request, params }) => {
  try {
    const formData = await request.formData();
    const nuevoEstado = formData.get('estado');
    
    if (!['activo', 'inactivo'].includes(nuevoEstado)) {
      return {
        error: 'Estado inválido',
      };
    }

    return await usuarioService.changeStatus(params.usuarioId, {
      estado: nuevoEstado,
    });
    
  } catch (error) {
    logger.error('Error al cambiar el estado del usuario:', error);
    return {
      error: error.response?.data?.message || 'Error al cambiar el estado del usuario',
    };
  }
};