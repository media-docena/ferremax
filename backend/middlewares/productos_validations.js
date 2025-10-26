import { query } from 'express-validator';
import {
  validateRequest,
  validateId,
  validateString,
  validateConstants,
  sanitizeCharacters,
  validateDecimal,
  validateInt,
  requiredField,
  validateDate,
} from './utils.js';
import { ESTADOS } from '../utils/constants.js';
import { addDays } from 'date-fns';
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
  requiredField('id', 'param')(),

  validateId('id', 'param', 'ID del producto')(),

  validateRequest,
];

/**
 * Validación para cambiar el estado de un producto
 * Valida el ID en la ruta y el estado en el body
 */
export const validarProductoEstado = [
  requiredField('id', 'param')(),

  validateId('id', 'param', 'ID del producto')(),

  requiredField('estado')(),

  validateString('estado', 20, true)().toLowerCase(),

  validateConstants('estado', ESTADOS)(),

  validateRequest,
];

/**
 * Validación para crear un producto
 */
export const validarProductoCrear = [
  requiredField('nombre')(),
  validateString('nombre', 100, true)(),

  validateString('descripcion', 255)(),

  validateId('idCategoria', 'body', 'ID de categoría')().optional(),

  validateDecimal('precio')().exists().withMessage('El precio es requerido'),

  validateInt('stock')().optional(),

  validateInt('stockMin', false, 5)().optional(),

  validateId('idMarca', 'body', 'ID de marca')().optional(),

  validateId('idUnidad', 'body', 'ID de unidad')().optional(),

  // Fecha de vencimiento: debe ser futura, mínimo 30 días desde hoy
  validateDate('fechaVencimiento', {
    displayName: 'Fecha de vencimiento',
    minDate: addDays(new Date(), 30),
    allowPast: false,
    allowFuture: true,
  })().optional(),

  validateId('idProveedor', 'body', 'ID de proveedor')().optional(),

  validateRequest,
];

/**
 * Validación para editar un producto
 */
export const validarProductoEditar = [

  validateString('nombre', 100)(),

  validateString('descripcion', 255)(),

  validateId('idCategoria', 'body', 'ID de categoría')().optional(),

  validateDecimal('precio')().optional(),

  validateInt('stock')().optional(),

  validateInt('stockMin', false, 5)().optional(),

  validateId('idMarca', 'body', 'ID de marca')().optional(),

  validateId('idUnidad', 'body', 'ID de unidad')().optional(),

  validateDate('fechaVencimiento', {
    displayName: 'Fecha de vencimiento',
    minDate: addDays(new Date(), 30),
    allowPast: false,
    allowFuture: true,
  })().optional(),

  validateId('idProveedor', 'body', 'ID de proveedor')().optional(),

  validateRequest,
];
