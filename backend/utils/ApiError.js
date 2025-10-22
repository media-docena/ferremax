// utils/ApiError.js
import logger from '../config/logger.js';
export class ApiError extends Error {
  constructor(status, message, success = false, errors = null) {
    super(message);
    this.success = success;
    this.status = status;
    this.name = this.constructor.name;
    this.errors = errors; // Para errores de validación múltiples
    Error.captureStackTrace(this, this.constructor);
  }

  // Métodos estáticos para errores comunes
  static badRequest(message, errors = null) {
    return new ApiError(400, message || 'Solicitud incorrecta', false, errors);
  }

  static unauthorized(message) {
    return new ApiError(401, message || 'No autorizado', false);
  }

  static forbidden(message) {
    return new ApiError(403, message || 'Acceso prohibido', false);
  }

  static notFound(message) {
    return new ApiError(404, message || 'Recurso no encontrado', false);
  }

  static conflict(message) {
    return new ApiError(409, message || 'Conflicto', false);
  }

  static unprocessableEntity(message, errors = null) {
    return new ApiError(422, message || 'Entidad no procesable', false, errors);
  }

  static internal(message) {
    return new ApiError(500, message || 'Error interno del servidor', false);
  }

  // Método para convertir el error a JSON
  toJSON() {
    return {
      success: this.success,
      status: this.status,
      message: this.message,
      ...(this.errors && { errors: this.errors }),
    };
  }
}


// Middleware para rutas no encontradas
// eslint-disable-next-line no-unused-vars
export function notFoundHandler(req, res) {
  throw ApiError.notFound(`Ruta ${req.method} ${req.path} no encontrada`);
}

// Middleware para manejo de errores generales en Express
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