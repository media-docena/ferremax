// utils/ApiError.js
export class ApiError extends Error {
  constructor(status, message, errors = null) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    this.errors = errors; // Para errores de validación múltiples
    Error.captureStackTrace(this, this.constructor);
  }
}

// Métodos estáticos para errores comunes
ApiError.badRequest = (message, errors) => new ApiError(400, message, errors);
ApiError.unauthorized = (message) => new ApiError(401, message || 'No autorizado');
ApiError.forbidden = (message) => new ApiError(403, message || 'Acceso prohibido');
ApiError.notFound = (message) => new ApiError(404, message || 'Recurso no encontrado');
ApiError.conflict = (message) => new ApiError(409, message || 'Conflicto');
ApiError.internal = (message) => new ApiError(500, message || 'Error interno del servidor');
