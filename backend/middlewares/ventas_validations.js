import { query } from 'express-validator';
import { validateRequest, sanitizeCharacters, validateDate } from './utils.js';

/**
 * Validación para el filtrado de ventas
 * Sanitiza el parámetro 'search' y paymentMethod de la query string en la request
 * También valida las fechas 'startDate' y 'endDate' si se proporcionan
 */
export const validarVentaFiltro = [
  query('search')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El término de búsqueda no puede estar vacío')
    .customSanitizer(sanitizeCharacters)
    .isLength({ max: 100 })
    .withMessage('El término de búsqueda no puede exceder 100 caracteres'),

  validateDate('fechadesde', {
    location: 'query',
    displayName: 'Fecha desde',
    allowFuture: false,
  })().optional(),
  validateDate('fechahasta', {
    location: 'query',
    displayName: 'Fecha hasta',
    allowFuture: false,
  })().optional(),

  query('formapago')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El término de forma de pago no puede estar vacío')
    .customSanitizer(sanitizeCharacters)
    .isLength({ max: 100 })
    .withMessage('El término de forma de pago no puede exceder 100 caracteres'),

  // Middleware para procesar los errores
  validateRequest,
];

export const validarTopProductosFiltro = [
  query('limit')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El término de limit no puede estar vacío')
    .customSanitizer(sanitizeCharacters)
    .isLength({ max: 100 })
    .withMessage('El término limit no puede exceder 100 caracteres')
    .isInt({ min: 1, max: 5 })
    .withMessage('limit debe ser un número entero positivo entre 1 y 5')
    .toInt(),
    


  validateRequest,
];
