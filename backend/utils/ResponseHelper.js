// utils/ResponseHelper.js

/**
 * @fileoverview Clase de utilidad para manejar respuestas exitosas de API REST
 * Proporciona métodos consistentes para formatear respuestas HTTP exitosas
 * @module utils/ResponseHelper
 */

/**
 * Clase de utilidad para manejar respuestas exitosas en APIs REST
 * Proporciona métodos estáticos para enviar respuestas formateadas y consistentes
 *
 * @class ResponseHelper
 *
 * @example
 * Respuesta exitosa básica
 * ResponseHelper.ok(res, 'Usuario obtenido', userData);
 *
 * @example
 * Recurso creado
 * ResponseHelper.created(res, 'Producto creado', newProduct);
 *
 * @example
 * Solo mensaje sin datos
 * ResponseHelper.message(res, 'Operación completada');
 */
export class ResponseHelper {
  /**
   * Envía una respuesta exitosa estándar
   * Método base utilizado por los otros métodos de la clase
   *
   * @static
   * @param {Object} res - Objeto Response de Express
   * @param {number} [statusCode=200] - Código de estado HTTP (200, 201, etc.)
   * @param {string} message - Mensaje descriptivo de la operación
   * @param {*} [data=null] - Datos a retornar (objeto, array, string, etc.)
   * @returns {Object} Respuesta JSON de Express
   *
   * @example
   * ResponseHelper.success(res, 200, 'Operación exitosa', { id: 1, name: 'Juan' });
   * Respuesta:
   * Status: 200
   * Body: {
   *   success: true,
   *   message: 'Operación exitosa',
   *   data: { id: 1, name: 'Juan' }
   * }
   *
   * @example
   * Sin datos
   * ResponseHelper.success(res, 200, 'Operación completada');
   * Respuesta:
   * Status: 200
   * Body: {
   *   success: true,
   *   message: 'Operación completada'
   * }
   */
  static success(res, statusCode = 200, message, data = null) {
    const response = {
      success: true,
      message,
      ...(data !== null && { data }),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Envía una respuesta para recursos creados exitosamente (201 Created)
   * Se usa típicamente en endpoints POST cuando se crea un nuevo recurso
   *
   * @static
   * @param {Object} res - Objeto Response de Express
   * @param {string} message - Mensaje descriptivo de la creación
   * @param {*} data - Datos del recurso creado
   * @returns {Object} Respuesta JSON de Express con status 201
   *
   * @example
   * POST /api/products
   * const newProduct = await Product.create({ nombre: 'Martillo', precio: 15 });
   * ResponseHelper.created(res, 'Producto creado correctamente', newProduct);
   * Respuesta:
   * Status: 201
   * Body: {
   *   success: true,
   *   message: 'Producto creado correctamente',
   *   data: { id: 25, nombre: 'Martillo', precio: 15 }
   * }
   *
   * @example
   * POST /api/users
   * ResponseHelper.created(res, 'Usuario registrado', {
   *   id: 123,
   *   email: 'user@example.com',
   *   name: 'Juan Pérez'
   * });
   */
  static created(res, message, data) {
    return this.success(res, 201, message, data);
  }

  /**
   * Envía una respuesta exitosa estándar (200 OK)
   * Se usa para operaciones GET, PUT, PATCH exitosas
   *
   * @static
   * @param {Object} res - Objeto Response de Express
   * @param {string} message - Mensaje descriptivo de la operación
   * @param {*} [data=null] - Datos a retornar (opcional)
   * @returns {Object} Respuesta JSON de Express con status 200
   *
   * @example
   * GET /api/users/123
   * const user = await User.findById(123);
   * ResponseHelper.ok(res, 'Usuario obtenido correctamente', user);
   * Respuesta:
   * Status: 200
   * Body: {
   *   success: true,
   *   message: 'Usuario obtenido correctamente',
   *   data: { id: 123, name: 'Juan', email: 'juan@example.com' }
   * }
   *
   * @example
   * PUT /api/products/25
   * const updated = await Product.findByIdAndUpdate(25, updateData);
   * ResponseHelper.ok(res, 'Producto actualizado correctamente', updated);
   */
  static ok(res, message, data = null) {
    return this.success(res, 200, message, data);
  }

  /**
   * Envía una respuesta sin contenido (204 No Content)
   * Se usa típicamente para operaciones DELETE exitosas
   * No incluye body en la respuesta
   *
   * @static
   * @param {Object} res - Objeto Response de Express
   * @returns {Object} Respuesta vacía de Express con status 204
   *
   * @example
   * DELETE /api/products/25
   * await Product.findByIdAndDelete(25);
   * ResponseHelper.noContent(res);
   * Respuesta:
   * Status: 204
   * Body: (vacío)
   *
   * @example
   * DELETE /api/users/123
   * const deleted = await User.findByIdAndDelete(123);
   * if (deleted) {
   *   ResponseHelper.noContent(res);
   * }
   *
   * @note Para mensajes de confirmación más descriptivos, considere usar
   * ResponseHelper.message() o ResponseHelper.ok() en su lugar
   */
  static noContent(res) {
    return res.status(204).send();
  }

  /**
   * Envía una respuesta con solo mensaje, sin datos (200 OK)
   * Útil para operaciones que no retornan datos pero necesitan confirmación
   *
   * @static
   * @param {Object} res - Objeto Response de Express
   * @param {string} message - Mensaje descriptivo de la operación
   * @returns {Object} Respuesta JSON de Express con status 200
   *
   * @example
   * POST /api/users/123/activate
   * await User.activate(123);
   * ResponseHelper.message(res, 'Usuario activado correctamente');
   * Respuesta:
   * Status: 200
   * Body: {
   *   success: true,
   *   message: 'Usuario activado correctamente'
   * }
   *
   * @example
   * DELETE /api/products/25 (alternativa a noContent)
   * await Product.findByIdAndDelete(25);
   * ResponseHelper.message(res, 'Producto eliminado correctamente');
   *
   * @example
   * POST /api/notifications/send
   * await sendEmailNotification(userId);
   * ResponseHelper.message(res, 'Notificación enviada correctamente');
   */
  static message(res, message) {
    return this.success(res, 200, message, null);
  }

  /**
   * Envía una respuesta con lista paginada (200 OK)
   * Incluye los datos y metadatos de paginación
   *
   * @static
   * @param {Object} res - Objeto Response de Express
   * @param {string} message - Mensaje descriptivo de la operación
   * @param {Array} items - Array de elementos a retornar
   * @param {Object} pagination - Objeto con información de paginación
   * @param {number} pagination.page - Página actual (base 1)
   * @param {number} pagination.limit - Cantidad de elementos por página
   * @param {number} pagination.total - Total de elementos en la base de datos
   * @returns {Object} Respuesta JSON de Express con status 200
   *
   * @example
   * GET /api/products?page=1&limit=10
   * const page = 1, limit = 10;
   * const products = await Product.find().skip((page-1)*limit).limit(limit);
   * const total = await Product.countDocuments();
   *
   * ResponseHelper.paginated(
   *   res,
   *   'Productos obtenidos correctamente',
   *   products,
   *   { page, limit, total }
   * );
   * Respuesta:
   * Status: 200
   * Body: {
   *   success: true,
   *   message: 'Productos obtenidos correctamente',
   *   data: [ {...}, {...}, ... ],
   *   pagination: {
   *     page: 1,
   *     limit: 10,
   *     total: 95,
   *     totalPages: 10
   *   }
   * }
   *
   * @example
   * GET /api/users?page=2&limit=20
   * ResponseHelper.paginated(
   *   res,
   *   'Usuarios obtenidos',
   *   users,
   *   { page: 2, limit: 20, total: 156 }
   * );
   * totalPages se calcula automáticamente: Math.ceil(156/20) = 8
   */
  static paginated(res, message, items, pagination) {
    return res.status(200).json({
      success: true,
      message,
      data: items,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: Math.ceil(pagination.total / pagination.limit),
      },
    });
  }
}

/**
 * Alias para ResponseHelper.success()
 * Proporciona una forma más corta de llamar al método
 *
 * @function sendSuccess
 * @see ResponseHelper.success
 * @example
 * import { sendSuccess } from './ResponseHelper.js';
 * sendSuccess(res, 200, 'Operación exitosa', data);
 */
export const sendSuccess = ResponseHelper.success;

/**
 * Alias para ResponseHelper.created()
 * Proporciona una forma más corta de llamar al método
 *
 * @function sendCreated
 * @see ResponseHelper.created
 * @example
 * import { sendCreated } from './ResponseHelper.js';
 * sendCreated(res, 'Recurso creado', newResource);
 */
export const sendCreated = ResponseHelper.created;

/**
 * Alias para ResponseHelper.ok()
 * Proporciona una forma más corta de llamar al método
 *
 * @function sendOk
 * @see ResponseHelper.ok
 * @example
 * import { sendOk } from './ResponseHelper.js';
 * sendOk(res, 'Operación exitosa', data);
 */
export const sendOk = ResponseHelper.ok;

/**
 * Alias para ResponseHelper.noContent()
 * Proporciona una forma más corta de llamar al método
 *
 * @function sendNoContent
 * @see ResponseHelper.noContent
 * @example
 * import { sendNoContent } from './ResponseHelper.js';
 * sendNoContent(res);
 */
export const sendNoContent = ResponseHelper.noContent;

/**
 * Alias para ResponseHelper.message()
 * Proporciona una forma más corta de llamar al método
 *
 * @function sendMessage
 * @see ResponseHelper.message
 * @example
 * import { sendMessage } from './ResponseHelper.js';
 * sendMessage(res, 'Operación completada');
 */
export const sendMessage = ResponseHelper.message;

/**
 * Alias para ResponseHelper.paginated()
 * Proporciona una forma más corta de llamar al método
 *
 * @function sendPaginated
 * @see ResponseHelper.paginated
 * @example
 * import { sendPaginated } from './ResponseHelper.js';
 * sendPaginated(res, 'Datos obtenidos', items, { page, limit, total });
 */
export const sendPaginated = ResponseHelper.paginated;
