// utils/ApiError.js
/**
 * @fileoverview Clase de utilidad para manejar errores de la API REST de forma consistente
 * @module utils/ApiError
 * @requires ../config/logger
 */

import logger from '../config/logger.js';

/**
 * Clase personalizada para manejar errores de API REST
 * Extiende la clase Error nativa de JavaScript para proporcionar
 * información estructurada sobre errores HTTP
 * 
 * @class ApiError
 * @extends Error
 * 
 * @example
 * Uso directo
 * throw new ApiError(404, 'Usuario no encontrado', false);
 * 
 * @example
 * Uso con métodos estáticos
 * throw ApiError.notFound('Usuario no encontrado');
 * 
 * @example
 * Con errores de validación múltiples
 * throw ApiError.badRequest('Datos inválidos', [
 *   { field: 'email', message: 'Email inválido' },
 *   { field: 'password', message: 'Password muy corta' }
 * ]);
 */
export class ApiError extends Error {
  /**
   * Crea una nueva instancia de ApiError
   *
   * @constructor
   * @param {number} status - Código de estado HTTP (400, 401, 404, 500, etc.)
   * @param {string} message - Mensaje descriptivo del error
   * @param {boolean} [success=false] - Indica si la operación fue exitosa (siempre false para errores)
   * @param {Array<Object>|null} [errors=null] - Array de errores de validación detallados
   * @param {string} errors[].field - Nombre del campo con error
   * @param {string} errors[].message - Mensaje de error específico del campo
   *
   * @example
   * const error = new ApiError(
   *   400,
   *   'Errores de validación',
   *   false,
   *   [
   *     { field: 'email', message: 'Email es requerido' },
   *     { field: 'password', message: 'Password debe tener mínimo 6 caracteres' }
   *   ]
   * );
   */
  constructor(status, message, success = false, errors = null) {
    super(message);
    /** @type {boolean} - Indica si la operación fue exitosa */
    this.success = success;

    /** @type {number} - Código de estado HTTP */
    this.status = status;

    /** @type {string} - Nombre de la clase del error */
    this.name = this.constructor.name;

    /** @type {Array<Object>|null} - Errores de validación detallados */
    this.errors = errors;

    // Captura el stack trace, excluyendo el constructor de la pila
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Crea un error de solicitud incorrecta (400 Bad Request)
   * Se usa cuando el cliente envía datos malformados o inválidos
   *
   * @static
   * @param {string} [message='Solicitud incorrecta'] - Mensaje descriptivo del error
   * @param {Array<Object>|null} [errors=null] - Array de errores de validación
   * @returns {ApiError} Nueva instancia de ApiError con status 400
   *
   * @example
   * Sin errores de validación
   * throw ApiError.badRequest('Los datos enviados son inválidos');
   *
   * @example
   * Con errores de validación múltiples
   * throw ApiError.badRequest('Errores de validación', [
   *   { field: 'email', message: 'Email inválido' },
   *   { field: 'edad', message: 'Debe ser mayor de 18' }
   * ]);
   */
  static badRequest(message, errors = null) {
    return new ApiError(400, message || 'Solicitud incorrecta', false, errors);
  }

  /**
   * Crea un error de no autorizado (401 Unauthorized)
   * Se usa cuando el usuario no está autenticado o el token es inválido
   *
   * @static
   * @param {string} [message='No autorizado'] - Mensaje descriptivo del error
   * @returns {ApiError} Nueva instancia de ApiError con status 401
   *
   * @example
   * throw ApiError.unauthorized('Token inválido o expirado');
   *
   * @example
   * throw ApiError.unauthorized('Credenciales incorrectas');
   */
  static unauthorized(message) {
    return new ApiError(401, message || 'No autorizado', false);
  }

  /**
   * Crea un error de acceso prohibido (403 Forbidden)
   * Se usa cuando el usuario está autenticado pero no tiene permisos
   *
   * @static
   * @param {string} [message='Acceso prohibido'] - Mensaje descriptivo del error
   * @returns {ApiError} Nueva instancia de ApiError con status 403
   *
   * @example
   * throw ApiError.forbidden('No tienes permisos para eliminar este recurso');
   *
   * @example
   * throw ApiError.forbidden('Solo administradores pueden acceder');
   */
  static forbidden(message) {
    return new ApiError(403, message || 'Acceso prohibido', false);
  }

  /**
   * Crea un error de recurso no encontrado (404 Not Found)
   * Se usa cuando el recurso solicitado no existe en la base de datos
   *
   * @static
   * @param {string} [message='Recurso no encontrado'] - Mensaje descriptivo del error
   * @returns {ApiError} Nueva instancia de ApiError con status 404
   *
   * @example
   * throw ApiError.notFound('Usuario no encontrado');
   *
   * @example
   * throw ApiError.notFound(`Producto con ID ${id} no existe`);
   */
  static notFound(message) {
    return new ApiError(404, message || 'Recurso no encontrado', false);
  }

  /**
   * Crea un error de conflicto (409 Conflict)
   * Se usa cuando hay un conflicto con el estado actual del recurso
   * (ej: email duplicado, username ya existe)
   *
   * @static
   * @param {string} [message='Conflicto'] - Mensaje descriptivo del error
   * @returns {ApiError} Nueva instancia de ApiError con status 409
   *
   * @example
   * throw ApiError.conflict('El email ya está registrado');
   *
   * @example
   * throw ApiError.conflict('El username ya existe');
   */
  static conflict(message) {
    return new ApiError(409, message || 'Conflicto', false);
  }

  /**
   * Crea un error de entidad no procesable (422 Unprocessable Entity)
   * Se usa cuando la sintaxis es correcta pero la semántica es incorrecta
   * Similar a 400 pero más específico para validaciones de negocio
   *
   * @static
   * @param {string} [message='Entidad no procesable'] - Mensaje descriptivo del error
   * @param {Array<Object>|null} [errors=null] - Array de errores de validación
   * @returns {ApiError} Nueva instancia de ApiError con status 422
   *
   * @example
   * throw ApiError.unprocessableEntity('Stock insuficiente', [
   *   { field: 'quantity', message: 'Solo hay 5 unidades disponibles' }
   * ]);
   */
  static unprocessableEntity(message, errors = null) {
    return new ApiError(422, message || 'Entidad no procesable', false, errors);
  }

  /**
   * Crea un error interno del servidor (500 Internal Server Error)
   * Se usa para errores inesperados del servidor
   *
   * @static
   * @param {string} [message='Error interno del servidor'] - Mensaje descriptivo del error
   * @returns {ApiError} Nueva instancia de ApiError con status 500
   *
   * @example
   * throw ApiError.internal('Error al conectar con la base de datos');
   *
   * @example
   * throw ApiError.internal('Error al procesar el pago');
   */
  static internal(message) {
    return new ApiError(500, message || 'Error interno del servidor', false);
  }

  /**
   * Convierte el error a un objeto JSON para enviar en la respuesta HTTP
   * Incluye solo los campos necesarios y opcionalmente los errores de validación
   *
   * @returns {Object} Objeto con la estructura del error
   * @returns {boolean} return.success - Siempre false para errores
   * @returns {number} return.status - Código de estado HTTP
   * @returns {string} return.message - Mensaje descriptivo del error
   * @returns {Array<Object>} [return.errors] - Errores de validación (si existen)
   *
   * @example
   * const error = ApiError.badRequest('Datos inválidos', [
   *   { field: 'email', message: 'Email requerido' }
   * ]);
   * console.log(error.toJSON());
   * {
   *   success: false,
   *   status: 400,
   *   message: 'Datos inválidos',
   *   errors: [{ field: 'email', message: 'Email requerido' }]
   * }
   */
  toJSON() {
    return {
      success: this.success,
      status: this.status,
      message: this.message,
      ...(this.errors && { errors: this.errors }),
    };
  }
}


/**
 * Middleware para manejar rutas no encontradas (404)
 * Debe colocarse después de todas las rutas definidas y antes del errorHandler general de la app
 * 
 * @function notFoundHandler
 * @middleware
 * @param {Object} req - Objeto Request de Express
 * @param {Object} res - Objeto Response de Express
 * @throws {ApiError} Lanza un error 404 con información de la ruta solicitada
 * 
 * @example
 * En app.js o server.js
 * app.use('/api/users', userRoutes);
 * app.use('/api/products', productRoutes);
 * 
 * Después de todas las rutas
 * app.use(notFoundHandler);
 * app.use(errorHandler);
 */
// eslint-disable-next-line no-unused-vars
export function notFoundHandler(req, res) {
  throw ApiError.notFound(`Ruta ${req.method} ${req.path} no encontrada`);
}

/**
 * Middleware global para manejo de errores en Express
 * Captura todos los errores lanzados en la aplicación y los formatea
 * Debe ser el último middleware en la cadena
 * 
 * @function errorHandler
 * @middleware
 * @param {Error|ApiError} err - Error capturado
 * @param {Object} req - Objeto Request de Express
 * @param {Object} res - Objeto Response de Express
 * @param {Function} next - Función next de Express (no utilizada)
 * @returns {Object} Respuesta JSON con la información del error
 * 
 * @description
 * - Si el error es una instancia de ApiError, usa su información
 * - Si es un error genérico, lo convierte a error 500
 * - En desarrollo, incluye el stack trace para debugging
 * - En producción, oculta información sensible
 * 
 * @example
 * En app.js o server.js (debe ser el ÚLTIMO middleware)
 * app.use('/api/users', userRoutes);
 * app.use(notFoundHandler);
 * app.use(errorHandler);
 * 
 * @example
 * Maneja ApiError
 * app.get('/api/users/:id', (req, res, next) => {
 *   try {
 *     const user = await User.findById(req.params.id);
 *     if (!user) {
 *       throw ApiError.notFound('Usuario no encontrado');
 *     }
 *     res.json(user);
 *   } catch (error) {
 *     next(error); // Pasa al errorHandler
 *   }
 * });
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // Si es un ApiError, usamos su información
  if (err instanceof ApiError) {
    return res.status(err.status).json(err.toJSON());
  }

  // Para errores no manejados
  logger.error('Error no manejado:', err);
  return res.status(500).json({
    success: false,
    status: 500,
    message: 'Error interno del servidor',
    // En producción, no mostrar el stack trace
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}