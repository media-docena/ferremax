// middlewares/utils.js
import { validationResult, param, body } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';
import {
  parse,
  isValid,
  format,
  isBefore,
  isAfter,
  startOfDay,
  parseISO,
  formatISO,
} from 'date-fns';

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
  return value.replace(/[<>&'"@.`]/g, '').trim();
}

export function validateId(field = 'id', source = 'param', displayName = 'ID') {
  return () => {
    let validator = source === 'param' ? param(field) : body(field);

    return validator
      .trim()
      .customSanitizer(sanitizeCharacters)
      .isInt({ min: 1 })
      .withMessage(`${displayName} debe ser un número entero positivo`)
      .toInt();
  };
}

/**
 * Función helper para validar campos de texto y normalizarlos
 * @param {string} field - Nombre del campo a validar
 * @param {number} max - Longitud máxima permitida
 * @param {boolean} required - Si el campo es obligatorio
 */
export function validateString(field, max = 100, required = false) {
  let chain = body(field)

  if (required) {
    chain = chain.notEmpty().withMessage(`${field} es un campo requerido`);
  } else {
    chain = chain
      .optional();
  }
  return () => {
    return chain
      .isString()
      .withMessage(`${field} debe ser texto`)
      .customSanitizer(sanitizeCharacters)
      .trim()
      .notEmpty()
      .withMessage(`${field} no puede estar vacío`)
      .isLength({ max })
      .withMessage(`${field} debe tener máximo ${max} caracteres`)
      .toLowerCase()
      .customSanitizer((value) => {
        return capitalizeFirstLetter(value);
      });
  };
}

/**
 * Función helper para validar campos con valores constantes permitidos
 * @param {string} field - Nombre del campo a validar
 * @param {array} allowedValues - Array de valores permitidos
 */
export function validateConstants(field, allowedValues = []) {
  return () => {
    return body(field)
      .isIn(allowedValues)
      .withMessage(
        `El campo ${field} debe ser uno de los siguientes: ${allowedValues.join(
          ', '
        )}`
      );
  };
}

export function requiredField(field, source = 'body', message = null) {
  return () => {
    const validator = source === 'param' ? param(field) : body(field);
    const errorMessage = message || `${field} es requerido`;

    return validator.notEmpty().withMessage(errorMessage);
  };
}

export function validateDecimal(field) {
  return () => {
    return body(field)
      .isFloat({ min: 0.0 })
      .withMessage(`${field} debe ser un número decimal positivo`)
      .toFloat();
  };
}

export function validateInt(field, min = 0) {
  return () => {
    return body(field)
      .isInt({ min: min })
      .withMessage(`${field} debe ser un número entero positivo`)
      .toFloat();
  };
}

function capitalizeFirstLetter(word) {
  if (typeof word !== 'string' || word.length === 0) {
    return '';
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Helper para parsear fecha del usuario en múltiples formatos
 */
function parseUserDate(dateString) {
  if (!dateString) return null;

  const formats = ['dd-MM-yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd'];

  for (const formatStr of formats) {
    const date = parse(dateString, formatStr, new Date());
    if (isValid(date)) {
      return date;
    }
  }

  return null;
}


/**
 * Valida un campo de fecha dentro de una request utilizando `express-validator`.
 * 
 * Esta función genera una cadena de validaciones personalizadas para un campo de tipo fecha.
 * Se asegura de que el valor tenga un formato válido, pueda convertirse correctamente
 * a `yyyy-MM-dd`, y cumpla con las restricciones opcionales como fechas mínimas, máximas,
 * y control sobre si se permiten fechas pasadas o futuras.
 * 
 * @param {string} field - Nombre del campo que contiene la fecha en la request.
 * @param {Object} [options={}] - Opciones de configuración para la validación.
 * @param {string|null} [options.displayName=null] - Nombre descriptivo del campo usado en los mensajes de error.
 * @param {string|Date|null} [options.minDate=null] - Fecha mínima permitida (en formato reconocible por `Date`).
 * @param {string|Date|null} [options.maxDate=null] - Fecha máxima permitida.
 * @param {boolean} [options.allowPast=true] - Si `false`, no se permiten fechas anteriores al día actual.
 * @param {boolean} [options.allowFuture=true] - Si `false`, no se permiten fechas posteriores al día actual.
 * 
 * @returns {Function} Middleware de validación compatible con `express-validator`
 *                     que se aplica sobre el campo especificado.
 * 
 * @example
 * Ejemplo de uso: Validar que 'fechaNacimiento' sea pasada y posterior al año 1900
 * router.post('/usuarios', [
 *   validateDate('fechaNacimiento', {
 *     displayName: 'Fecha de nacimiento',
 *     minDate: '1900-01-01',
 *     allowFuture: false
 *   })(),
 *   validateRequest
 * ]);
 * 
 * @throws {ApiError} - Lanza un error 422 si la fecha no cumple los requisitos de formato o rango.
 */
export function validateDate(field, options = {}) {
  const {
    displayName = null,
    minDate = null,
    maxDate = null,
    allowPast = true,
    allowFuture = true
  } = options;

  return () => {
    const name = displayName || field;

    return body(field)
      .trim()
      // Parsea y convierte a yyyy-mm-dd
      .customSanitizer((value) => {
        if (!value) return value;

        const date = parseUserDate(value);

        if (!date) return value; 

        // Mantiene la zona horaria local pero la convierte a UTC
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const utcDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

        return formatISO(utcDate);
      })
      .bail()
      // Chequea que sea fecha válida
      .custom((value) => {
        const date = parseISO(value);
        
        if (!isValid(date)) {
          throw ApiError.unprocessableEntity(
            `${name} debe tener formato dd-mm-yyyy, dd/mm/yyyy o yyyy-mm-dd`
          );
        }
        
        return true;
      })
      .bail()
      // Validaciones de rango
      .custom((value) => {
        const date = startOfDay(parseISO(value));
        const today = startOfDay(new Date());
        
        if (minDate) {
          const min = startOfDay(new Date(minDate));
          if (isBefore(date, min)) {
            throw ApiError.unprocessableEntity(
              `${name} debe ser posterior a ${format(min, 'dd-MM-yyyy')}`
            );
          }
        }
        
        if (maxDate) {
          const max = startOfDay(new Date(maxDate));
          if (isAfter(date, max)) {
            throw ApiError.unprocessableEntity(
              `${name} debe ser anterior a ${format(max, 'dd-MM-yyyy')}`
            );
          }
        }
        
        if (!allowPast && isBefore(date, today)) {
          throw ApiError.unprocessableEntity(
            `${name} no puede ser una fecha pasada`
          );
        }
        
        if (!allowFuture && isAfter(date, today)) {
          throw ApiError.unprocessableEntity(
            `${name} no puede ser una fecha futura`
          );
        }
        
        return true;
      });
  };
}