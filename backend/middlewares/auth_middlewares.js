import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import logger from '../config/logger.js';

export function verifyToken(req, res, next) {
  try {
    // Se obtiene el token del header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw ApiError.unauthorized(
        'No autorizado. Se requiere token de autenticación'
      );
    }

    /*******************************************
     * Se toma el segundo valor de los datos de
     * autorización de la cabecera que encontramos
     * después de la palabra Bearer.
     * *******************************************/
    const token = authHeader.split(' ')[1];

    if (!token || token.trim() === '')
      throw ApiError.unauthorized(res, 'No autorizado. Token no proporcionado');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {

    if (error.name === 'JsonWebTokenError') {
      logger.error('Token inválido', { error: error.message });
      return next(ApiError.unauthorized('Token inválido'));
    }

    if (error.name === 'TokenExpiredError') {
      logger.error('Token expirado', { error: error.message });
      return next(
        ApiError.unauthorized(
          'Token expirado. Por favor, inicie sesión nuevamente'
        )
      );
    }
    logger.error('Error en la validación del token', { error });
    next(error);
  }
}

// verifica si el usuario tiene uno de los roles permitidos para acceder a una ruta
export function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user ? req.user.rol : '';
    const authorized = allowedRoles.includes(userRole);

    if (!authorized) {
      throw ApiError.forbidden('Acceso denegado. No tenés los permisos para acceder al recurso')
    }

    next();
  };
}