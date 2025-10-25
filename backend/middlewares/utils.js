// middlewares/utils.js
import { validationResult, param, body } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';

/**=======================================================================
 * Middleware para procesar los errores de validación de express-validator
 *========================================================================*/
export function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Convertimos los errores en un formato uniforme para la respuesta
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param || 'unknown',
      message: err.msg,
    }));

    // Lanzamos un ApiError con código 422 y los errores formateados
    throw ApiError.unprocessableEntity('Error de validación', formattedErrors);
  }

  next();
}

export function sanitizeCharacters(value) {
  if (typeof value !== 'string') return value;
  
  // Elimina caracteres peligrosos: < > & ' " @ . `
  return value.replace(/[<>&'"@.`]/g, '');
}

export function validateIdParam() {
 return param('id')
    .trim()
    .notEmpty()
    .withMessage('El ID es requerido')
    .bail()
    .customSanitizer(sanitizeCharacters)
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
    .toInt();
}

/**
 * Función helper para validar campos de texto
 * @param {string} field - Nombre del campo a validar
 * @param {number} max - Longitud máxima permitida
 * @param {boolean} required - Si el campo es obligatorio
 */
export function validateString(field, max = 100, required = false) {
  let chain = body(field);

  if (required) {
    chain = chain.notEmpty().withMessage(`${field} es requerido`);
  } else {
    chain = chain.optional();
  }
  return chain
    .isString()
    .withMessage(`${field} debe ser texto`)
    .trim()
    .isLength({ max })
    .withMessage(`${field} debe tener máximo ${max} caracteres`);
}

/**
 * Función helper para validar campos con valores constantes permitidos
 * @param {string} field - Nombre del campo a validar
 * @param {array} allowedValues - Array de valores permitidos
 */
export function validateConstants(field, allowedValues = []) {
 return body(field)
    .isIn(allowedValues)
    .withMessage(
      `El campo ${field} debe ser uno de los siguientes: ${allowedValues.join(
        ', '
      )}`
    );
}
