import { query } from 'express-validator';
import { validateRequest, validateIdParam, validateString, validateConstants, sanitizeCharacters } from './utils.js';
import { ESTADOS } from '../utils/constants.js';

/**
 * Validación para el filtrado de productos
 * Sanitiza el parámetro 'search' de la query string en la request
 */
export const validarProductoFiltro = [
  query('search')
    .optional()
    .trim() 
    .notEmpty()
    .withMessage('El término de búsqueda no puede estar vacío')
    .customSanitizer(sanitizeCharacters)
    .isLength({ max: 100 })
    .withMessage('El término de búsqueda no puede exceder 100 caracteres'),

  // Middleware para procesar los errores
  validateRequest,
];

/**
 * Validación para obtener un producto por ID
 */
export const validarProductoId = [
  validateIdParam(), 

  validateRequest,
];

/**
 * Validación para cambiar el estado de un producto
 * Valida el ID en la ruta y el estado en el body
 */
export const validarProductoEstado = [
  validateIdParam(),

  validateString('estado', 20, true).toLowerCase(),

  validateConstants('estado', ESTADOS),

  validateRequest,
];