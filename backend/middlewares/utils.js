// middlewares/utils.js
import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';

/**=======================================================================
 * Middleware para procesar los errores de validación de express-validator
 *========================================================================*/
export function validateRequest (req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Convertimos los errores en un formato uniforme para la respeuesta
    const formattedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
    }));

    // Lanzamos un ApiError con código 422 y los errores formateados
    throw ApiError.unprocessableEntity('Error de validación', formattedErrors);
  }

  next();
};

/**=======================================================================
 * Sanitizador custom para eliminar caracteres peligrosos
 * Permite: letras (con acentos), números, espacios, guiones y guiones bajos
 * Elimina: < > & ' " @ . ` y otros caracteres especiales peligrosos
 *========================================================================*/
export function sanitizarCaracteresPeligrosos(value) {
  if (typeof value !== 'string') return value;
  
  return value.replace(/[<>&'"@.`]/g, '');
}