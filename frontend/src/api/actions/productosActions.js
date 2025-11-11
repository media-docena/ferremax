import { redirect } from 'react-router';
import { productoService } from '../services/productoService';
import { createProductoSchema, updateProductoSchema } from '../../schemas/productoSchema';
import { formatErrors } from '../../helpers/utils';
import { filtrarProductoData } from '../../helpers/productsHelper';
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

export const createProductoAction = async ({ request }) => {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);
  
  try {

    const validatedData = createProductoSchema.parse(rawData);

    const productoData = filtrarProductoData(validatedData);

    await productoService.create(productoData);

    logger.info('Producto creado exitosamente');

    return redirect('/productos');

  } catch (error) {
    // Errores de validación de Zod
    if (error.name === 'ZodError') {
      return {
        errors: error.flatten().fieldErrors,
        formData: rawData,
      };
    }

    logger.error('Error al crear el producto:', error);
    // Errores de validación del backend
    if (error.response?.status === 409) {
      return {
        error: error.response?.message || 'El producto ya existe',
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
      error: error.response?.data?.message || 'Error al crear el producto',
      formData: rawData,
    };
  }
}

export const updateProductoAction = async ({ request, params }) => {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);
  
  try {

    const validatedData = updateProductoSchema.parse(rawData);

    // Filtramos solo los campos que tienen datos
    const productoData = filtrarProductoData(validatedData);

    await productoService.update(params.productoId, productoData);

    logger.info(`Producto ${params.productoId} actualizado exitosamente`);

    return redirect(`/productos/${params.productoId}`);

  } catch (error) {
    if (error.name === 'ZodError') {
      return {
        errors: error.flatten().fieldErrors,
        formData: rawData,
      };
    }

    logger.error('Error al actualizar el producto:', error);

    if (error.response?.data?.errors) {
      return {
        errors: formatErrors(error.response.data.errors),
        formData: rawData,
      };
    }

    return {
      error: error.response?.data?.message || 'Error al actualizar el producto',
      formData: rawData,
    };
  }
};