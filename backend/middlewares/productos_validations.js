import { param, query } from 'express-validator';
import { validateRequest, sanitizarCaracteresPeligrosos } from './utils.js';

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
    .customSanitizer(sanitizarCaracteresPeligrosos)
    .isLength({ max: 100 })
    .withMessage('El término de búsqueda no puede exceder 100 caracteres'),

  // Middleware para procesar los errores
  validateRequest,
];

/**
 * Validación para obtener un producto por ID
 */
export const validarProductoId = [
  param('id')
    .notEmpty()
    .withMessage('El ID del producto es requerido')
    .bail()
    .customSanitizer(sanitizarCaracteresPeligrosos)
    .bail()
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
    .toInt(), 

  validateRequest,
];
