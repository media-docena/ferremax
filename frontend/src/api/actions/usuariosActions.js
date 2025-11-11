import { usuarioService } from '../services/usuarioService';
import { redirect } from 'react-router';
import {
  createUsuarioSchema,
  updateUsuarioSchema,
} from '../../schemas/usuarioSchema';
import { formatErrors } from '../../helpers/utils';
import { filtrarUsuarioData } from '../../helpers/usershelper'
import logger from '../../../config/logger';

export const createUsuarioAction = async ({ request }) => {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);
  try {
    const validatedData = createUsuarioSchema.parse(rawData);

    const usuarioData = filtrarUsuarioData(validatedData);

    await usuarioService.create(usuarioData);

    logger.info('Usuario creado exitosamente');

    return redirect('/usuarios');
  } catch (error) {
    // Errores de validación de Zod
    if (error.name === 'ZodError') {
      return {
        errors: error.flatten().fieldErrors,
        formData: rawData,
      };
    }

    logger.error('Error al crear el usuario:', error);
    // Errores de validación del backend
    if (error.response?.status === 409) {
      return {
        error: error.response?.message || 'El usuario ya existe',
        formData: rawData,
      };
    }

    if (error.response?.data?.errors) {
      return {
        errors: formatErrors(error.response.data.errors),
        formData: rawData,
      };
    }

    return {
      error:
        error.response?.data?.message || 'Hubo un error al crear el usuario',
      formData: Object.fromEntries(formData),
    };
  }
};

// Actions para el manejo de edición/actualización de un usuario
export const updateUsuarioAction = async ({ request, params }) => {
 const formData = await request.formData();
 const rawData = Object.fromEntries(formData);
  try {
    
    const validatedData = updateUsuarioSchema.parse(rawData);

    // Filtramos solo los campos que tienen datos
    const usuarioData = filtrarUsuarioData(validatedData);

    await usuarioService.update(params.usuarioId, usuarioData);

    logger.info(`Usuario ${params.usuarioId} actualizado exitosamente`);

    return redirect(`/usuarios/${params.usuarioId}`);

  } catch (error) {
    // Errores de validación de Zod
    if (error.name === 'ZodError') {
      return {
        errors: error.flatten().fieldErrors,
        formData: rawData,
      };
    }

    logger.error('Error al crear el usuario:', error);
    // Errores de validación del backend
    if (error.response?.status === 409) {
      return {
        error: error.response?.message || 'El usuario ya existe',
        formData: rawData,
      };
    }

    if (error.response?.data?.errors) {
      return {
        errors: formatErrors(error.response.data.errors),
        formData: rawData,
      };
    }

    return {
      error:
        error.response?.data?.message ||
        'Hubo un error al actualizar el usuario',
      formData: Object.fromEntries(formData),
    };
  }
};

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
      error:
        error.response?.data?.message ||
        'Error al cambiar el estado del usuario',
    };
  }
};
